<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\RoleId;
use App\Models\SubmissionPerIndicator;
use App\Models\IndicatorComment;
use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Support\Facades\Auth;

class IndicatorCommentController extends Controller
{
    public function index(string $submission_id, string $indicator_id)
    {
        $perIndicator = SubmissionPerIndicator::where('submission_id', $submission_id)
            ->where('indicator_id', $indicator_id)
            ->firstOrFail();

        $comments = $perIndicator->comments()->with('user:id,name')->orderBy('created_at', 'asc')->get();

        return response()->json(['data' => $comments]);
    }

    public function store(Request $request, string $submission_id, string $indicator_id)
    {
        $request->validate(['message' => 'required|string']);

        $perIndicator = SubmissionPerIndicator::with(['indicator', 'submission.user'])
            ->where('submission_id', $submission_id)
            ->where('indicator_id', $indicator_id)
            ->firstOrFail();

        $user = Auth::user();

        $comment = $perIndicator->comments()->create([
            'user_id' => $user->id,
            'message' => $request->message,
        ]);

        // If Assessor/Admin replies, notify the Company/User
        if (in_array($user->role_id, RoleId::adminRoleIds())) {
            $companyUser = $perIndicator->submission->user;
            $companyUser->notify(new SystemNotification(
                'Pesan Baru dari Asesor',
                'Asesor membalas pesan pada indikator: ' . $perIndicator->indicator->name,
                '/dashboard/submissions/' . $submission_id
            ));
        } else if ($user->role_id === RoleId::Company->value) {
            // If Company replies, notify Admins/Assessors
            $admins = User::whereIn('role_id', RoleId::adminRoleIds())->get();
            foreach ($admins as $admin) {
                $admin->notify(new SystemNotification(
                    'Pesan Baru dari Perusahaan',
                    'Perusahaan membalas pesan pada indikator: ' . $perIndicator->indicator->name,
                    '/admin/submissions/' . $submission_id
                ));
            }
        }

        return response()->json(['message' => 'Comment added', 'data' => $comment->load('user:id,name')]);
    }
}
