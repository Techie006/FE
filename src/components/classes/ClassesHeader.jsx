import { H1 } from "../../styles/Text";
import Button from "../../elements/atoms/Button";

const ClassesHeader = ({ onClick }) => {
  return (
    <>
      <H1>쿠킹 클래스</H1>
      <Button
        type='button'
        // TODO 고치기
        page='statistics'
        content='클래스 시작하기'
        onClick={onClick}
      />
    </>
  );
};

export default ClassesHeader;
