import React, { useState } from "react";

const initState = {
  username: "",
  nickname: "",
};

const InputReducer = () => {
  // userInfo 상태
  const [userInfo, setUserInfo] = useState(initState);

  const { username, nickname } = userInfo;

  // username 이벤트 핸들러
  const onChange = e => {
    const nextUserInfo = { ...userInfo, [e.target.name]: e.target.value };

    setUserInfo(nextUserInfo);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
        <br />
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
      </div>
      <div>
        <b>이름:</b> {userInfo.username}
      </div>
      <div>
        <b>닉네임:</b> {userInfo.nickname}
      </div>
    </div>
  );
};

export default InputReducer;
