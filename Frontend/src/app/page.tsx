"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/store/lang";
import { Phone, Mail, MapPin, Clock, HelpCircle, X } from "lucide-react";
import Image from "next/image";
import { PublicHeader } from "@/components/layouts/PublicHeader";
import { PublicFooter } from "@/components/layouts/PublicFooter";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LandingPage() {
  const { t, locale } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpForm, setHelpForm] = useState({ name: "", email: "", phone: "", category: "Feedback", detail: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) return null;

  const slides = ["/becdex1.webp", "/becdex2.webp", "/becdex3.webp"];

  const handleHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpForm.name || !helpForm.email || !helpForm.detail) {
      toast.error(locale === "id" ? "Mohon isi semua bidang wajib!" : "Please fill in all required fields!");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/public/help", {
        name: helpForm.name,
        email: helpForm.email,
        whatsapp: helpForm.phone,
        issue_type: helpForm.category,
        detail: helpForm.detail,
      });
      toast.success(locale === "id" ? "Pesan bantuan Anda telah berhasil dikirim!" : "Your help request has been successfully sent!");
      setHelpForm({ name: "", email: "", phone: "", category: "Feedback", detail: "" });
      setIsHelpOpen(false);
    } catch {
      toast.error(locale === "id" ? "Gagal mengirim pesan." : "Failed to send help request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <PublicHeader />

      {/* Hero Section (Slightly increased top padding for better breathing space) */}
      <section id="hero" className="hero-section pt-10 pb-12 md:pt-16 md:pb-24">
        <div className="container-custom grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Content */}
          <div className="space-y-6 pt-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#012970] leading-tight tracking-tight">
              Blue Economy Company Index (BECdex)
            </h1>

            <div className="space-y-3">
              <h5 className="text-[#4154f1] text-lg font-bold hover:underline cursor-pointer">{t.hero_what_is}</h5>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                {t.hero_desc_1}
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                {t.hero_desc_2}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h5 className="text-[#4154f1] text-lg font-bold hover:underline cursor-pointer">{t.hero_how_certified}</h5>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                {t.hero_cert_process}
              </p>
            </div>

            <div className="pt-6 text-gray-800 text-xl md:text-2xl font-bold">
              {t.hero_certify_link}{" "}
              <Link href="/register" className="text-[#4154f1] underline font-extrabold hover:text-[#2e3fe6]">
                {t.hero_click_here}
              </Link>
            </div>
          </div>

          {/* Right Content: Slideshow Carousel & Flow Diagram */}
          <div className="space-y-4 pt-0">
            {/* Slideshow (Borderless, no chevrons, no dots) */}
            <div className="relative w-full overflow-hidden">
              <div className="relative w-full aspect-4/3 md:aspect-[1.3] overflow-hidden">
                <Image
                  src={slides[activeSlide]}
                  alt={`Slide ${activeSlide + 1}`}
                  fill
                  className="object-contain transition-opacity duration-500 scale-115 md:scale-130"
                  priority
                />
              </div>
            </div>

            {/* Flow Diagram */}
            <div className="text-center pt-2">
              <Image
                src="/newestflow.webp"
                alt="BECdex Certification Flow"
                width={500}
                height={300}
                className="mx-auto rounded-lg"
              />
              <p className="text-gray-500 text-xs mt-4">
                {t.hero_info}{" "}
                <a href="mailto:info@becdex.com" className="text-[#4154f1] font-semibold hover:underline">
                  info@becdex.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Assessment Standards Section ======= */}
      <section style={{ backgroundColor: "#f6f9ff", padding: "70px 0 30px 0", fontFamily: "'Open Sans', sans-serif" }}>
        <div className="container-custom">
          <div style={{ textAlign: "left", marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#012970", margin: "0 0 15px 0", lineHeight: 1.25, fontFamily: "'Nunito', sans-serif" }}>
              {t.assess_title}
            </h2>
            <p style={{ fontSize: 16, color: "#555", margin: 0, maxWidth: 950, lineHeight: 1.6 }}>
              {t.assess_subtitle}
            </p>
          </div>

          {/* Stage 1 */}
          <div style={{ marginBottom: 45 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#012970", marginBottom: 12, fontFamily: "'Nunito', sans-serif" }}>
              1. {t.assess_stage1_title}
            </h3>
            <p style={{ fontSize: 15, color: "#5e5e5e", marginBottom: 25, lineHeight: 1.6 }}>{t.assess_stage1_desc}</p>
            <div className="assess-grid-3">
              {[
                { icon: "bi-shield-check", title: t.assess_s1_c1_title, desc: t.assess_s1_c1_desc },
                { icon: "bi-water",         title: t.assess_s1_c2_title, desc: t.assess_s1_c2_desc },
                { icon: "bi-people",        title: t.assess_s1_c3_title, desc: t.assess_s1_c3_desc },
              ].map((card, idx) => (
                <div key={idx} className="assess-card-item">
                  <div className="assess-icon-box"><i className={`bi ${card.icon}`} /></div>
                  <div>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: "#132a22", marginBottom: 8, fontFamily: "'Nunito', sans-serif", lineHeight: 1.3 }}>{card.title}</h4>
                    <p style={{ fontSize: 13.5, color: "#555", margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14.5, color: "#555", marginTop: 20, lineHeight: 1.6 }}>{t.assess_stage1_footer}</p>
          </div>

          {/* Stage 2 */}
          <div style={{ marginBottom: 45 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#012970", marginBottom: 12, fontFamily: "'Nunito', sans-serif" }}>
              2. {t.assess_stage2_title}
            </h3>
            <p style={{ fontSize: 15, color: "#5e5e5e", marginBottom: 25, lineHeight: 1.6 }}>{t.assess_stage2_desc}</p>
            <div className="assess-grid-2">
              {[
                { icon: "bi-geo-alt",         title: t.assess_s2_c1_title, desc: t.assess_s2_c1_desc },
                { icon: "bi-chat-left-quote", title: t.assess_s2_c2_title, desc: t.assess_s2_c2_desc },
              ].map((card, idx) => (
                <div key={idx} className="assess-card-item">
                  <div className="assess-icon-box"><i className={`bi ${card.icon}`} /></div>
                  <div>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: "#132a22", marginBottom: 8, fontFamily: "'Nunito', sans-serif", lineHeight: 1.3 }}>{card.title}</h4>
                    <p style={{ fontSize: 13.5, color: "#555", margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14.5, color: "#555", marginTop: 20, lineHeight: 1.6 }}>{t.assess_stage2_footer}</p>
          </div>
        </div>
      </section>

      {/* ======= Experts Section ======= */}
      <section style={{ backgroundColor: "#fff", padding: "70px 0", fontFamily: "'Open Sans', sans-serif" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#012970", marginBottom: 15, fontFamily: "'Nunito', sans-serif" }}>
              {t.expert_title}
            </h2>
            <p style={{ fontSize: 16, color: "#555", maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
              {t.expert_desc}
            </p>
          </div>
          <div className="experts-grid">
            {[
              { photo: "/expert/kaisar-akhir.png",   name: t.expert_1_name,  title: t.expert_1_title  },
              { photo: "/expert/basilo.jpg",          name: t.expert_2_name,  title: t.expert_2_title  },
              { photo: "/expert/sahatua.jpg",         name: t.expert_3_name,  title: t.expert_3_title  },
              { photo: "/expert/dr ir diah.jpg",      name: t.expert_4_name,  title: t.expert_4_title  },
              { photo: "/expert/Evi-gravitiani.jpg",  name: t.expert_5_name,  title: t.expert_5_title  },
              { photo: "/expert/dr subhan.jpg",       name: t.expert_6_name,  title: t.expert_6_title  },
              { photo: "/expert/gugus_wijonarko.jpg", name: t.expert_7_name,  title: t.expert_7_title  },
              { photo: "/expert/Derry-Wanta.jpg",     name: t.expert_8_name,  title: t.expert_8_title  },
              { photo: "/expert/sony.jpg",            name: t.expert_9_name,  title: t.expert_9_title  },
              { photo: "/expert/nurmaria sarosa.jpg", name: t.expert_11_name, title: t.expert_11_title },
              { photo: "/expert/agung_dhamar_syakti.jpg", name: t.expert_12_name, title: t.expert_12_title },
              { photo: "/expert/Prof.-Dr.-Asadatun-Abdullah-S.Pi_.-M.S.M.-M.Si_.jpg", name: t.expert_13_name, title: t.expert_13_title },
            ].map((expert, idx) => (
              <div key={idx} className="expert-card-item">
                <div className="expert-img-wrap">
                  <Image src={expert.photo} alt={expert.name} width={200} height={250} className="expert-photo" />
                </div>
                <div className="expert-info-box">
                  <h4>{expert.name}</h4>
                  <p>{expert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= Recognition Section ======= */}
      <section style={{ backgroundColor: "#f6f9ff", padding: "70px 0 80px 0", fontFamily: "'Open Sans', sans-serif" }}>
        <div className="container-custom">
          <div className="recognition-layout">
            {/* Left Content */}
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#012970", margin: "0 0 20px 0", fontFamily: "'Nunito', sans-serif", lineHeight: 1.25 }}>
                {t.rec_title}
              </h2>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.65, margin: "0 0 35px 0" }}>
                {t.rec_subtitle}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 30, marginBottom: 40 }}>
                {[
                  { icon: "bi-patch-check", title: t.rec_f1_title, desc: t.rec_f1_desc },
                  { icon: "bi-globe",       title: t.rec_f2_title, desc: t.rec_f2_desc },
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 26, color: "#143529", background: "rgba(20,53,41,0.08)", width: 52, height: 52, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", flexShrink: 0 }}>
                      <i className={`bi ${feat.icon}`} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 18, fontWeight: 700, color: "#012970", margin: "0 0 8px 0", fontFamily: "'Nunito', sans-serif" }}>{feat.title}</h4>
                      <p style={{ fontSize: 14.5, color: "#5e5e5e", lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/register" className="recognition-outline-btn">
                {t.rec_btn_text}
              </Link>
            </div>
            {/* Right Image */}
            <div style={{ borderRadius: 8, overflow: "hidden" }}>
              <Image src="/recognition.jpg" alt="BECdex Recognition" width={600} height={450} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Certification Body Section */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="container-custom text-center space-y-6">
          <div className="section-header">
            <p>CERTIFICATION BODY</p>
          </div>
          <div className="flex justify-center">
            <a href="https://maritimepreneur.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <Image src="/becdex_icc.webp" alt="BECdex ICC Logo" width={220} height={110} className="object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* Member Of Section */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="container-custom text-center space-y-6">
          <div className="section-header">
            <p>MEMBER OF</p>
          </div>
          <div className="flex justify-center">
            <Image src="/member_of.jpg" alt="Member of Logo" width={260} height={110} className="object-contain" />
          </div>
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="container-custom text-center space-y-6">
          <div className="section-header">
            <p>STRATEGIC PARTNERS</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 pt-4">
            {[
              { src: "/blue_institute.webp", href: "#" },
              { src: "/maritim_muda_partner.png", href: "https://maritimmuda.id" },
              { src: "/stie_ibec_partner.webp", href: "https://ibec.stei.ac.id/" },
            ].map((p, idx) => (
              <a key={idx} href={p.href} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <Image src={p.src} alt="Strategic Partner" width={200} height={90} className="object-contain max-h-20" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#fafbfe] py-16 border-t border-gray-100">
        <div className="container-custom">
          <div className="section-header">
            <p>{t.contact_title}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Office */}
            <div className="info-box-custom text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4154f1] flex items-center justify-center mx-auto">
                <MapPin size={20} />
              </div>
              <h3>{t.contact_office}</h3>
              <p>
                {t.contact_office_desc}
                <br />
                {t.contact_campus}
                <br />
                Jalan Pratekan No. 9A, Rawamangun,
                <br />
                Jakarta, Indonesia 13220
              </p>
            </div>

            {/* Card Call */}
            <div className="info-box-custom text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4154f1] flex items-center justify-center mx-auto">
                <Phone size={20} />
              </div>
              <h3>{t.contact_call}</h3>
              <p>
                {t.contact_call_desc}
              </p>
            </div>

            {/* Card Email */}
            <div className="info-box-custom text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4154f1] flex items-center justify-center mx-auto">
                <Mail size={20} />
              </div>
              <h3>{t.contact_email}</h3>
              <p className="font-semibold text-[#4154f1] hover:underline cursor-pointer">
                info@becdex.com
              </p>
            </div>

            {/* Card Open Hours */}
            <div className="info-box-custom text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4154f1] flex items-center justify-center mx-auto">
                <Clock size={20} />
              </div>
              <h3>{t.contact_hours}</h3>
              <p>
                {t.contact_hours_day}
                <br />
                9:00AM - 05:00PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />

      {/* Floating Help Center Trigger Button */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#4154f1] hover:bg-[#2e3fe6] text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 z-40 border border-white/20"
      >
        <HelpCircle size={24} />
      </button>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setIsHelpOpen(false)} className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700">
              <X size={18} />
            </button>
            <h3 className="text-[#012970] font-black text-xl">{t.help_title}</h3>
            <form onSubmit={handleHelpSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.help_name}</label>
                <input
                  type="text"
                  required
                  value={helpForm.name}
                  onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                  placeholder={t.help_placeholder}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#4154f1]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.help_email}</label>
                <input
                  type="email"
                  required
                  value={helpForm.email}
                  onChange={(e) => setHelpForm({ ...helpForm, email: e.target.value })}
                  placeholder={t.help_placeholder}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#4154f1]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.help_phone}</label>
                <input
                  type="tel"
                  required
                  value={helpForm.phone}
                  onChange={(e) => setHelpForm({ ...helpForm, phone: e.target.value })}
                  placeholder={t.help_placeholder}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#4154f1]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.help_category}</label>
                <select
                  value={helpForm.category}
                  onChange={(e) => setHelpForm({ ...helpForm, category: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none"
                >
                  <option value="Feedback">{t.help_feedback}</option>
                  <option value="Platform">{t.help_platform}</option>
                  <option value="Optional">{t.help_optional}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t.help_detail}</label>
                <textarea
                  required
                  rows={3}
                  value={helpForm.detail}
                  onChange={(e) => setHelpForm({ ...helpForm, detail: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#4154f1]/20"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsHelpOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  {t.help_close}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#4154f1] text-white rounded-lg text-xs font-bold hover:bg-[#2e3fe6] shadow-xs flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 size={12} className="animate-spin" />}
                  {t.help_save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
