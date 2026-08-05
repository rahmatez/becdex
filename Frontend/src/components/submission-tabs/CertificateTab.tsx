"use client";

import { Award, Clock, Download, Printer } from "lucide-react";
import { SubmissionDetail } from "@/types";
import { useTranslation } from "@/store/lang";

interface Props {
  submission: SubmissionDetail;
}

export function CertificateTab({ submission }: Props) {
  const { t } = useTranslation();
  const cert = submission.certificate;
  const isCertified = submission.status.id === 5;

  if (!isCertified || !cert) {
    return (
      <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-8 md:p-12 text-center shadow-2xs transition-all">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 dark:bg-blue-950/60 rounded-2xl mb-5 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900/50">
          <Award className="w-10 h-10 animate-pulse" />
        </div>
        <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
          Sertifikat Belum Tersedia
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-sm mx-auto leading-relaxed font-medium">
          Sertifikat resmi Indeks Blue Economy akan diterbitkan setelah proses verifikasi berkas, penilaian lapangan, dan verifikasi pembayaran selesai disetujui oleh tim verifikator BECdex.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-2xs">
          <Clock size={14} className="text-blue-500" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t.tab_cert_status || "Status Pengajuan:"} <span className="text-slate-800 dark:text-slate-200">{submission.status.name}</span></p>
        </div>
      </div>
    );
  }

  const isValid = cert.is_valid;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Render Actual PDF Certificate via Iframe */}
      <div className="w-full h-150 md:h-200 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden bg-white">
        <iframe
          src={`${process.env.NEXT_PUBLIC_API_URL ?? ""}/public/submissions/${submission.id}/certificate/download`}
          className="w-full h-full border-none"
          title="Sertifikat BECdex"
        />
      </div>

      {/* Download & Print Actions */}
      {isValid && (
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL ?? ""}/public/submissions/${submission.id}/certificate/download`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#0c2340] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3.5 rounded-xl font-extrabold text-xs transition-all shadow-md shadow-[#0c2340]/20"
          >
            <Download size={16} />
              <span>{t.tab_cert_download || "Unduh PDF Sertifikat Resmi"}</span>
          </a>
          <button
            onClick={handlePrintCertificate}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs transition-all shadow-2xs cursor-pointer shrink-0"
          >
            <Printer size={16} />
              <span>{t.tab_cert_print || "Cetak Sertifikat"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
