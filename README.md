# 1. 리액트 프로젝트 초기 Setting

## 1.1 리액트 프로젝트 생성

- `npx create-react-app ./`
- `yarn create react-app ./`

## 1.2 파일 정리

index.js에서 이렇게 정리하기

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

App.js, index.css, index.js, logo.svg만 남기기

- src/text 파일들 삭제
- App.css. 파일 삭제
- index.js 파일 정리
- index.css 파일 수정
  파일 다 지우고 이거 복사하고 붙여넣기

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000000;
  text-decoration: none;
}
img {
  vertical-align: middle;
  border: 0;
}
html {
  font-size: 10px;
}
body {
  font-family: "Pretendard-Regular", sans-serif;
  font-size: 1rem;
  line-height: 1.25;
  letter-spacing: -0.23px;
  word-break: keep-all;
  color: #000000;
}
```

# 1.3 React 개발 편의 도구 설치

- 리액트 크롬 개발 도구 [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)
- VS Code React Plugin (ES7+ React/Redux/React-Native snippets ) 설치

## 1.4 normalize.css 설정(CSS 초기화)

- `yarn add normalize.css`(package.json에서 확인 가능)
- src/index.js에서 index.css 위에 import

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
```

## SCSS, emotion.js

- `yarn add sass`

- `yarn add @emotion/react`
- `yarn add @emotion/styled`

## ESLint, prettier 설정 (Extentions에서 다운로드 가능)

- .prettierrc.json 폴더를 만듦

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

- ESLint 설정

  - `yarn add eslint --dev` //yarn이면
  - `npm i eslint --dev` // npm이면

  - `npx eslint --init` // npm으로 했으면 이걸로 해
  - `yarn eslint --init` // yarn으로 했으면 이걸로 해
    엔터 엔터 리액트 브라우저 얀 선택함

```txt
To check syntax and find problems 선택
JavaScript modules (import/export) 선택
React 선택
Does your project use TypeScript? No 선택
Where does your code run? Browser 선택
What format do you want your config file to be in? JavaScript 선택
Would you like to install them now? Yes 선택
Which package manager do you want to use? yarn 선택
```

- .eslintrc.js와 .prettierrc.json을 연결하여 ESLint 설정
  (eslint랑 prettier충돌이 생길 수 있어서 명령어를 해줘야함)

  - `yarn add eslint-config-prettier --save-dev`
  - .eslintrc.js에

  이거 추가함

  ```js
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  ```

  ```js
  rules: {
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "no-unused-vars": "off",
  },
  ```

- 바벨에 의한 경고창 뜨는거 방지용(경고 해결은 아님)

- `npm install @babel/plugin-proposal-private-property-in-object --dev(구글링해라)
- `yarn add @babel/plugin-proposal-private-property-in-object --dev`

App.js에서 다 지우고 이거 복붙

```js
function App() {
  return (
    <div>
      <h1>리액트 베이직</h1>
    </div>
  );
}

export default App;
```
