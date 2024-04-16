import React, { Component, useState } from "react";

const Main = () => {
  // username 상태
  const [username, setUsername] = useState("");

  const onChangeUsername = event => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChangeUsername}
      />
    </div>
  );
};

export default Main;
