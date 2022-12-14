import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { apis } from "../../../shared/axios";
import Button from "../../../elements/atoms/Button";
import Ingredients from "../../../elements/molecules/Ingredients";

const VideoHeader = () => {
  const { class_id, role } = useParams();
  const [className, setClassName] = useState();
  const [recipe, setRecipe] = useState();

  const navigate = useNavigate();

  const getData = async () => {
    const resp = await apis.get_class_recipe({ class_id });
    const {
      content: { class_name, recipe },
    } = resp.data;
    setClassName(class_name);
    setRecipe(recipe);
  };

  const leaveVideo = async () => {
    // publisher인 경우 종료 API 호출
    if (role === "pub") {
      const resp = await apis.quit_class({ class_id });
      const {
        status: { code, message },
      } = resp.data;

      // 존재하지 않는 클래스이거나 호스트가 아닌 경우
      if (code === 400) {
        window.alert(message);
        return;
      }
    }

    navigate("/classes");
  };

  const quitHandler = () => {
    navigate("/classes");
  };

  window.onbeforeunload = (e) => {
    console.log(e);
    console.log("on before unload");
    window.confirm("on!!");
  };

  useEffect(() => {
    getData();
    return () => {
      console.log("useEffect return");
      leaveVideo();
    };
  }, []);

  return (
    <StLayout>
      <StHeader>
        <StClassPart>
          <StTitle>{className}</StTitle>
          <StRecipeButton>상세 레시피 확인</StRecipeButton>
        </StClassPart>
        {role === "pub" ? (
          <Button
            type='button'
            content='종료하기'
            onClick={quitHandler}
            page='class'
            func='leave'
          />
        ) : null}
      </StHeader>
      <StInfoPart>
        {recipe !== undefined ? (
          <>
            <Ingredients contents={recipe.ingredients.slice(0, 3)} />
            <Ingredients
              isInfo={true}
              contents={[
                recipe.method,
                recipe.category,
                `${recipe.calorie}kcal`,
              ]}
            />
          </>
        ) : null}
      </StInfoPart>
    </StLayout>
  );
};

export default VideoHeader;

const StLayout = styled.div`
  padding: 18px 18px 0px 18px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const StClassPart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const StTitle = styled.div`
  font-family: "Happiness Sans";
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  color: #5b5b5b;
`;

const StRecipeButton = styled.button`
  border: none;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: underline;
  color: #a5a5a5;
  background: transparent;
`;

const StInfoPart = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 6px;
`;
