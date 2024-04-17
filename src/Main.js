import React, { Component, useState } from "react";

const initState = {
  username: "",
  message: "",
};

const Main = () => {
  const [memberInfo, setMemberInfo] = useState(initState);

  const { username, message } = memberInfo;

  const onChange = event => {
    const nextMemberInfo = {
      ...memberInfo, // 기존의 정보 내용을 이 자리에 복사한 뒤
      [event.target.name]: event.target.value, // 원하는 값을 덮어 씌우기
    };
    setMemberInfo(nextMemberInfo);
  };

  const onClick = () => {
    alert(`${username}: ${message}`);
    setMemberInfo(initState);
  };

  const onKeyPress = event => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 주세요"
        value={message}
        onChange={onChange}
        onKeyUp={onKeyPress}
      />
      <br />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default Main;
