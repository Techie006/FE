import { useState, useCallback, useEffect } from "react";

import RESP from "../../server/response";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Class from "./Class";

const Classes = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const resp = RESP.CLASS.GET_CLASSES_SUCCESS;
    // const resp = await apis.get_calories_ratio({ view });

    const { content } = resp.data;

    setLoading(false);
    setData([...content.classes]);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const classes = data.map((datum) => (
    <Class key={datum.class_id} {...datum} />
  ));

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {!loading ? classes : null}
    </>
  );
};

export default Classes;
