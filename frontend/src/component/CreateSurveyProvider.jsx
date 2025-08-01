import React, { createContext, useContext, useState } from "react";

// Create the context
const CreateSurveyContext = createContext();

export const CreateSurveyProviderMock = ({ children }) => {
  const [surveyTitle, setSurveyTitle] = useState("My Survey Title");
  const [surveyDescription, setSurveyDescription] = useState("This is a sample survey.");
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      type: "shortAnswer", 
      title: "Sample Short Answer Question",
      saved: true,
      options: []
    },
    { 
      id: 2, 
      type: "multipleChoice", 
      title: "Sample Multiple Choice Question",
      saved: true,
      options: [
        { id: 1, text: "Option 1" },
        { id: 2, text: "Option 2" },
        { id: 3, text: "Option 3" }
      ]
    },
  ]);
  const [dupList, setDupList] = useState([]);
  const defaultQuestionType = "shortAnswer";

  const addNewQuestion = (type = defaultQuestionType) => {
    const newQuestion = {
      id: Date.now(),
      type,
      title: `New ${type} Question`,
      saved: false,
      options: type === "multipleChoice" || type === "singleChoice" ? [
        { id: Date.now(), text: "Option 1" },
        { id: Date.now() + 1, text: "Option 2" }
      ] : []
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddOption = (questionIndex) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (!newQuestions[questionIndex].options) {
        newQuestions[questionIndex].options = [];
      }
      newQuestions[questionIndex].options.push({
        id: Date.now(),
        text: `Option ${newQuestions[questionIndex].options.length + 1}`,
      });
      return newQuestions;
    });
  };

  const handleTitleChange = (questionIndex, title) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex].title = title;
      return newQuestions;
    });
  };

  const handleQuestionTypeChange = (questionIndex, type) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex].type = type;
      return newQuestions;
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (newQuestions[questionIndex].options) {
        newQuestions[questionIndex].options[optionIndex].text = value;
      }
      return newQuestions;
    });
  };

  const handleSaveQuestion = (questionIndex) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex].saved = true;
      return newQuestions;
    });
  };

  const handleEditQuestion = (questionIndex) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionIndex].saved = false;
      return newQuestions;
    });
  };

  const handleDuplicate = (questionIndex) => {
    const questionToDuplicate = questions[questionIndex];
    const duplicatedQuestion = {
      ...questionToDuplicate,
      id: Date.now(),
      saved: false,
    };
    setQuestions((prev) => [...prev, duplicatedQuestion]);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      if (newQuestions[questionIndex].options) {
        newQuestions[questionIndex].options.splice(optionIndex, 1);
      }
      return newQuestions;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
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
        setQuestions,
        defaultQuestionType,
        addNewQuestion,
        handleDeleteQuestion,
        handleAddOption,
        handleTitleChange,
        handleQuestionTypeChange,
        handleOptionChange,
        handleSaveQuestion,
        handleEditQuestion,
        handleDuplicate,
        handleDeleteOption,
        onDragEnd,
        dupList,
        handleCreateSurvey,
      }}
    >
      {children}
    </CreateSurveyContext.Provider>
  );
};

// Hook to use in your components
export const useCreateSurveyProvider = () => useContext(CreateSurveyContext);
