<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CertificateTemplate;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Carbon;

class CertificateTemplateController extends Controller
{
    public function index()
    {
        $templates = CertificateTemplate::orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $templates]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120', // 5MB max
            'config' => 'nullable|string',
        ]);

        $data = $request->only(['name']);
        if ($request->filled('config')) {
            $data['config'] = json_decode($request->config, true);
        }

        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('certificates', 'public');
            $data['background_path'] = $path;
        }

        // Check if this is the first template, make it active
        if (CertificateTemplate::count() === 0) {
            $data['is_active'] = true;
        }

        $template = CertificateTemplate::create($data);

        return response()->json(['message' => 'Template created successfully', 'data' => $template], 201);
    }

    public function show(string $id)
    {
        $template = CertificateTemplate::findOrFail($id);
        return response()->json(['data' => $template]);
    }

    public function update(Request $request, string $id)
    {
        $template = CertificateTemplate::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'config' => 'nullable|string',
        ]);

        $data = $request->only(['name']);
        if ($request->filled('config')) {
            $data['config'] = json_decode($request->config, true);
        }

        if ($request->hasFile('background_image')) {
            // Delete old background if exists
            if ($template->background_path) {
                Storage::disk('public')->delete($template->background_path);
            }
            $path = $request->file('background_image')->store('certificates', 'public');
            $data['background_path'] = $path;
        }

        $template->update($data);

        return response()->json(['message' => 'Template updated successfully', 'data' => $template]);
    }

    public function destroy(string $id)
    {
        $template = CertificateTemplate::findOrFail($id);

        if ($template->is_active) {
            return response()->json(['message' => 'Cannot delete the active template.'], 400);
        }

        if ($template->background_path) {
            Storage::disk('public')->delete($template->background_path);
        }

        $template->delete();

        return response()->json(['message' => 'Template deleted successfully']);
    }

    public function setActive(string $id)
    {
        $template = CertificateTemplate::findOrFail($id);

        // Deactivate all others
        CertificateTemplate::where('id', '!=', $id)->update(['is_active' => false]);

        // Activate this one
        $template->update(['is_active' => true]);

        return response()->json(['message' => 'Template set as active successfully', 'data' => $template]);
    }

    public function preview(string $id)
    {
        $template = CertificateTemplate::findOrFail($id);
        
        $bgPath = null;
        if ($template->background_path && Storage::disk('public')->exists($template->background_path)) {
            $bgPath = storage_path('app/public/' . $template->background_path);
        } else {
            $bgPath = storage_path('app/public/certificates/excellent.jpg');
        }

        $data = [
            'mmic_code' => '1313-1313-1324',
            'company_name' => 'PT CINTA ABADI NUSANTARA',
            'company_address' => 'Jl. Jendral Sudirman No. 1, Jakarta',
            'company_sector' => 'Sektor Perikanan dan Akuakultur',
            'company_sector_en' => 'Fisheries & Marine Sector',
            'becdex_score' => 95.5,
            'becdex_category_id' => 11,
            'published_date' => Carbon::now()->translatedFormat('d F Y'),
            'valid_until' => Carbon::now()->addYear()->translatedFormat('d F Y'),
            'published_date_en' => Carbon::now()->locale('en')->translatedFormat('d F Y'),
            'valid_until_en' => Carbon::now()->addYear()->locale('en')->translatedFormat('d F Y'),
            'director_name' => 'Kaisar Akhir',
            'qr_base64' => 'https://becdex.com', // Dummy QR, in blade we check if it is valid or print text
            'bg_image_base64' => $bgPath,
            'config' => $template->config ?? [],
            'is_preview' => true
        ];

        $pdf = Pdf::loadView('pdf.certificate', $data);
        $pdf->setPaper('a4', 'portrait');

        return $pdf->stream('preview_certificate.pdf');
    }
}
