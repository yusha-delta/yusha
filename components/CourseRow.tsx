import React, { useState, useEffect } from 'react';
import { Trash2, List, Edit3 } from 'lucide-react';
import { Course } from '../types';
import { GRADE_SCALE } from '../constants';

interface CourseRowProps {
  course: Course;
  onChange: (id: string, field: keyof Course, value: any) => void;
  onRemove: (id: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onChange, onRemove }) => {
  const commonCredits = [3.0, 2.0, 1.5, 1.0];
  // Determine if the current credit value is one of the common options
  const isCommon = commonCredits.includes(course.credits);
  const [isCustomMode, setIsCustomMode] = useState(!isCommon);

  // Sync local state if course credits change externally (e.g. reset)
  useEffect(() => {
    if (commonCredits.includes(course.credits)) {
      setIsCustomMode(false);
    }
  }, [course.credits]);

  const handleCreditSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'custom') {
      setIsCustomMode(true);
      // We don't change the value immediately, just the UI mode
    } else {
      setIsCustomMode(false);
      onChange(course.id, 'credits', parseFloat(val));
    }
  };

  const handleCustomCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // If empty string, send 0 to parent but UI handles display to show empty
    onChange(course.id, 'credits', val === '' ? 0 : parseFloat(val));
  };

  // Dynamic Grade Box Color
  const getGradeColor = (points: number) => {
    if (points >= 3.0) return 'bg-emerald-100 border-emerald-300 text-emerald-800 focus:ring-emerald-500/50';
    if (points >= 2.0) return 'bg-yellow-100 border-yellow-300 text-yellow-800 focus:ring-yellow-500/50';
    return 'bg-red-100 border-red-300 text-red-800 focus:ring-red-500/50';
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 group animate-fadeIn items-center">
      <div className="flex-1 w-full">
        <input
          type="text"
          placeholder="Course Name (e.g., CSE 101)"
          value={course.name}
          onChange={(e) => onChange(course.id, 'name', e.target.value)}
          className="w-full bg-transparent border-b border-slate-200 text-slate-800 placeholder-slate-400 py-2 px-1 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
        />
      </div>
      
      <div className="flex gap-3 items-end md:items-center w-full md:w-auto">
        {/* Credits Input Section */}
        <div className="w-28 relative">
          <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase">Credits</label>
          
          {!isCustomMode ? (
            <div className="relative">
              <select
                value={course.credits}
                onChange={handleCreditSelect}
                className="w-full bg-slate-50 border border-slate-200 rounded-md text-slate-800 py-2 px-3 text-center appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
              >
                {commonCredits.map((c) => (
                  <option key={c} value={c}>{c.toFixed(1)}</option>
                ))}
                <option value="custom">Custom...</option>
              </select>
              {/* Custom arrow for styling consistency */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                min="0"
                // If value is 0, show empty string to avoid the annoying "0" sticking there
                value={course.credits === 0 ? '' : course.credits}
                onChange={handleCustomCreditChange}
                placeholder="0.0"
                autoFocus
                className="w-full bg-white border-2 border-slate-300 rounded-md text-slate-800 py-1.5 px-2 text-center focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button 
                onClick={() => setIsCustomMode(false)}
                title="Select from list"
                className="p-2 text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 rounded-md border border-slate-200"
              >
                <List size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Grade Select Section */}
        <div className="w-40 relative">
          <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase">Grade</label>
          <div className="relative">
            <select
              value={course.gradePoints}
              onChange={(e) => onChange(course.id, 'gradePoints', parseFloat(e.target.value))}
              className={`w-full rounded-md py-2 pl-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-all font-bold shadow-sm ${getGradeColor(course.gradePoints)}`}
            >
              {GRADE_SCALE.map((grade) => (
                <option key={grade.label} value={grade.points} className="bg-white text-slate-800 font-medium">
                  {grade.label} ({grade.points}) {grade.emoji}
                </option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-slate-600/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
        </div>

        <button
          onClick={() => onRemove(course.id)}
          className="p-2 md:mt-5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove course"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CourseRow;