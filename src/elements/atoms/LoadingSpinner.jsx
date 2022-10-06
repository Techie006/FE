import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <FadeLoader
      color='#797979'
      style={{ top: "40%", left: "50%", position: "relative" }}
    />
  );
};

export default LoadingSpinner;
