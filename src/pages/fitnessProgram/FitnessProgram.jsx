import { useState } from "react";
import FitnessSection from "../../components/fitnessProgram/fitnessSection/FitnessSection";
import MeditationPlan from "../../components/fitnessProgram/meditationComponent/MeditationPlan";
import WorkoutDetailSection from "../../components/workoutComponent/workoutDetailSection/WorkoutDetailSection";
import MealPlanPage from "../MealPlanPage";

const FitnessProgram = () => {
  const [sectionType, setSectionType] = useState("meals");
  return (
    <div className="w-full h-full flex  border-l-2   border-[#ededed]">
      {/* fitness plan */}
      <div className="w-[50%]">
        <FitnessSection setSectionType={setSectionType} />
      </div>

      {/* section details */}
      <div className="border-l-2 flex-1 border-[#ededed] ml-4 h-screen overflow-y-auto">
        {" "}
        {sectionType === "meals" && <MealPlanPage />}
        {sectionType === "workout" && <WorkoutDetailSection />}
        {sectionType === "meditation" && <MeditationPlan />}
      </div>
    </div>
  );
};

export default FitnessProgram;
