import { GoogleGenAI, Type } from "@google/genai";
import { Course, GradeOption } from "../types";
import { GRADE_SCALE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAcademicAdvice = async (
  gpa: number,
  courses: Course[]
): Promise<string[]> => {
  try {
    const courseSummary = courses.map(c => {
        // Find the grade label based on points
        const gradeLabel = GRADE_SCALE.find(g => g.points === c.gradePoints)?.label || 'Unknown';
        return `${c.name}: ${gradeLabel} (${c.credits} credits)`;
    }).join('\n');

    const prompt = `
      I am a university student. My current calculated GPA is ${gpa.toFixed(2)}.
      
      Here is the breakdown of my courses:
      ${courseSummary}
      
      Please provide 3 specific, constructive, and emoji-rich pieces of advice or motivation based on these specific results. 
      If the GPA is low, be encouraging but realistic. If it is high, tell me how to maintain it.
      Keep each point relatively short (under 20 words).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 advice strings"
            }
          }
        }
      }
    });

    const jsonText = response.text || '{ "advice": [] }';
    const parsed = JSON.parse(jsonText);
    return parsed.advice || ["Keep studying hard! 📚", "Review your weak subjects. 🧐", "Stay consistent! 🚀"];

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [
      "Could not connect to AI advisor right now. 🤖",
      "Focus on your lowest graded subjects first. 📉",
      "Don't give up, improvement is possible! 💪"
    ];
  }
};