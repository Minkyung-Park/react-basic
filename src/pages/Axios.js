import axios from "axios";
import React, { useState } from "react";

const Axios = () => {
  const [data, setData] = useState(null);

  const onClick = async () => {
    console.log("버튼 작동");
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=API_KEY",
      ); // API_KEY를 발급 받아서 적어
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>axios</h2>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          readOnly={true}
          value={JSON.stringify(data, null, 2)} // null -> 모든 속성, 2 -> 들여쓰기
        />
      )}
    </div>
  );
};

export default Axios;
