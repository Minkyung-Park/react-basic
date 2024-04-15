# 2. 컴포넌트

## 2.1 클래스형 컴포넌트

- 생긴 모양만 일단 알아두자
- 함수형과 기능에서 큰 차이 없음
- **현재 트랜드는 함수형 컴포넌트와 Hooks를 사용하는 것**

```js
import React, { Component } from "react";
import "./react.css";

// const Main = () => {
//   const title = "리액트";

//   return (
//     <div>
//       <h1>{title}</h1>
//     </div>
//   );
// };

class Main extends Component {
  render() {
    const title = "리액트";
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default Main;
```

## 2.2 컴포넌트 생성

- 파일 및 컴포넌트 명은 파스칼 케이스로 함
- 리액트에서는 화살표 함수를 많이 씀

## 2.3 Props(properties)

- 컴포넌트 속성을 설정할 때 사용하는 요소
- **props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정**

### 2.3.1 JSX 내부에서 props 랜더링

- props 값은 컴포넌트 함수의 파라미터로 받아와서 사용할 수 있음
- props를 렌더링 할 때는 JSX 내부에서 {}로 감쌈
- App.js

```js
import Main from "./Main";

function App() {
  return <Main title="리액트" />;
}

export default App;
```

- Main.js

```js
import React from "react";
import "./react.css";

const Main = props => {
  return (
    <div>
      <h1>안녕하세요, 나는{props.title}입니다.</h1>
    </div>
  );
};

export default Main;
```
