<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateUser;
use App\Notifications\SystemNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CertificateAdminController extends Controller
{
    /**
     * GET /api/admin/certificates
     * List all issued certificates with search
     */
    public function index(Request $request): JsonResponse
    {
        $query = CertificateUser::with([
            'user:id,name,email',
            'submission:id,initial_score,valid_score',
            'certificate:id,category,file_path',
        ])->latest('published_at');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', fn ($u) =>
                $u->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
            );
        }
        if ($request->filled('valid')) {
            if ($request->valid === 'active') {
                $query->where('valid_until', '>=', now());
            } else {
                $query->where('valid_until', '<', now());
            }
        }
        // Filter by approval status
        if ($request->filled('approval')) {
            if ($request->approval === 'pending') {
                $query->where('is_approved', false);
            } elseif ($request->approval === 'approved') {
                $query->where('is_approved', true);
            }
        }

        $certs = $query->paginate(20);

        $mapped = collect($certs->items())->map(fn ($c) => [
            'id'           => $c->id,
            'mmic'         => $c->mmic,
            'direktur'     => $c->direktur,
            'published_at' => $c->published_at?->format('Y-m-d'),
            'valid_until'  => $c->valid_until?->format('Y-m-d'),
            'is_approved'  => (bool) $c->is_approved,
            'user'         => $c->user ? [
                'id'    => $c->user->id,
                'name'  => $c->user->name,
                'email' => $c->user->email,
            ] : null,
            'certificate'  => $c->certificate ? [
                'id'   => $c->certificate->id,
                'name' => ucfirst($c->certificate->category),
            ] : null,
            'submission'   => $c->submission ? [
                'id'            => $c->submission->id,
                'initial_score' => (float)$c->submission->initial_score,
                'valid_score'   => (float)$c->submission->valid_score,
            ] : null,
        ]);

        return response()->json([
            'data' => $mapped,
            'meta' => [
                'current_page' => $certs->currentPage(),
                'last_page'    => $certs->lastPage(),
                'per_page'     => $certs->perPage(),
                'total'        => $certs->total(),
            ],
        ]);
    }

    /**
     * GET /api/admin/certificates/{id}
     * Detail of one certificate
     */
    public function show(int $id): JsonResponse
    {
        $cert = CertificateUser::with([
            'user.companyDetail',
            'submission',
            'certificate',
        ])->findOrFail($id);

        return response()->json(['data' => $cert]);
    }

    /**
     * POST /api/admin/certificates/{id}/approve
     * Super Admin menyetujui sertifikat → is_approved = true
     * Sertifikat baru aktif dan bisa dilihat user & publik
     */
    public function approve(int $id): JsonResponse
    {
        $cert = CertificateUser::with(['user.companyDetail.companyField', 'submission', 'certificate'])->findOrFail($id);

        if ($cert->is_approved) {
            return response()->json(['message' => 'Sertifikat ini sudah disetujui sebelumnya.'], 422);
        }

        $cert->update(['is_approved' => true]);

        // Notifikasi ke perusahaan
        if ($cert->user) {
            $cert->user->notify(new SystemNotification(
                'Sertifikat BECdex Disetujui!',
                'Selamat! Sertifikat BECdex Anda telah disetujui dan kini aktif. Anda dapat mengunduhnya sekarang.',
                '/dashboard/submissions/' . ($cert->submission_id ?? '')
            ));

            // Generate dan kirim PDF sertifikat via email
            try {
                $bgImageBase64 = '';
                if ($cert->certificate && $cert->certificate->file_path) {
                    $bgPath = storage_path('app/public/' . $cert->certificate->file_path);
                    if (file_exists($bgPath)) {
                        $bgImageBase64 = 'data:image/jpeg;base64,' . base64_encode(file_get_contents($bgPath));
                    }
                }

                $qrUrl    = url('/verified-companies');
                $qrBase64 = '';
                try {
                    $qrApiUrl          = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" . urlencode($qrUrl);
                    $arrContextOptions = ["ssl" => ["verify_peer" => false, "verify_peer_name" => false]];
                    $qrData            = file_get_contents($qrApiUrl, false, stream_context_create($arrContextOptions));
                    if ($qrData) {
                        $qrBase64 = 'data:image/png;base64,' . base64_encode($qrData);
                    }
                } catch (\Exception $e) {}

                $data = [
                    'bg_image_base64'    => $bgImageBase64,
                    'mmic_code'          => ($cert->published_at ? $cert->published_at->format('dmY') : '') . ($cert->mmic ?? ''),
                    'company_name'       => $cert->user->name,
                    'company_address'    => $cert->user->companyDetail->address ?? '',
                    'company_sector'     => $cert->user->companyDetail->companyField->name ?? 'Maritime Sector',
                    'becdex_category_id' => $cert->certificate->id ?? 10,
                    'qr_base64'          => $qrBase64,
                    'published_date'     => $cert->published_at ? $cert->published_at->format('d-m-Y') : '',
                    'valid_until'        => $cert->valid_until ? $cert->valid_until->format('d-m-Y') : '',
                    'director_name'      => $cert->direktur ?? 'Rahmat Ihsan, S.H.',
                ];

                $pdf        = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.certificate', $data);
                $pdf->setPaper('a4', 'portrait');
                $pdfContent = $pdf->output();
                $pdfFileName = 'certificate_' . str_replace(' ', '_', $cert->user->name) . '.pdf';

                if ($cert->submission) {
                    Mail::to($cert->user->email)->queue(new \App\Mail\CertificateIssuedMail($cert->submission, $pdfContent, $pdfFileName));
                }
            } catch (\Exception $e) {
                Log::error('Failed to send certificate approval email: ' . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'Sertifikat berhasil disetujui dan sekarang aktif. Notifikasi telah dikirim ke perusahaan.',
        ]);
    }
}
