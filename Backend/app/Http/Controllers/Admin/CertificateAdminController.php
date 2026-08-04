<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        $certs = $query->paginate(20);

        $mapped = collect($certs->items())->map(fn ($c) => [
            'id'           => $c->id,
            'mmic'         => $c->mmic,
            'direktur'     => $c->direktur,
            'published_at' => $c->published_at?->format('Y-m-d'),
            'valid_until'  => $c->valid_until?->format('Y-m-d'),
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
}
