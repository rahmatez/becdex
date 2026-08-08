<?php

namespace App\Http\Controllers\Submission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Submission\UploadDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Models\Submission;
use App\Models\SubmissionPerIndicator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * POST /api/submissions/{id}/documents
     * Upload dokumen per indikator
     */
    public function upload(UploadDocumentRequest $request, string $id): JsonResponse
    {
        $submission = $request->user()
            ->submissions()
            ->whereIn('submission_status_id', [2, 4])
            ->findOrFail($id);

        $existingDocsCount = Document::where('submission_id', $submission->id)
            ->where('indicator_id', $request->indicator_id)
            ->count();

        if ($existingDocsCount >= 10) {
            return response()->json([
                'message' => 'Anda telah mencapai batas maksimal 10 dokumen untuk indikator ini.'
            ], 422);
        }

        $file = $request->file('file');
        $path = $file->store("documents/{$submission->id}", 'public');

        $document = Document::create([
            'submission_id' => $submission->id,
            'indicator_id'  => $request->indicator_id,
            'file_path'     => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type'     => $file->getMimeType(),
            'file_size'     => $file->getSize(),
        ]);

        // Update per-indicator status ke 1 (Uploaded)
        SubmissionPerIndicator::where('submission_id', $submission->id)
            ->where('indicator_id', $request->indicator_id)
            ->update(['per_indicator_status_id' => 2]); // Uploaded

        return response()->json([
            'message' => 'Document uploaded successfully.',
            'data'    => new DocumentResource($document->load('indicator')),
        ], 201);
    }

    /**
     * GET /api/submissions/{id}/documents
     * Daftar dokumen dalam satu submission
     */
    public function index(Request $request, string $id): JsonResponse
    {
        $submission = $request->user()
            ->submissions()
            ->findOrFail($id);

        $documents = $submission->documents()
            ->with('indicator')
            ->get();

        return response()->json([
            'data'  => DocumentResource::collection($documents),
            'total' => $documents->count(),
        ]);
    }

    /**
     * DELETE /api/submissions/{id}/documents/{docId}
     * Hapus dokumen
     */
    public function destroy(Request $request, string $id, int $docId): JsonResponse
    {
        $submission = $request->user()
            ->submissions()
            ->where('submission_status_id', 2) // Hanya boleh hapus dokumen saat status Draft (2)
            ->findOrFail($id);

        $document = $submission->documents()->findOrFail($docId);
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        // Jika tidak ada dokumen lain untuk indikator ini, reset status
        $remaining = $submission->documents()
            ->where('indicator_id', $document->indicator_id)
            ->count();

        if ($remaining === 0) {
            SubmissionPerIndicator::where('submission_id', $submission->id)
                ->where('indicator_id', $document->indicator_id)
                ->update(['per_indicator_status_id' => 1]); // Not Uploaded
        }

        return response()->json(['message' => 'Document deleted successfully.']);
    }
}
