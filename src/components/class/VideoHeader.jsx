import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { ST2 } from "../../../styles/Text";
import Ingredients from "../../elements/molecules/Ingredients";

const VideoHeader = () => {
  const { class_id, role } = useParams();
  const [recipe, setRecipe] = useState();

  const getData = useCallback(async () => {
    const resp = apis.get_class_recipe({ class_id });
    const { content } = resp.data;
    setRecipe(content);
  }, [class_id]);

  const leaveVideo = useCallback(async () => {
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
  }, [class_id, role]);

  useEffect(() => {
    getData();
    return () => leaveVideo();
  }, [getData, leaveVideo]);

  return (
    <>
      <StHeader>
        <ST2>클래스 이름을 찾아 적어줍니다 어쩌고 저쩌고</ST2>
        <div>상세 레시피 확인</div>
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

const StInfoPart = styled.div``;
