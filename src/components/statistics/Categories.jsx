import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";
import CategoryBox from "../../elements/textboxes/CategoryBox";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

const Categories = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  // TODO api 변경하기 -> 상위 3개만 가져오도록!
  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_CATEGORY_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_CATEGORY_FAIL;
    // const resp = await apis.get_category();

    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);

    setData({ ...content });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  // if (process.env.REACT_APP_DEBUG_ON) {
  //   console.log(`[Categories] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const labels = Object.keys(data);
  const nums = Object.values(data);
  let diagram = labels?.map((label, i) => (
    <CategoryBox key={i} label={label} num={nums[i]} />
  ));
  diagram = diagram.slice(0, 3);

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && showMsg ? (
        <HelpMsg
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          goto='홈으로 '
          path={`/home`}
        />
      ) : null}
      {!loading && !showMsg ? <StWrapper>{diagram}</StWrapper> : null}
    </>
  );
};

export default Categories;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
