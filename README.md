# 7. 리액트 라우터로 SPA 개발

## 7.1 라우팅이란

- 라우팅의 개념 : 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 것을 의미
- 게시판(community)을 만든다고 가정해보자
- 글쓰기 페이지(write) : 새로운 글을 작성하는 페이지
- 글목록 페이지(list) : 작성된 여러 글의 목록을 보여주는 페이지
- 해당 글읽기 페이지(read) : 하나의 글을 보여주는 페이지
- 예시 : http://localhost:3000/community/write

- 이렇게 여러 페이지로 구성된 웹 어플리케이션을 만들 때 페이지 별로 컴포넌트들을 분리해가면서
- 프로젝트를 관리하기 위해 필요한 것이 라우팅 시스템
- 리액트 라우터, Next.js

## 7.2 싱글 페이지 어플리케이션(SPA)이란

- 하나의 페이지로 이루어진 어플리케이션이라는 의미
- 사용자 Interaction이 많고 다양한 정보를 제공하는 모던 웹 어플리케이션에 적합
- html은 한 번만 받아와서 웹 어플리케이션을 실행 시킨 후
- 이 후에는 필요한 데이터만 받아와서 화면에 업데이트 하는 것이 싱글 페이지 어플리케이션임
- 다른 페이지로 이동할 때는 다른 페이지의 html을 새로 요청하는 것이 아니고 브라우저의 History API를 사용하여 브라우저의 주소 창의 값만 변경하고 기존의 페이지에 띄었던 웹 어플리케이션을 그대로 유지하면서 라우팅 설정에 따라 또 다른 페이지를 보여주게 됨

## 7.3 리액트 라우터 적용 및 기본 사용법

- 순서

1. 프로젝트 생성 및 라이브러리 설치
2. 페이지 만들고 이동
3. URL 파라미터와 쿼리스트링 사용해보기
4. 중첩된 라우터 구현
5. 리액트 라우터의 부가 기능 사용해보기

### 7.3.1 프로젝트 생성 및 라이브러리 설치

- `yarn add react-router-dom`
- `npm i react-router-dom`

### 7.3.2 프로젝트에 라우터 적용

- src/index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

### 7.3.3 페이지 컴포넌트 만들기

- src/pages/Home.js

```js
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>가장 먼저 보여지는 페이지</h1>
    </div>
  );
};

export default Home;
```

- src/pages/About.js

```js
import React from "react";

const About = () => {
  return (
    <div>
      <h1>소개 페이지 입니다</h1>
    </div>
  );
};

export default About;
```

### 7.3.4 Route 컴포넌트로 특정 경로에 원하는 컴포넌트 보여주기

- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* / -> 루트 */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
```

### 7.3.5 Link 컴포넌트를 사용하여 다른 페이지로 이동하는 링크 보여주기

- a 태그는 브라우저에서 페이지를 새로 불러오게 되기 때문에 사용
- Link 컴포넌트는 a 태그를 사용하긴 하지만 페이지를 새로 불러오는 것을 막고 History API를 통해 브라우저 주소의 경로만 바꾸는 기능으로 내장되어 있음

- src/pages/Home.js

```js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지 입니다</p>
      <Link to="/about">소개 페이지</Link>
    </div>
  );
};

export default Home;
```

## 7.4 URL 파라미터와 쿼리스트링

- src/pages/Profile.js

```js
import React from "react";
import { useParams } from "react-router-dom";

const data = {
  ironman: {
    name: "아이언맨",
    description: "어벤저스 소속 천재",
  },
  thor: {
    name: "토르",
    description: "맥주에 미친 천둥의 신",
  },
};

const Profile = () => {
  // useParams : URL 파라미터의 값을 조회할 수 있게 해줌
  const params = useParams(); // params에 담아준다

  const profile = data[params.username];

  return (
    <div>
      <h1>사용자 프로필</h1>
      <div>
        {profile ? (
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
          </div>
        ) : (
          <p>존재하지 않는 프로필입니다.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
```

- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* / -> 루트, 제일 먼저 Home 페이지를 먼저 보여줌 */}
      <Route path="/about" element={<About />} />
      <Route path="/profiles/:username" element={<Profile />} />
    </Routes>
  );
}

export default App;
```

- src/pages/Home.js

```js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <ul>
        <li>
          <Link to="/about">소개 페이지</Link>
        </li>
        <li>
          <Link to="/profiles/ironman">Ironman의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/thor">Thor의 프로필</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
```

- src/pages/About.js

```js
import React from "react";

const About = () => {
  return (
    <div>
      <h1>소개 페이지 입니다</h1>
    </div>
  );
};

export default About;
```
