import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is set without crashing immediately
const isAiAvailable = () => !!apiKey && apiKey !== 'undefined';

/**
 * Analyzes the student data to provide a dashboard summary.
 */
export const generateDashboardSummary = async (students: Student[]): Promise<string> => {
  if (!isAiAvailable()) return "AI Configuration missing. Please set API_KEY.";

  const studentSummary = students.map(s => `${s.major} - ${s.status}`).join(', ');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this raw list of student majors and statuses: ${studentSummary}. 
      Provide a brief, professional 3-sentence executive summary about the current composition and health of the student body for a university administrator. 
      Focus on distribution and retention risks (like Leave/Dropout).`,
    });
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate summary at this time.";
  }
};

/**
 * Converts a natural language query into a structured filter object.
 */
export const parseNaturalSearch = async (query: string): Promise<{
  name?: string;
  major?: string;
  year?: number;
  status?: string;
} | null> => {
  if (!isAiAvailable()) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Convert this natural language search query for a student database into a JSON object: "${query}".
      Possible fields: name (string), major (string, strictly map to one of: 'Teknik Informatika', 'Sistem Informasi', 'Desain Komunikasi Visual', 'Manajemen', 'Akuntansi'), year (number), status (string).
      Return ONLY the JSON object. If a field is not mentioned, omit it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                major: { type: Type.STRING },
                year: { type: Type.NUMBER },
                status: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return null;
  }
};

/**
 * Simulates analyzing an uploaded document to extract student info.
 * In a real app, this would take image bytes. Here we mock with a text description.
 */
export const extractDataFromDocument = async (documentDescription: string): Promise<Partial<Student>> => {
     if (!isAiAvailable()) return {};

     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Extract student information from this document text: "${documentDescription}".
            Return JSON with keys: nim, name, address.`,
            config: {
                responseMimeType: "application/json"
            }
        });
        return JSON.parse(response.text || '{}');
     } catch (e) {
         console.error(e);
         return {};
     }
}