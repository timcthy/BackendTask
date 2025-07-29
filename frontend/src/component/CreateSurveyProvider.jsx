import React, { createContext, useContext, useState } from "react";

// Create the context
const CreateSurveyContext = createContext();

export const CreateSurveyProviderMock = ({ children }) => {
  const [surveyTitle, setSurveyTitle] = useState("My Survey Title");
  const [surveyDescription, setSurveyDescription] = useState("This is a sample survey.");
  const [questions, setQuestions] = useState([
    { id: 1, type: "short_text", saved: true },
    { id: 2, type: "multiple_choice", saved: true },
  ]);
  const defaultQuestionType = "short_text";

  const addNewQuestion = (type = defaultQuestionType) => {
    const newQuestion = {
      id: Date.now(),
      type,
      saved: false,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleCreateSurvey = () => {
    console.log("Mock create survey:", {
      title: surveyTitle,
      description: surveyDescription,
      questions,
    });
  };

  return (
    <CreateSurveyContext.Provider
      value={{
        surveyTitle,
        setSurveyTitle,
        surveyDescription,
        setSurveyDescription,
        questions,
        defaultQuestionType,
        addNewQuestion,
        handleCreateSurvey,
      }}
    >
      {children}
    </CreateSurveyContext.Provider>
  );
};

// Hook to use in your components
export const useCreateSurveyProvider = () => useContext(CreateSurveyContext);
