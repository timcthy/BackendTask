import React, { useState } from "react";
import { useCreateSurveyProvider } from "./CreateSurveyProvider";
import CreateSurveyContent from "./CreateSurveyContent";
import CreateSurveySteps from "./CreateSurveySteps"; // you may even remove this

const CreateSurveySidebar = ({ surveySeriesId }) => {
  const { questions, surveyTitle, surveyDescription } = useCreateSurveyProvider();
  const progress = Math.floor(
    ((surveyTitle.trim() !== "") +
     (surveyDescription.trim() !== "") +
     (questions.length > 0 && !questions.some(q => !q.saved))) /
    3 *
    100
  );

  return (
    <aside className="p-4 bg-white rounded shadow">
      {/* If you remove CreateSurveySteps + buttons entirely, you could drop that whole block */}
      <div className="mb-4">
        {/* Next / Preview buttons removed */}
      </div>

      {/* Progress tracker remains */}
      <div className="mb-6">
        <h3 className="font-medium">Progress</h3>
        <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-sm font-semibold">{progress}% complete</p>
      </div>

      {/* Survey form content */}
      <CreateSurveyContent />
    </aside>
  );
};

export default CreateSurveySidebar;
