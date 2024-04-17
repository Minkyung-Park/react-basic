# 6. Hooks

## 6.1 useState

```js
import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value} 입니다</b>
      </p>
      <button onClick={() => setValue(value + 1)}>1 증가</button>
      <button onClick={() => setValue(value - 1)}>1 감소</button>
    </div>
  );
};

export default Counter;
```

MainPage.js

```js
import React from "react";
import Counter from "../components/Counter";

const MainPage = () => {
  return (
    <div>
      <h1>Hooks study</h1>
      <div>
        <h2>useState</h2>
        <h3>예시 : 카운터 앱</h3>
        <Counter />
      </div>
      <div>
        <h2>useState</h2>
        <h3>예시 : 카운터 앱</h3>
        <Counter />
      </div>
    </div>
  );
};

export default MainPage;
```

App.js

```js
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
```

## 6.2 useEffect

- 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook

- 기본구조

```js
 useEffect(()=>{},[의존성 배열])
```

### 6.2.1 마운트 될 때만 실행하고 싶을 때

- 의존성 배열 빈배열

### 6.2.2 특정 값이 업데이트될 때만 실행하고 싶을 때

- 의존성 배열 안에 검사하고 싶은 값을 넣어주면 됨

### 6.2.3 뒷정리하기

- 참고 : 컴포넌트의 라이프 사이클
  - 모든 리액트 컴포넌트에는 라이프 사이클(생명 주기)이 존재
  - 컴포넌트의 수명은 페이지에 렌더링 되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝남
  - 가끔 컴포넌트를 처음으로 렌더링 할 때나 컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야 할 수도 있음
  - 또한 불필요한 업데이트를 방지해야 할 수도 있음
  - 라이프 사이클 메서드는 클래스형 컴포넌트에서만 사용 가능
  - 함수형 컴포넌트에서는 Hooks 기능을 사용하여 비슷한 작업을 처리
  - Mount : DOM이 생성되고 웹 브라우저 상에 나타나는 것
  - Update :
    - 컴포넌트는 다음 같은 총 네 가지 경우 업데이트함
    - props가 바뀔 때
    - state가 바뀔 때
    - 상위(부모) 컴포넌트가 리렌더링 될 때
  - Unmount : 컴포넌트를 DOM에서 제거하는 것
  - useEffect는 기본적으로 렌더링되고 난 직후마다 실행됨
  - 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐
  - 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 cleanUp 함수를 반환해주어야 함
  - 렌더링될 때마다 뒷정리 함수가 계속 나타나는 것을 확인 할 수 있음
  - 뒷정리 함수가 호출될 때는 업데이트 직전의 값을 보여줌
