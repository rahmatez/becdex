"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { PublicHeader } from "@/components/layouts/PublicHeader";
import { PublicFooter } from "@/components/layouts/PublicFooter";
import { LoadingSpinner } from "@/components/ui/index";
import { Target, Search, ChevronDown, ChevronRight, Layers, FileText, Bookmark } from "lucide-react";

interface Question { id: number; text: string; weight?: number }
interface Indicator { id: number; name: string; questions: Question[]; principle?: { name: string; outcome?: { name: string; aspect?: { name: string } } } }

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedAspect, setSelectedAspect] = useState("All");
  const [selectedPrinciples, setSelectedPrinciples] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ["catalog-indicators"],
    queryFn: () => api.get("/public/indicators").then(r => r.data.data as Indicator[]),
  });

  const toggle = (id: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  // Derive unique Aspects and Principles
  const aspects = useMemo(() => {
    if (!data) return [];
    const aspectSet = new Set<string>();
    data.forEach(i => {
      const aspect = i.principle?.outcome?.aspect?.name ?? "Lainnya";
      aspectSet.add(aspect);
    });
    return Array.from(aspectSet).sort();
  }, [data]);

  const principles = useMemo(() => {
    if (!data) return [];
    const principleSet = new Set<string>();
    data.forEach(i => {
      if (selectedAspect === "All" || (i.principle?.outcome?.aspect?.name ?? "Lainnya") === selectedAspect) {
        if (i.principle?.name) {
          principleSet.add(i.principle.name);
        }
      }
    });
    return Array.from(principleSet).sort();
  }, [data, selectedAspect]);

  const handlePrincipleChange = (name: string) => {
    setSelectedPrinciples(prev => 
      prev.includes(name) 
        ? prev.filter(p => p !== name)
        : [...prev, name]
    );
  };

  // Filter Data
  const filteredIndicators = useMemo(() => {
    if (!data) return [];
    return data.filter(i => {
      if (search) {
        const query = search.toLowerCase();
        const matchesName = i.name.toLowerCase().includes(query);
        const matchesPrinciple = i.principle?.name?.toLowerCase().includes(query);
        const matchesQuestions = i.questions.some(q => q.text.toLowerCase().includes(query));
        if (!matchesName && !matchesPrinciple && !matchesQuestions) return false;
      }

      const aspect = i.principle?.outcome?.aspect?.name ?? "Lainnya";

      if (selectedAspect !== "All" && aspect !== selectedAspect) {
        return false;
      }

      if (selectedPrinciples.length > 0) {
        if (!i.principle?.name || !selectedPrinciples.includes(i.principle.name)) {
          return false;
        }
      }

      return true;
    });
  }, [data, search, selectedAspect, selectedPrinciples]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      <PublicHeader />
      
      <main className="flex-1 max-w-300 w-full mx-auto px-4 py-8 lg:py-12 flex flex-col md:flex-row gap-6 lg:gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-70 shrink-0">
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            {/* Header */}
            <div className="bg-[#0d6efd] text-white px-4 py-3 font-semibold text-[15px]">
              Filter
            </div>
            
            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 mb-2">
                  <Search size={14} className="text-[#0d6efd]" />
                  Pencarian
                </label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari indikator..."
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-[#0d6efd] bg-white"
                />
              </div>

              {/* Aspek Utama */}
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 mb-2">
                  <Layers size={14} className="text-emerald-500" />
                  Aspek Utama
                </label>
                <select
                  value={selectedAspect}
                  onChange={(e) => {
                    setSelectedAspect(e.target.value);
                    setSelectedPrinciples([]); // Reset principles when aspect changes
                  }}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-[#0d6efd] bg-white"
                >
                  <option value="All">Semua Aspek</option>
                  {aspects.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Prinsip */}
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 mb-3">
                  <div className="w-3.5 h-3.5 bg-gray-700 text-white rounded-xs flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold">!!</span>
                  </div>
                  Prinsip Terkait
                </label>
                <div className="space-y-2.5 max-h-100 overflow-y-auto pr-1">
                  {principles.map(p => (
                    <label key={p} className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPrinciples.includes(p)}
                        onChange={() => handlePrincipleChange(p)}
                        className="mt-0.5 w-3.5 h-3.5 rounded-sm border-gray-300 text-[#0d6efd] focus:ring-[#0d6efd] cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-600 group-hover:text-gray-900 leading-tight">
                        {p}
                      </span>
                    </label>
                  ))}
                  {principles.length === 0 && (
                    <p className="text-[12px] text-gray-400">Tidak ada prinsip tersedia.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600 text-[15px]">
                  Showing {filteredIndicators.length} Result(s)
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
                {filteredIndicators.map((ind: Indicator) => {
                  const aspect = ind.principle?.outcome?.aspect?.name ?? "Lainnya";
                  const principle = ind.principle?.name ?? "-";
                  const isExpanded = expanded.has(ind.id);
                  
                  return (
                    <div 
                      key={ind.id} 
                      className="bg-white border border-gray-200 rounded p-4 flex flex-col hover:shadow-md transition-shadow"
                    >
                      <div 
                        className="flex items-start gap-4 cursor-pointer" 
                        onClick={() => toggle(ind.id)}
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 shrink-0 bg-blue-50 text-[#0d6efd] flex items-center justify-center rounded border border-blue-100 mt-1">
                          <Target size={24} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 py-1">
                          <h3 className="text-[#4154f1] font-semibold text-[15px] leading-snug mb-2 pr-4">
                            {ind.name}
                          </h3>
                          
                          <div className="space-y-1.5 flex flex-col items-start">
                            <div className="flex items-start gap-1.5 text-[12px] text-gray-500">
                              <Layers size={14} className="shrink-0 mt-px text-gray-400" />
                              <span className="leading-snug">{aspect}</span>
                            </div>
                            
                            <div className="flex items-start gap-1.5 text-[12px] text-gray-500">
                              <Bookmark size={14} className="shrink-0 mt-px text-gray-400" />
                              <span className="leading-snug line-clamp-2">
                                {principle}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-[12px] text-[#0d6efd] font-medium mt-1">
                              <FileText size={14} className="shrink-0" />
                              <span>{ind.questions.length} Pertanyaan</span>
                              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Content */}
                      {isExpanded && ind.questions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 bg-gray-50/50 rounded-b p-3">
                          {ind.questions.map((q, qi) => (
                            <div key={q.id} className="flex items-start gap-2 text-[13px]">
                              <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-[#0d6efd] flex items-center justify-center text-[10px] font-bold mt-0.5">
                                {qi + 1}
                              </span>
                              <p className="text-gray-600 leading-relaxed">{q.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredIndicators.length === 0 && (
                <div className="text-center py-20 bg-white border border-gray-200 rounded-md">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <h3 className="text-gray-800 font-medium">No Results Found</h3>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your filters to see more indicators.</p>
                </div>
              )}
            </>
          )}
        </div>
        
      </main>
      
      <PublicFooter />
    </div>
  );
}
