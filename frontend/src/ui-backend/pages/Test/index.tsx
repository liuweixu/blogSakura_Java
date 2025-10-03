import { getTestAPI } from "@/ui-backend/apis/test";
import { userTestAPI } from "@/ui-backend/apis/test";
// import { userTestPostAPI } from "@/ui-backend/apis/test";
import { loginAPI } from "@/ui-backend/apis/user";
import { useState, useEffect } from "react";
import { getUploadKeyAPI } from "@/ui-backend/apis/upload";

export const Test = () => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [test, setTest] = useState("");
  const [key, setKey] = useState("");

  const formData = {
    mobile: "18612345678",
    code: "246810",
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestAPI();
      setData(JSON.stringify(res.data));
      const res2 = await userTestAPI();
      setUser(JSON.stringify(res2.data));
      const res3 = await loginAPI(formData);
      setTest(JSON.stringify(res3.data));
      const res4 = await getUploadKeyAPI();
      setKey(JSON.stringify(res4.data));
    };
    fetchData();
  }, []);
  return (
    <div>
      {data}
      <br />
      {user}
      <br />
      tetet:{test}
      <br/>
      ceshi:{key}
    </div>
  );
};
