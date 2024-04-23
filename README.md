# 8. 컴포넌트 스타일링

## 8.1 SCSS

- `yarn add sass`
- src/components/ScssComponent.js

```js
import React from "react";
import "../styles/scssComponent.scss";

const ScssComponent = () => {
  return (
    <div className="box-wrap">
      <div className="box red"></div>
      <div className="box orange"></div>
      <div className="box yellow"></div>
      <div className="box green"></div>
      <div className="box blue"></div>
      <div className="box indigo"></div>
      <div className="box violet"></div>
    </div>
  );
};

export default ScssComponent;
```

- src/components/scssComponent.scss

```scss
// SCSS에서는 변수 사용 가능

// 변수 사용 하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

// 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용 가능)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

.box-wrap {
  display: flex;
  .box {
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;

    &.red {
      background: $red;
      @include square(1); // 저기 위에 mixin에 1을 보낸다
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      background: black;
    }
  }
}
```

### 8.1.1 utils 함수 분리

- 여러 파일에서 사용될 수 있는 SCSS 변수 및 믹스인을 다른 파일로 분리
- src/styles/utils.scss

```scss
// SCSS에서는 변수 사용 가능

// 변수 사용 하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

// 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용 가능)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

- src/styles/scssComponent.scss

```scss
@import "./utils.scss";

.box-wrap {
  display: flex;
  .box {
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;

    &.red {
      background: $red;
      @include square(1); // 저기 위에 mixin에 1을 보낸다
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      background: black;
    }
  }
}
```

## 8.2 CSS Module

- CSS를 불러와서 사용할 때 클래스 이름을 고유한 값
- 즉, [파일 이름]\_[클래스 이름]\_[해시값] 형태로 자동으로 만들어줌
- 컴포넌트 스타일 클래스 이름이 중복되는 현상을 방지해주는 기술
- .module.css 확장자로 파일 저장

- src/components/CSSModule.js

```js
import React from "react";
import styles from "../styles/CSSModule.module.css";

const CSSModule = () => {
  return (
    <div className={`${styles.wrapper} ${styles.inverted}`}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

- src/styles/CSSModule.module.css

```css
/* 자동으로 고유해질 것이므로 흔히 사용되는 단어를 클래스 이름으로 사용할 수 있음 */
.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

.inverted {
  color: black;
  background: white;
  border: 1px solid black;
}

/* 웹 페이지 전역적으로 사용되는 글로벌 CSS */
:global .something {
  font-weight: 800;
  color: aqua;
}
```

- App.js

```js
import React from "react";
import ScssComponent from "./components/ScssComponent";
import CSSModule from "./components/CSSModule";

const App = () => {
  return (
    <div>
      <CSSModule />
    </div>
  );
};

export default App;
```

## 8.3 Emotion

- styled components 비슷함
- src/componets/StyledComponent.js

```js
import styled from "@emotion/styled";
import React from "react";

// Emotion은 첫 글자 무조건 대문자로 적어야함
const StyledBoxDiv = styled.div`
  background: ${props =>
    props.backgroundColor || "blue"}; // 색 안주면 기본으로 블루가 들어감
  padding: 1rem;
  display: flex;
`; // 어디서든 불러 올 수 있다

const StyledButton = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const StyledComponent = () => {
  return (
    <>
      <StyledBoxDiv backgroundColor="pink">
        <StyledButton>안녕하세요</StyledButton>
        <StyledButton>테두리</StyledButton>
      </StyledBoxDiv>
      <StyledBoxDiv backgroundColor="red">
        <StyledButton>안녕하세요</StyledButton>
        <StyledButton>테두리</StyledButton>
      </StyledBoxDiv>
      <StyledBoxDiv>
        <StyledButton>안녕하세요</StyledButton>
        <StyledButton>테두리</StyledButton>
      </StyledBoxDiv>
    </>
  );
};

export default StyledComponent;
```

```js
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

// Emotion은 첫 글자 무조건 대문자로 적어야함
const StyledBoxDiv = styled.div`
  background: ${props =>
    props.backgroundColor || "blue"}; // 색 안주면 기본으로 블루가 들어감
  padding: 1rem;
  display: flex;
`; // 어디서든 불러 올 수 있다

const StyledButton = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  ${props =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `}

  & + button {
    margin-left: 1rem;
  }
`;

// & : 자기 자신

const StyledComponent = () => {
  return (
    <>
      <StyledBoxDiv backgroundColor="black">
        <StyledButton>안녕하세요</StyledButton>
        <StyledButton inverted={true}>테두리</StyledButton>
      </StyledBoxDiv>
    </>
  );
};

export default StyledComponent;
```

- 반응형 디자인

```js
const StyledBoxDiv = styled.div`
  background: ${props => props.backgroundColor || "blue"};
  padding: 1rem;
  display: flex;

  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
```
