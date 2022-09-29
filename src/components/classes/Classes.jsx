import { useState, useCallback, useEffect } from "react";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Class from "./Class";

const Classes = (props) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  const getData = useCallback(async () => {
    // const resp = RESP.CLASS.GET_CLASSES_SUCCESS;
    const resp = await apis.get_classes();

    const { content } = resp.data;

    setLoading(false);
    setClasses(content.classes);
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
      {!loading ? classList : null}
    </>
  );
};

export default Classes;
