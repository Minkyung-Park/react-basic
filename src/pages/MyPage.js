import React from "react";
import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLogin = false;

  //   if (!isLogin) {
  //     return <Navigate to="/login" replace={true} />;
  //   } // 이렇게 쓰거나 저기 밑에 reture쓰나 똑같다

  return (
    <div>
      <h1>마이페이지</h1>
      {!isLogin && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default MyPage;
