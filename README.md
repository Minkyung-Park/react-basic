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

```js
import React, { useEffect, useState } from "react";

const Counter = () => {
  console.log("카운터 컴포넌트 렌더링");

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("effect");
    console.log(value);
  }, [value]);

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

- 컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 cleanUp 함수를 반환해주어야 함
- 렌더링될 때마다 뒷정리 함수가 계속 나타나는 것을 확인 할 수 있음
- 뒷정리 함수가 호출될 때는 업데이트 직전의 값을 보여줌

```js
import React, { useEffect, useState } from "react";

const Counter = () => {
  console.log("카운터 컴포넌트 렌더링");

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("effect");
    console.log(value);
    return () => {
      console.log("cleanup");
      console.log(value);
    };
  }, [value]);

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

- 오직 언마운트 될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수에 빈 배열을 넣으면 됨

```js
import React, { useEffect, useState } from "react";

const Counter = () => {
  console.log("카운터 컴포넌트 렌더링");

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("effect");
    console.log(value);
    return () => {
      console.log("cleanup");
      console.log(value);
    };
  }, []);

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

## 6.3 useReducer

- 카페에 비유 해볼께요
- 액션 타입 : 카페의 메뉴 (아메리카노, 라떼, 카푸치노, 아이스티 등)
- 액션 생성 함수 : 주문서 작성 (아메리카노 하나랑 라떼 한 잔 주세요)
  - 페이로드 : 주문서 작성 (아메리카노는 **샷 추가**, 라떼 우유는 **두유**로 바꿔주세요)
- 디스패치 함수 : 주문하기
- 리듀서 함수 : 바리스타, 주문 받은걸 만들고 가공해서 손님에게 드림

- useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook
- 리듀서는 현재 상태 그리고 업데이트를 위해 필요한 정보를 담은 action 값을 전달 받아 새로운 상태를 반환하는 함수
- 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜줘야함

### 6.3.1 카운터 구현하기

```js
import React from "react";

const CounterReducer = () => {
  return <div>CounterReducer</div>;
};

export default CounterReducer;
```

- src/components/CounterReducer.js(실제 이런식으로 적진 않음)

```js
import React, { useReducer } from "react";

const reducer = (state, action) => {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
};

const CounterReducer = () => {
  // useReducer의 첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 해당 리듀서의 기본값
  // useReducer Hook을 사용하면 state 값과 dispatch 함수를 받아옴
  // state : 현재 상태
  // dispatch : 액션을 발생시키는 함수
  // dispatch(action)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조
  // useReducer의 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 밖으로 빼낼 수 있음
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>1 증가</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>1 감소</button>
    </div>
  );
};

export default CounterReducer;
```

### 6.3.2 input 상태 관리하기

- userReducer에서의 액션은 그 어떤 값도 사용 가능
- 그래서 e.target 값 자체를 액션 값으로 사용

- src/components/InputReducer.js

```js
import React, { useReducer, useState } from "react";

// e : event

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
}; // 복사한 것에 덮어씌어라

const initState = {
  username: "",
  nickname: "",
};

const InputReducer = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { username, nickname } = state;

  const onChange = e => {
    dispatch(e.target);
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
        <b>이름:</b> {username}
      </div>
      <div>
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
};

export default InputReducer;

//  ...state -> 사본 만들기
```

```js
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
```

## 6.4 useMemo

- 함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다

```js
import React, { useMemo, useRef, useState } from "react";

const getAverage = number => {
  console.log("평균값 계산 중...");
  if (number.length === 0) return 0;

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  // useRef
  const inputElement = useRef(null);

  // input 이벤트 핸들러
  const onChange = e => {
    setNumber(e.target.value);
    console.log(e.target.value);
  };

  // button 이벤트 핸들러
  const onClick = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    // useRef
    inputElement.current.focus();
  };

  // useRef 로컬 변수 사용
  // 더블 클릭 방지기능
  const isClick = useRef(false); // 초기값은 false
  const preventDblClick = () => {
    if (isClick.current) {
      console.log("이미 처리 중입니다");
      inputElement.current.focus();
      return;
    }

    console.log("처리 시작");
    isClick.current = true;
    onClick();

    // 처리에 1초가 소요된다고 가정
    setTimeout(() => {
      isClick.current = false;
      console.log("처리 완료");
    }, 2000); // 1초 : 1000
  };

  // const avg = getAverage(list);
  // useMemo를 사용할 때
  // input 내용이 바뀔 때는 평균값을 계산할 필요 없음
  // list가 바뀌었을 때만 평균값을 계산
  const avg = useMemo(() => {
    return getAverage(list);
  }, [list]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={onChange}
        ref={inputElement}
      />
      <button onClick={preventDblClick}>등록</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

## 6.5 useCallback

- useMemo와 상당히 비슷한 함수
- 주로 렌더링 성능을 최적화해야 하는 상황에서 사용
- 이 Hook을 사용하면 만들어놔던 함수를 재사용할 수 있다
- 컴포넌트가 리렌더링 될때마다 새로 만들어진 함수를 사용하게 되는 것은 렌더링이 자주 발생하거나 렌더링해야할 컴포넌트의 개수가 많아지면 최적화 하는 것이 좋다

```js
import React, { useCallback, useMemo, useRef, useState } from "react";

const getAverage = number => {
  console.log("평균값 계산 중...");
  if (number.length === 0) return 0;

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  // useRef
  const inputElement = useRef(null);

  // input 이벤트 핸들러
  const onChange = useCallback(e => {
    setNumber(e.target.value);
    console.log(e.target.value);
  }, []);

  // button 이벤트 핸들러
  const onClick = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    // useRef
    inputElement.current.focus();
  }, [number, list]);

  // useRef 로컬 변수 사용하기
  // 더블클릭 방지 기능
  const isClick = useRef(false);
  const preventDblClick = () => {
    if (isClick.current) {
      console.log("이미 처리중입니다...");
      inputElement.current.focus();
      return;
    }

    console.log("처리 시작...");
    isClick.current = true;
    onClick();

    // 처리에 1초가 소요된다고 가정하자.
    setTimeout(() => {
      isClick.current = false;
      console.log("처리완료");
    }, 2000);
  };

  // const avg = getAverage(list);
  // useMemo를 사용할 때
  // input 내용이 바뀔 때는 평균값을 계산할 필요 없음
  // list가 바뀌었을 때만 평균값을 계산
  const avg = useMemo(() => {
    return getAverage(list);
  }, [list]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={onChange}
        ref={inputElement}
      />
      <button onClick={preventDblClick}>등록</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

## 6.6 useRef

- 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해줌
- https://velog.io/@yubiny289/%EB%A6%AC%EC%95%A1%ED%8A%B8-ref-DOM%EC%97%90-%EC%9D%B4%EB%A6%84-%EB%8B%AC%EA%B8%B0

```js
오류 체크

import React, { useRef, useState } from "react";

const getAverage = number => {
  console.log("평균값 계산 중");
  if (number.length === 0) return 0;

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
}; // 한 줄일때 {}생략 가능

nst Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");
    // useRef
    const inputElement = useRef(null);


  // input 이벤트 핸들러
  const onChange = e => {
    setNumber(e.target.value);
    console.log(e.target.value);
  };


  // button 이벤트 핸들러
  const onClick = () => {
    const nextList = list.concat(parseInt(number)); // 정수(숫자)로 변환, concat -> 새로운 배열을 만들어줌
    setList(nextList);
    setNumber("");
    // useRef
    inputElement.current.focus(); // 등록하고 그 깜빡이게 입력창 바로 전환됨
  };

  const avg = getAverage(list);


  };
  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={onChange}
        ref={inputElement}
      />
      <button onClick={onClick}>등록</button>

      {/* 배열 만드는 중 */}
      {/* 맵에서는 ()써서 뭔가를 보여준다 */}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

```js
정상 작동됨

import React, { useRef, useState } from "react";

const getAverage = number => {
  console.log("평균값 계산 중...");
  if (number.length === 0) return 0;

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  // useRef
  const inputElement = useRef(null);

  // input 이벤트 핸들러
  const onChange = e => {
    setNumber(e.target.value);
    console.log(e.target.value);
  };

  // button 이벤트 핸들러
  const onClick = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    // useRef
    inputElement.current.focus();
  };

  const avg = getAverage(list);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={onChange}
        ref={inputElement}
      />
      <button onClick={onClick}>등록</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```

### 6.6.1 로컬 변수 사용

- 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있음
- 여기서 로컬 변수는 렌더링과 상관없이 바뀔 수 있는 **값**을 의미함
- 실습 예제 : 더블 클릭 방지 기능 구현, 사용자가 버튼을 빠르게 여러 번 클릭하는 경우 예상치 못한 여러 번의 액션을 방지

```js
import React, { useRef, useState } from "react";

const getAverage = number => {
  console.log("평균값 계산 중...");
  if (number.length === 0) return 0;

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  // useRef
  const inputElement = useRef(null);

  // input 이벤트 핸들러
  const onChange = e => {
    setNumber(e.target.value);
    console.log(e.target.value);
  };

  // button 이벤트 핸들러
  const onClick = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    // useRef
    inputElement.current.focus();
  };

  // useRef 로컬 변수 사용
  // 더블 클릭 방지기능
  const isClick = useRef(false); // 초기값은 false
  const preventDblClick = () => {
    if (isClick.current) {
      console.log("이미 처리 중입니다");
      inputElement.current.focus();
      return;
    }

    console.log("처리 시작");
    isClick.current = true;
    onClick();

    // 처리에 1초가 소요된다고 가정
    setTimeout(() => {
      isClick.current = false;
      console.log("처리 완료");
    }, 2000); // 1초 : 1000
  };

  const avg = getAverage(list);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={onChange}
        ref={inputElement}
      />
      <button onClick={preventDblClick}>등록</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
```
