# 4. 함수 컴포넌트 이벤트

- 리액트에서 이벤트를 사용할 때 주의사항

  - 카멜케이스 작성, HTML의 onlick은 onClick
  - 함수 형태의 값을 전달
  - DOM 요소에만 이벤트를 설정할 수 있음

- 이벤트의 종류
  - 모두 다 사용하지는 않지만 확인만 일단 하자
  - onClick
  - onChange
  - clipboard
  - composition
  - keyboard
  - focus
  - form
  - mouse
  - selection
  - touch
  - ui
  - wheel
  - media
  - image
  - animation
  - transition

## 4.1 함수 컴포넌트로 이벤트 핸들링 구현

```js
import React, { Component, useState } from "react";

const Main = () => {
  // username 상태
  // const [상태, 상태 업데이트 함수] = useState(초기값)
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const onChangeMessage = event => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

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
      <br />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 주세요"
        value={message}
        onChange={onChangeMessage}
      />
    </div>
  );
};

export default Main;
```

```js
import React, { Component, useState } from "react";

const Main = () => {
  // username 상태
  // const [상태, 상태 업데이트 함수] = useState(초기값)
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const onChangeMessage = event => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

  const onChangeUsername = event => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const onClick = () => {
    alert(`${username}: ${message}`);
    setUsername(""),
    setMessage(""),
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
        onChange={onChangeUsername}
      />
      <br />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 주세요"
        value={message}
        onChange={onChangeMessage}
        onKeyUp={onKeyPress}
      />
      <br />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default Main;
```

- event.target.name을 사용하는 경우
- input의 갯수가 많아질 것 같으면 event.target.name을 쓰는 것이 더 좋을 수도 있음

```js
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
```
