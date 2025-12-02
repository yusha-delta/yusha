import React, { useState } from 'react';
import { Sparkles, Loader2, GraduationCap } from 'lucide-react';
import { getAcademicAdvice } from '../services/geminiService';
import { Course } from '../types';

interface GeminiAdviceProps {
  gpa: number;
  courses: Course[];
}

const GeminiAdvice: React.FC<GeminiAdviceProps> = ({ gpa, courses }) => {
  const [advice, setAdvice] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const tips = await getAcademicAdvice(gpa, courses);
    setAdvice(tips);
    setLoading(false);
  };

  return (
    <div className="mt-8 w-full">
      {!advice && !loading && (
        <button
          onClick={handleGetAdvice}
          className="w-full py-3 px-6 rounded-lg bg-[#006A4E] text-white font-semibold shadow-lg shadow-emerald-900/10 hover:bg-[#00553e] hover:shadow-emerald-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={20} className="text-yellow-400" />
          Get Academic Advice
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 animate-pulse">
          <Loader2 size={32} className="text-[#006A4E] animate-spin mb-2" />
          <p className="text-slate-500 text-sm">Consulting Academic Advisor...</p>
        </div>
      )}

      {advice && !loading && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-[#006A4E] shadow-sm animate-slideUp">
          <div className="flex items-center gap-2 mb-4 text-[#006A4E]">
            <GraduationCap size={20} />
            <h3 className="font-bold uppercase tracking-wider text-sm">Advisor's Remarks</h3>
          </div>
          <ul className="space-y-3">
            {advice.map((tip, index) => (
              <li key={index} className="flex gap-3 text-slate-700 text-sm md:text-base bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[#006A4E] font-bold select-none">{index + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
          <button 
             onClick={() => setAdvice(null)}
             className="mt-4 text-xs text-slate-400 hover:text-[#006A4E] hover:underline transition-colors w-full text-center"
          >
            Clear Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiAdvice;