import { useState } from "react";
import workoutData from "../data/hiitWorkout.json";

const WorkoutComponent = () => {
  const [userWorkoutDetails, setUserWorkoutDetails] = useState({
    experience: "",
    workoutLocation: "",
    timeDuration: "",
  });
  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleChange = (e) => {
    setUserWorkoutDetails({
      ...userWorkoutDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log("workout json data", workoutData);

  const calculateWorkout = () => {
    const { experience, workoutLocation, timeDuration } = userWorkoutDetails;

    if (experience === "beginner") {
      const newWorkout = workoutData.workouts.filter(
        (workout) => workout.duration === timeDuration
      );
      setWorkoutPlan(newWorkout);
    }
  };

  console.log("new workout", workoutPlan);
  console.log("Workout details", userWorkoutDetails);

  return (
    <div className="bg-slate-400">
      <h1>hello dude in the workout component</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateWorkout();
          }}
        >
          <label htmlFor="experience">Experience</label>
          <select
            value={userWorkoutDetails.experience}
            type="text"
            name="experience"
            onChange={handleChange}
          >
            <option value="beginner"> beginner</option>
            <option value="intermediate"> intermediate</option>
            <option value="advanced"> advanced</option>
          </select>

          <label htmlFor="workoutLocation">Workout location</label>
          <select
            onChange={handleChange}
            value={userWorkoutDetails.workoutLocation}
            type="text"
            name="workoutLocation"
          >
            <option value="home">home</option>
            <option value="gym">gym</option>
          </select>

          <label htmlFor="timeDuration">Time duration:</label>
          <select
            onChange={handleChange}
            value={userWorkoutDetails.timeDuration}
            type="text"
            name="timeDuration"
          >
            <option value="5 minutes"> 5min</option>
            <option value="10 minutes"> 10min</option>
          </select>

          <button type="submit"> calculate</button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutComponent;
