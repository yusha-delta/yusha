import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Calculator, Loader2 } from 'lucide-react';
import CourseRow from './components/CourseRow';
import GeminiAdvice from './components/GeminiAdvice';
import { Course, CalculationResult } from './types';
import { getMoodForGPA } from './constants';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: 3.0, gradePoints: 4.0 },
    { id: '2', name: '', credits: 3.0, gradePoints: 3.75 },
    { id: '3', name: '', credits: 3.0, gradePoints: 3.5 },
  ]);

  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Hide result when courses change to force re-calculation
  useEffect(() => {
    setShowResult(false);
  }, [courses]);

  // Calculate GPA and derived state
  const result: CalculationResult = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      // Handle potential 0 or undefined credits from custom input
      const credits = course.credits || 0;
      if (credits > 0) {
        totalPoints += course.gradePoints * credits;
        totalCredits += credits;
      }
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const moodData = getMoodForGPA(gpa);

    return {
      gpa,
      totalCredits,
      totalPoints,
      emoji: moodData.emoji,
      gifUrl: moodData.gifUrl,
      moodColor: moodData.color,
      moodDescription: moodData.description,
    };
  }, [courses]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);
    
    // Surprise delay!
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: '',
      credits: 3.0,
      gradePoints: 3.0, 
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-inter flex flex-col">
      {/* Credits Banner */}
      <div className="w-full bg-slate-900 text-white text-center py-2">
        <span className="font-bold text-sm tracking-widest uppercase animate-neon">Made by Yusha Mahim SIndit</span>
      </div>

      {/* Official Top Bar */}
      <div className="w-full bg-[#006A4E] border-b-4 border-[#F0B323] shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center md:justify-start">
          <div className="bg-white p-2 rounded-lg shadow-lg shrink-0 overflow-hidden">
             <img 
               src="./logo.png" 
               alt="Department Logo" 
               className="h-16 object-contain"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
               }}
             />
             <span className="text-xs font-bold text-slate-800 hidden peer-invalid:block">LOGO</span>
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
              Ahsanullah University of Science and Technology
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-white/80 text-sm mt-1">
               <Calculator size={14} />
               <span>Official CGPA Calculator</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Course Input */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#006A4E] flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#F0B323] rounded-full"></span>
                  Current Semester Courses
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Credits: {result.totalCredits}
                </span>
              </div>
              
              <div className="space-y-4">
                {courses.map(course => (
                  <CourseRow
                    key={course.id}
                    course={course}
                    onChange={updateCourse}
                    onRemove={removeCourse}
                  />
                ))}
              </div>

              <button
                onClick={addCourse}
                className="w-full py-3 mt-6 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-medium hover:text-[#006A4E] hover:border-[#006A4E] hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Another Course
              </button>
            </div>
          </div>

          {/* Right Column: Result Display */}
          <div className="lg:col-span-1 sticky top-8 space-y-6">
            
            {/* Calculation Card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
              
              {/* Decorative Header Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#006A4E] via-[#F0B323] to-[#006A4E]"></div>

              <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-6">
                Calculated GPA
              </h3>

              {/* Initial State / Button */}
              {!showResult && !isCalculating && (
                <div className="flex flex-col items-center animate-fadeIn">
                  <div className="text-6xl mb-6">🤔</div>
                  <p className="text-slate-500 mb-6 text-sm">Enter your grades and hit calculate to see your fate!</p>
                  <button 
                    onClick={handleCalculate}
                    className="px-8 py-3 bg-[#006A4E] text-white font-bold rounded-full shadow-lg shadow-emerald-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Calculator size={20} />
                    Calculate Result
                  </button>
                </div>
              )}

              {/* Loading / Suspense State */}
              {isCalculating && (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 size={48} className="text-[#F0B323] animate-spin mb-4" />
                  <p className="text-[#006A4E] font-bold text-lg animate-bounce">Crunching numbers...</p>
                  <p className="text-slate-400 text-xs mt-2">Hold your breath!</p>
                </div>
              )}

              {/* Result State */}
              {showResult && (
                <div className="relative z-10 w-full animate-popIn">
                  {/* Dynamic GIF */}
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden relative group">
                    <img 
                      src={result.gifUrl} 
                      alt={result.moodDescription}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* GPA Value */}
                  <div className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-2 ${result.moodColor}`}>
                    {result.gpa.toFixed(5)}
                  </div>
                  
                  {/* Verdict Badge */}
                  <div className="mt-2 mb-6 inline-block px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold">
                    Verdict: <span className={`${result.moodColor}`}>{result.moodDescription}</span>
                  </div>

                  {/* Formula Breakdown */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500 text-left">
                    <p className="font-bold mb-1 uppercase tracking-wide">Formula:</p>
                    <div className="flex justify-between border-b border-slate-200 pb-1 mb-1">
                      <span>Total Points</span>
                      <span className="font-mono">{result.totalPoints.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1 mb-1">
                      <span>Total Credits</span>
                      <span className="font-mono">{result.totalCredits}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>GPA</span>
                      <span className="font-mono">{result.totalPoints.toFixed(2)} / {result.totalCredits} = {result.gpa.toFixed(5)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Advisor Component */}
            {showResult && (
              <GeminiAdvice gpa={result.gpa} courses={courses} />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;