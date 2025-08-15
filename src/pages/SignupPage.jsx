import IdliImg from "../assets/IdliLogo.jpg";
import Signup from "../components/signup/Signup";

const SignupPage = () => {
  return (
    <div className="flex">
      <div className="bg-white w-[50%] flex items-center justify-center h-screen">
        <img src={IdliImg} alt="Idli Image" />
      </div>

      <div className="w-[50%]">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
