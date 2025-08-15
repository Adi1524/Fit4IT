import meditationLogo from "../../../assets/meditationLogo.jpeg";

const MeditationPlan = () => {
  return (
    <div>
      <div className=" w-[500px] h-[500px]  overflow-hidden">
        <img src={meditationLogo} alt="Meditation" className="  object-cover" />
      </div>
    </div>
  );
};

export default MeditationPlan;
