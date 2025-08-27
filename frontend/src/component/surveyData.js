const surveyData = {
    title: "Customer Satisfaction Survey",
    questions: [
        {
            type: "multipleChoice",
            text: "How satisfied are you with our service?",
            options: [
                { text: "Very Satisfied" },
                { text: "Satisfied" },
                { text: "Neutral" },
                { text: "Dissatisfied" },
                { text: "Very Dissatisfied" }
            ]
        },
        {
            type: "rating",
            text: "Rate your checkout experience"
        },
        {
            type: "open_text",
            text: "What can we improve?"
        }
    ]
};

export default surveyData;