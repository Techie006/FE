import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Class from "./Class";
import { ReactComponent as NoResultSVG } from "../../assets/illustrations/no_class_black.svg";
import { T1 } from "../../styles/Text";

const Classes = (props) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [showMsg, setShowMsg] = useState(false);

  const getData = useCallback(async () => {
    // Mock API
    // const resp = RESP.CLASS.GET_CLASSES_SUCCESS;
    // const resp = RESP.CLASS.GET_CLASSES_EMPTY;

    const resp = await apis.get_classes();

    const {
      content: { empty, classes },
    } = resp.data;

    setLoading(false);

    if (empty) {
      setShowMsg(true);
      setClasses(classes);
      return;
    }

    setShowMsg(false);
    setClasses(classes);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const classList = classes.map((cookingClass) => (
    <Class key={cookingClass.class_id} {...cookingClass} />
  ));

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <StMsgSection>
          <NoResultSVG />
          <T1
            style={{
              marginTop: "40px",
            }}
          >
            진행 중인 클래스가 없어요!
          </T1>
        </StMsgSection>
      ) : null}
      {!loading && !showMsg ? classList : null}
    </>
  );
};

export default Classes;

const StMsgSection = styled.div`
  margin-top: 218px;
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
