# 3. useState()

## 3.1 state

- 리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미
- props는 상위 컴포넌트가 설정하는 값
- 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용할 수 있음
- props를 바꿀려면 부모 컴포넌트에서 바꿔 줘야함
- 하위 컴포넌트에서 전달 받은 props 값을 직접 바꿀 수 없는데 state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있음

### 3.1.1 useState()

- 리액트 16.8 이후 버전에서 사용 가능
- 이전 버전에서는 Class state 사용

### 3.1.1.1 배열 구조 분해 할당

- 배열 구조 분해 할당

```js
import React, { Component } from "react";

const Main = ({ title, children }) => {
  const array = [10, 20];
  // const one = array[0];
  // const two = array[1];

  // console.log(one);
  // console.log(two);

  // 배열 구조 분해 할당
  const [one, two] = array;
  console.log(one);
  console.log(two);

  return (
    <div>
      <h1>안녕하세요, 나는 {title}입니다</h1>
      <h2>children 값은 {children}입니다</h2>
    </div>
  );
};

Main.defaultProps = {
  title: "기본 이름",
};

export default Main;
```

#### 3.1.1.2 useState 사용

```js
import React, { Component, useState } from "react";

const Main = () => {
  // useState 함수의 인자(인수, argument)에 초기값 useState(초기값)
  // useState 함수를 호출하면 배열이 반환
  // 배열의 첫 번째 요소는 현재 상태 message
  // 두번째 요소는 상태를 바꿔주는 setter 함수 setMessage

  // message는 초기값, setMessage는 함수
  const [message, setMessage] = useState("");

  const onClickEnter = () => {
    setMessage("안녕하세요");
  };
  const onClickLeave = () => {
    setMessage("안녕히 가세요");
  };

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Main;
```

#### 3.1.1.3 한 컴포넌트에서 useState 여러번 사용하기

```js
import React, { Component, useState } from "react";

const Main = () => {
  // 메세지 상태 변경
  const [message, setMessage] = useState("");
  // 메세지 컬러 상태
  const [color, setColor] = useState("black");

  const onClickEnter = () => {
    setMessage("안녕하세요");
    setColor("red");
  };
  const onClickLeave = () => {
    setMessage("안녕히 가세요");
    setColor("blue");
  };

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
    </div>
  );
};

export default Main;
```

## 3.2 state를 사용할 때 주의사항

- state 값을 바꿔야할 때는 setState 혹은 useState를 통해 전달 받은 setter 함수(setMessage, setColor 같은 것들임)를 사용해야함
- 배열이나 객체를 update해야할 때

```js
import React, { Component, useState } from "react";

const Main = () => {
  const object = { a: 1, b: 2, c: 3 };
  const nextObject = { ...object, b: 5 }; // object 사본을 만들어서 b 값만 덮어씀
  console.log(nextObject, object);

  // 객체를 들고 있는 배열
  const array = [
    { id: 1, value: true },
    { id: 2, value: true },
    { id: 3, value: false },
    { id: 4, value: true },
    { id: 5, value: false },
    { id: 6, value: true },
  ];

  let nextArray = array.concat({ id: 7 }); // 새 항목 추가
  nextArray = nextArray.filter(item => item.id !== 2); // id가 2인 항목 제거
  nextArray = nextArray.map(item =>
    item.id === 1 ? { ...item, value: false } : item,
  ); // id가 1인 항목의 value를 false로 설정

  console.log(array);
  console.log(nextArray);

  return (
    <div>
      {/* <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1> */}
    </div>
  );
};

export default Main;
```

## 3.3 정리

- props는 상위 컴포넌트가 설정
- state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 update
