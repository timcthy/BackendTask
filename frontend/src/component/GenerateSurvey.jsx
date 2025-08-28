import React from "react";
import { useCreateSurveyProvider } from "./CreateSurveyProvider";

/***
 * Allows user to generate a survey via backend API call.
 * It prompts the user for a survey description, and sends it to the backend,
 * formats the returned questions, and updates the global survey state via the provider
 *
 */
const GenerateSurvey = () => {
    const { setSurveyTitle, setSurveyDescription, setQuestions } = useCreateSurveyProvider();

    // Triggers when "Generate Survey" button is clicked
    const handleGenerate = async () => {
        // Prompts the user for a short description
        const description = prompt("Enter a short survey description:");
        // User must enter a description to generate a survey
        if (!description) return;

        try {
            // Makes a POST request to the backend to generate the survey
            const res = await fetch("http://localhost:8000/api/surveys/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description }),
            });

            // Parse the JSON response
            const survey = await res.json();

            // Formats the questions for frontend use
            const formattedQuestions = survey.questions.map((q) => ({
                id: q.id,
                title: q.text,
                type:
                    q.type === "multipleChoice" ? "multipleChoice"
                    : q.type === "singleChoice" ? "singleChoice"
                    : q.type === "openQuestion" ? "openQuestion"
                    : q.type === "shortAnswer" ? "shortAnswer"
                    : q.type === "scale" ? "scale"
                    : "npsScore",
                options: q.options.map((o, idx) => ({
                    id: `${q.id}-option-${idx}`,
                    text: o,
                })),
                saved: true,
            }));

            console.log(survey.title)
            console.log(description);
            console.log(formattedQuestions);

            // Updates global survey state
            setSurveyTitle(survey.title);
            setSurveyDescription(description);
            setQuestions(formattedQuestions);
        } catch (err) {
            console.error(err);
            alert("Error generating survey");
        }
    };

    // Renders the "Generate Survey" button
    return (
        <button
            onClick={handleGenerate}
            className="px-4 py-2 rounded-full bg-[#6851a7] text-white hover:bg-[#5b4691] transition-all duration-200"
        >
            Generate Survey
        </button>
    );
};

export default GenerateSurvey;
