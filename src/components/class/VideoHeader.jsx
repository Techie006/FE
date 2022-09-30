import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import Ingredients from "../../elements/molecules/Ingredients";

const VideoHeader = () => {
  const { class_id, role } = useParams();
  const [recipe, setRecipe] = useState();

  const getData = async () => {
    const resp = await apis.get_class_recipe({ class_id });

    const { content } = resp.data;
    setRecipe(content);
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
  };

  useEffect(() => {
    getData();
    // return () => leaveVideo();
  }, []);

  return (
    <>
      <StHeader>
        <StTitle>클래스 이름을 찾아 적어줍니다 어쩌고 저쩌고</StTitle>
        <StRecipeButton>상세 레시피 확인</StRecipeButton>
      </StHeader>
      <StInfoPart>
        {recipe ? (
          <>
            <Ingredients content={recipe.ingredients} />
            <Ingredients
              content={[
                recipe.method,
                recipe.category,
                `${recipe.calorie}kcal`,
              ]}
            />
          </>
        ) : null}
      </StInfoPart>
    </>
  );
};

export default VideoHeader;

const StHeader = styled.div`
  padding: 18px 18px 0px 18px;
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
`;

const StInfoPart = styled.div``;
