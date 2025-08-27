import React, { useState } from "react";

const GenerateSurvey = ({
    endpoint,
    onGenerated,
    title = "Generate Survey",
    className,
    children
}) => {

    const [loading] = useState(false);

    const handleGenerate = async () => {
        const input = window.prompt("Enter a short description of the survey (e.g. 'Customer satisfaction for an online store')");
        const description = input;


        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {description} )
            });

            const data = await response.json();
        } catch (error)
        {
            alert(' Failed to generate survey: ${msg}');
        }

    }

    return (
        <button
            type="button"
            onClick={handleGenerate}
            className={
                className ??
                "bg-[#6851a7] flex gap-2 items-center text-white py-3 px-6 rounded-full shadow-sm transition-all duration-300"
            }
        >
            {loading ? "Generating..." : children ?? "Generate Survey"}
        </button>
    )

};

export default GenerateSurvey;