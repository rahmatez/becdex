"use client";

import { useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Upload, Trash2, FileText, Loader2 } from "lucide-react";
import { SubmissionDetail, ScoreData } from "@/types";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/store/lang";


interface Props {
  submission: SubmissionDetail;
  onUpdate: () => void;
}

function DocumentUploadZone({
  submissionId,
  indicatorId,
  indicatorName,
  onSuccess,
}: {
  submissionId: string;
  indicatorId: number;
  indicatorName: string;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      form.append("indicator_id", String(indicatorId));
      await api.post(`/submissions/${submissionId}/documents`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success(`Dokumen untuk ${indicatorName} berhasil diupload!`);
      onSuccess();
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Upload gagal.");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        mutation.mutate(acceptedFiles[0]);
      }
    },
    [mutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200",
        isDragActive
          ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40"
          : "border-slate-200/80 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 dark:bg-slate-900/60 dark:hover:bg-slate-800/80"
      )}
    >
      <input {...getInputProps()} />
      {mutation.isPending ? (
        <div className="flex items-center justify-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold py-1">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm font-semibold">{t.tab_doc_uploading || "Mengunggah berkas ke server..."}</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-slate-500 dark:text-slate-400 py-1 font-medium">
          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Upload size={15} />
          </div>
          <span className="text-xs md:text-sm">
            {isDragActive
              ? "Lepaskan berkas di sini sekarang..."
              : "Klik atau seret berkas ke sini (Format: PDF, JPG, PNG &bull; Maks 10MB)"}
          </span>
        </div>
      )}
    </div>
  );
}

export function DocumentsTab({ submission, onUpdate }: Props) {
  const { t } = useTranslation();

  const deleteMutation = useMutation({
    mutationFn: async (docId: number) => {
      await api.delete(`/submissions/${submission.id}/documents/${docId}`);
    },
    onSuccess: () => {
      toast.success("Dokumen berhasil dihapus.");
      onUpdate();
    },
    onError: () => {
      toast.error("Gagal menghapus dokumen.");
    },
  });

  // Bug #6 Fix: Fetch min_documents from API score endpoint (shared cache with ScorePaymentTab)
  const { data: scoreData } = useQuery<{ data: ScoreData }>({
    queryKey: ["score", submission.id],
    queryFn: async () => {
      const res = await api.get(`/submissions/${submission.id}/score`);
      return res.data;
    },
  });

  const canEdit = [2, 4].includes(submission.status.id);

  const uploadedDocsByIndicator = new Map<number, typeof submission.documents>();
  for (const doc of submission.documents ?? []) {
    if (!uploadedDocsByIndicator.has(doc.indicator_id)) {
      uploadedDocsByIndicator.set(doc.indicator_id, []);
    }
    uploadedDocsByIndicator.get(doc.indicator_id)!.push(doc);
  }

  const docsUploaded = submission.documents_uploaded ?? 0;

  // Bug #6 Fix: Use value from API instead of hardcoded 35
  const totalRequired = scoreData?.data?.requirements?.min_documents ?? 35;

  // Bug #5 Fix: Safer filter using explicit null/undefined check and parseFloat
  const eligibleIndicators = (submission.per_indicators ?? []).filter((pi) => {
    return pi.indicator.questions.some((q) => {
      const answer = submission.answers.find((a) => a.question_id === q.id);
      if (!answer || answer.value === null || answer.value === undefined) return false;
      const numValue = parseFloat(String(answer.value));
      return !isNaN(numValue) && numValue > 0;
    });
  });

  return (
    <div>
      {/* Progress */}
      <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl p-5 shadow-2xs mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Progres Unggah Dokumen Verifikasi
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
            Minimal {totalRequired} dokumen diperlukan untuk tahap verifikasi & pembayaran
          </p>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "text-2xl md:text-3xl font-extrabold tracking-tight",
              docsUploaded >= totalRequired
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-[#0c2340] dark:text-blue-300"
            )}
          >
            {docsUploaded}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-xs font-bold"> / {totalRequired}</span>
        </div>
      </div>

      {/* Indicator List */}
      <div className="space-y-3">
        {eligibleIndicators.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl transition-colors">
            <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500">{t.tab_doc_empty || "Belum Ada Dokumen untuk Diunggah"}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
              Silakan isi kuesioner assessment terlebih dahulu dan jawab &quot;Ya&quot; pada indikator yang sesuai dengan perusahaan Anda.
            </p>
          </div>
        ) : (
          eligibleIndicators.map((pi) => {
            const docs = uploadedDocsByIndicator.get(pi.indicator_id) ?? [];
            const hasDoc = docs.length > 0;

            return (
              <div
                key={pi.id}
                className={cn(
                  "border rounded-2xl p-5 shadow-2xs transition-all",
                  hasDoc
                    ? "border-emerald-200/80 bg-emerald-50/30 dark:border-emerald-800/60 dark:bg-emerald-950/20"
                    : "border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs",
                        hasDoc ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                      )}
                    />
                    <span className="text-sm md:text-base font-extrabold text-slate-800 dark:text-white truncate tracking-tight">
                      {pi.indicator.name}
                    </span>
                  </div>
                  <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-semibold px-2.5 py-1 rounded-lg text-[11px] shrink-0 border border-blue-100 dark:border-blue-900/50">
                    {pi.indicator.principle.name}
                  </span>
                </div>

                {/* Auditor Revision Note */}
                {pi.comment && (
                  <div className="mb-4 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 shadow-2xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5">!</span>
                    <div>
                      <span className="font-extrabold uppercase tracking-wider text-[10px] block text-amber-700 dark:text-amber-300 mb-0.5">
                        Catatan & Instruksi Revisi Auditor
                      </span>
                      <p className="font-semibold leading-relaxed">{pi.comment}</p>
                    </div>
                  </div>
                )}

                {/* Uploaded Docs */}
                {docs.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Berkas Pendukung Diunggah ({docs.length}):
                    </p>
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 border border-slate-200/60 dark:border-slate-700/80 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 truncate font-semibold transition-colors"
                          >
                            {doc.original_name}
                          </a>
                        </div>
                        {canEdit && (
                          <button
                            onClick={() => deleteMutation.mutate(doc.id)}
                            disabled={deleteMutation.isPending}
                            className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 shrink-0 cursor-pointer"
                            title="Hapus dokumen ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Zone */}
                {canEdit && (
                  <DocumentUploadZone
                    submissionId={submission.id}
                    indicatorId={pi.indicator_id}
                    indicatorName={pi.indicator.name}
                    onSuccess={onUpdate}
                  />
                )}

                {!canEdit && docs.length === 0 && (
                  <p className="text-sm text-slate-400 italic text-center p-4">{t.tab_doc_no_support || "Belum ada berkas pendukung diunggah untuk indikator ini"}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
