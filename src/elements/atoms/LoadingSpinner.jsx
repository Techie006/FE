import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <RotatingLines
      strokeColor='grey'
      strokeWidth='5'
      animationDuration='1.0'
      width='70'
      visible={true}
    />
  );
};

export default LoadingSpinner;
