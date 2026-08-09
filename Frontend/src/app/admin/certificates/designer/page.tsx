"use client";

import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Save, Eye } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

type TemplateConfig = {
  [key: string]: {
    x: number;
    y: number;
    fontSize: number;
    color: string;
    textAlign: "left" | "center" | "right";
    fontFamily: string;
    fontWeight?: string;
    width: string;
    text?: string;
  };
};

interface Template {
  id: number;
  background_path?: string;
  config?: TemplateConfig;
}

export default function CertificateDesignerPage() {
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  
  // Canvas state
  const canvasRef = useRef<HTMLDivElement>(null);
  const [bgCategory, setBgCategory] = useState<string>("excellent");
  const bgImage = activeTemplate?.background_path
    ? `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/api\/?$/, '')}/storage/${activeTemplate.background_path}`
    : `/certificate/${bgCategory}.jpg`;

  // Dragging state
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Config state
  const [config, setConfig] = useState<TemplateConfig>({
    mmic_code: { x: 70, y: 15, fontSize: 25, color: "#000000", textAlign: "right", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "1313-1313-1324" },
    company_name: { x: 50, y: 35, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "80%", text: "PT CINTA ABADI NUSANTARA" },
    company_address: { x: 50, y: 40, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "80%", text: "Jl. Pratekan No. 9A, Jakarta 13220" },
    company_sector: { x: 50, y: 65, fontSize: 25, color: "#000000", textAlign: "left", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "Sektor Perikanan & Kelautan" },
    company_sector_en: { x: 50, y: 70, fontSize: 25, color: "#000000", textAlign: "left", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "Fisheries & Marine Sector" },
    published_date_1: { x: 30, y: 78, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 Juli 2026" },
    valid_until: { x: 50, y: 78, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 Juli 2027" },
    published_date_2: { x: 40, y: 83, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 Juli 2026" },
    published_date_1_en: { x: 30, y: 80, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 July 2026" },
    valid_until_en: { x: 50, y: 80, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 July 2027" },
    published_date_2_en: { x: 40, y: 85, fontSize: 25, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "22 July 2026" },
    qr_code: { x: 80, y: 80, fontSize: 80, color: "#000000", textAlign: "center", fontFamily: "Helvetica", fontWeight: "bold", width: "auto", text: "[QR CODE]" },
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Fetch active template on load
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/admin/certificate-templates");
        const templates = res.data.data;
        if (templates && templates.length > 0) {
          const active = templates.find((t: {is_active: boolean}) => t.is_active) || templates[0];
          if (active) {
            setActiveTemplate(active);
            if (active.config) {
              // Merge so new default fields aren't lost if they load an old config
              setConfig(prev => ({ ...prev, ...active.config }));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load templates", err);
      }
    };
    fetchTemplates();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", "Default Certificate Design");
      formData.append("config", JSON.stringify(config));
      formData.append("is_active", "1");

      if (activeTemplate) {
        formData.append("_method", "PUT");
        const res = await api.post(`/admin/certificate-templates/${activeTemplate.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setActiveTemplate(res.data.data);
        toast.success("Desain sertifikat berhasil diperbarui.");
      } else {
        const res = await api.post("/admin/certificate-templates", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setActiveTemplate(res.data.data);
        toast.success("Desain sertifikat baru berhasil dibuat.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan desain sertifikat.");
    }
  };

  const handlePreview = () => {
    if (!activeTemplate) {
      toast.error("Harap simpan desain terlebih dahulu untuk melihat pratinjau PDF.");
      return;
    }
    const url = `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/api\/?$/, '')}/api/admin/certificate-templates/${activeTemplate.id}/preview`;
    window.open(url, "_blank");
  };

  // Draggable logic
  const handlePointerDown = (e: React.PointerEvent, key: string) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const el = config[key];
    
    // Calculate pixel positions based on percentage
    const currentX = (el.x / 100) * rect.width;
    const currentY = (el.y / 100) * rect.height;
    
    // Offset between mouse click and element center (since transform: translate(-50%, -50%))
    setDragOffset({
      x: e.clientX - rect.left - currentX,
      y: e.clientY - rect.top - currentY
    });
    
    setIsDragging(key);
    setSelectedElement(key);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    
    // New pixel positions
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    // Convert back to percentage
    let pX = (newX / rect.width) * 100;
    let pY = (newY / rect.height) * 100;

    // Constrain
    pX = Math.max(0, Math.min(100, pX));
    pY = Math.max(0, Math.min(100, pY));

    setConfig(prev => ({
      ...prev,
      [isDragging]: { ...prev[isDragging], x: pX, y: pY }
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsDragging(null);
    }
  };

  return (
    <AppLayout title="Certificate Designer">
      <div className="flex flex-col md:flex-row gap-6 h-full min-h-[80vh]">
        
        {/* Canvas Area (A4 Landscape aspect ratio = 1.414) */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-slate-800 dark:text-white">Visual Editor</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Preview Latar:</span>
              <select 
                value={bgCategory}
                onChange={(e) => setBgCategory(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold border border-slate-200 shadow-sm text-slate-700 dark:text-slate-300"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="standard">Standard</option>
              </select>
            </div>
          </div>

          <div 
            className="w-full relative bg-white shadow-xl mx-auto shrink-0"
            style={{ aspectRatio: "210/297", maxWidth: "600px", containerType: 'inline-size' }}
            ref={canvasRef}
          >
            {bgImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold border-2 border-dashed border-slate-300 bg-slate-50">
                Upload A4 Landscape Background
              </div>
            )}

            {Object.entries(config).map(([key, style]) => (
              <div
                key={key}
                onPointerDown={(e) => handlePointerDown(e, key)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`absolute cursor-move select-none ${selectedElement === key ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-slate-400'}`}
                style={{
                  left: `${style.x}%`,
                  top: `${style.y}%`,
                  fontSize: `${(style.fontSize / 794) * 100}cqw`, // Accurate A4 width scaling (794px)
                  color: style.color,
                  textAlign: style.textAlign,
                  fontFamily: style.fontFamily,
                  fontWeight: style.fontWeight || "normal",
                  width: key === 'qr_code' ? `${(style.fontSize / 794) * 100}cqw` : (style.width === 'auto' ? 'max-content' : style.width),
                  height: key === 'qr_code' ? `${(style.fontSize / 794) * 100}cqw` : 'auto',
                  lineHeight: 1.2,
                  margin: 0,
                  padding: 0
                }}
              >
                {key === 'qr_code' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dummy" style={{width:'100%', height:'100%'}} alt="QR Code" />
                ) : style.text}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-xs text-slate-500">
            Tarik (Drag) teks di atas untuk memindahkan posisinya di sertifikat.
          </div>
        </div>

        {/* Properties Sidebar */}
        <div className="w-full md:w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col shadow-2xs">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 border-b pb-2">Properties</h3>
          
          {selectedElement ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Editing Element:</label>
                <div className="font-mono text-sm font-bold text-blue-600 bg-blue-50 py-1 px-2 rounded">{selectedElement}</div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Font Size (px)</label>
                <input 
                  type="number" 
                  value={config[selectedElement].fontSize}
                  onChange={(e) => setConfig(prev => ({...prev, [selectedElement]: {...prev[selectedElement], fontSize: Number(e.target.value)}}))}
                  className="w-full px-3 py-1.5 rounded-lg border text-sm bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Text Color</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={config[selectedElement].color}
                    onChange={(e) => setConfig(prev => ({...prev, [selectedElement]: {...prev[selectedElement], color: e.target.value}}))}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={config[selectedElement].color}
                    onChange={(e) => setConfig(prev => ({...prev, [selectedElement]: {...prev[selectedElement], color: e.target.value}}))}
                    className="w-full px-3 py-1.5 rounded-lg border text-sm bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Text Align</label>
                <select 
                  value={config[selectedElement].textAlign}
                  onChange={(e) => setConfig(prev => ({...prev, [selectedElement]: {...prev[selectedElement], textAlign: e.target.value as "left" | "center" | "right"}}))}
                  className="w-full px-3 py-1.5 rounded-lg border text-sm bg-slate-50"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Font Weight</label>
                <select 
                  value={config[selectedElement].fontWeight || "normal"}
                  onChange={(e) => setConfig(prev => ({...prev, [selectedElement]: {...prev[selectedElement], fontWeight: e.target.value}}))}
                  className="w-full px-3 py-1.5 rounded-lg border text-sm bg-slate-50"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="800">Extra Bold</option>
                  <option value="900">Black</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
                Position X: {config[selectedElement].x.toFixed(1)}% <br/>
                Position Y: {config[selectedElement].y.toFixed(1)}%
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-400 text-center">
              Klik salah satu elemen di canvas untuk mengatur properti.
            </div>
          )}

          <div className="mt-auto pt-6 space-y-2">
            <button 
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-[#0c2340] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all text-sm"
            >
              <Save size={16} /> Simpan Desain
            </button>
            <button 
              onClick={handlePreview}
              className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2.5 rounded-xl transition-all text-sm border border-emerald-200"
            >
              <Eye size={16} /> Preview PDF Asli
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
