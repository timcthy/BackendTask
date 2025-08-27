import React from "react";
import { useCreateSurveyProvider } from "./CreateSurveyProvider";

const GenerateSurvey = () => {
    const { setQuestions } = useCreateSurveyProvider();

    const handleGenerate = async () => {
        const description = prompt("Enter a short survey description:");

        if (!description) return;

        try {
            const res = await fetch("http://localhost:8000/api/surveys/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description }),
            });

            if (!res.ok) {
                throw new Error("Failed to generate survey");
            }

            const survey = await res.json();


            const formattedQuestions = survey.questions.map((q) => ({
                id: q.id,
                title: q.text,
                type:
                    q.type === "multipleChoice"
                        ? "multipleChoice"
                        : q.type === "scale"
                        ? "scale"
                        : "openQuestion",
                options: q.options.map((o, idx) => ({
                    id: `${q.id}-option-${idx}`,
                    text: o,
                })),
                saved: true,
                isTag: false,
            }));

            setQuestions(formattedQuestions);
        } catch (err) {
            console.error(err);
            alert("Error generating survey");
        }
    };

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
