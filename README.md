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

### 7.4.1 URL 파라미터

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

### 7.4.2 쿼리 스트링

- useLocation
- useSearchParams Hook 사용하기
- src/pages/About.js

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const About = () => {
  // useSearchParams는 배열 타입의 값을 반환
  // const [쿼리 파라미터를 조회/수정 하는 메서드들이 담긴 객체반환, 쿼리 파라미터를 객체 형태로 업데이트 할 수 있는 함수를 반환] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // get()메서드를 통해 특정 쿼리 파라미터를 조회할 수 있음
  // 중요!! 객체는 프로퍼티와 메서드로 구성 돼 있다
  // set()메서드를 통해 특정 쿼리 파라미터를 업데이트 할 수 있음
  const detail = searchParams.get("detail");
  const mode = searchParams.get("mode");

  // 쿼리 파라미터를 조회할 때 값은 무조건 문자열
  // 필요에 따라 ""(문자열), 숫자는 parseInt() 해야함
  const onToggleDetail = () => {
    setSearchParams({ mode: 1, detail: detail === "true" ? false : true });
  };

  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode: nextMode, detail });
  };
  return (
    <div>
      <h1>소개 페이지입니다.</h1>
      <p>리액트 라우터 사용</p>
      <p>mode: {mode}</p>
      <p>detail: {detail}</p>
      <button onClick={onIncreaseMode}>mode + 1</button>
      <button onClick={onToggleDetail}>detail</button>
    </div>
  );
};

export default About;
```

## 7.5 중첩된 라우트

- 중첩된 라우트를 사용하지 않을 때
- src/pages/Articles.js

```js
import React from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <ul>
      <li>
        <Link to="/article/1">게시글 1</Link>
      </li>
      <li>
        <Link to="/article/2">게시글 2</Link>
      </li>
      <li>
        <Link to="/article/3">게시글 3</Link>
      </li>
    </ul>
  );
};

export default Articles;
```

- src/pages/Article.js

```js
import React from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>게시글 {id}</h2>
    </div>
  );
};

export default Article;
```

- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* / -> 루트, 제일 먼저 Home 페이지를 먼저 보여줌 */}
      <Route path="/about" element={<About />} />
      <Route path="/profiles/:username" element={<Profile />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  );
}

export default App;
```

- src/Home.js

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
        <li>
          <Link to="/articles">게시글 목록</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
```

- 중첩된 라우터를 사용할 때
- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* / -> 루트, 제일 먼저 Home 페이지를 먼저 보여줌 */}
      <Route path="/about" element={<About />} />
      <Route path="/profiles/:username" element={<Profile />} />
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
        <Route path=":id" element={<Article />} />
        <Route path=":id" element={<Article />} />
        <Route path=":id" element={<Article />} />
      </Route>
    </Routes>
  );
}

export default App;
```

- src/pages/Articles.js

```js
import { Link, Outlet } from "react-router-dom";

const Articles = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/articles/1">게시글 1</Link>
        </li>
        <li>
          <Link to="/articles/2">게시글 2</Link>
        </li>
        <li>
          <Link to="/articles/3">게시글 3</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Articles;
```

### 7.5.1 공통 레이아웃 컴포넌트

- 중첩된 라우터와 Outlet은 페이지끼리 공통적으로 보여줘야 하는 레이아웃이 있을 때도 유용하게 사용 가능
- src/components/Layout.js

```js
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header
        style={{
          backgroundColor: "lightgray",
          padding: "1rem",
          fontSize: "24px",
        }}
      >
        Header
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* / -> 루트, 제일 먼저 Home 페이지를 먼저 보여줌 */}
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>

      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
    </Routes>
  );
}

export default App;
```

- src/pages/Articles.js

```js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const Articles = () => {
  return (
    <div>
      <Layout>
        <div>
          <Outlet />
        </div>
      </Layout>

      <ul>
        <li>
          <Link to="/articles/1">게시글 1</Link>
        </li>
        <li>
          <Link to="/articles/2">게시글 2</Link>
        </li>
        <li>
          <Link to="/articles/3">게시글 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Articles;
```

### 7.5.2 index props

- src/App.js

```js
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>

      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
    </Routes>
  );
}

export default App;
```

## 7.6 리액트 라우터 부가 기능

### 7.6.1 useNavigate

- Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야 하는 상황에 사용하는 Hook
- src/components/Layout.js

```js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const goArticles = () => {
    // articles 경로로 이동
    // replace 옵션을 사용하면 페이지를 이동할 때 현재 페이지를 기록에 남기지 않음
    navigate("/articles", { replace: true });
  };

  const goHome = () => {
    // 첫 페이지로 가기
    navigate("/");
  };
  return (
    <div>
      <header
        style={{
          backgroundColor: "lightgray",
          padding: "1rem",
          fontSize: "24px",
        }}
      >
        Header
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
        <button onClick={goHome}>홈으로</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

- src/App.js

```js
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>

      <Route path="/articles" element={<Articles />}>
        <Route index element={<Navigate replace to="1" />} />
        <Route path=":id" element={<Article />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### 7.6.2 NavLink

- 링크에서 사용하는 경로가 현재 라우트와 일치한느 경우
- 특정 스타일 또는 CSS 클래스를 적용하는 컴포넌트임
- 잘 쓰지는 않음
- src/pages/Articles.js

```js
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const Articles = () => {
  const activeStyle = {
    color: "green",
    fontSize: 21,
  };

  return (
    <div>
      <Layout>
        <div>
          <Outlet />
        </div>
      </Layout>

      <ul>
        <li>
          <NavLink
            to="/articles/1"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/2"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/3"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            게시글 3
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Articles;
```

- 리팩토링
- src/pages/Articles.js
- src/pages/Articles.js

```js
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import ArticleItem from "./ArticleItem";

const items = [
  { id: 1, text: "게시글 1" },
  { id: 2, text: "게시글 2" },
  { id: 3, text: "게시글 3" },
  { id: 4, text: "게시글 4" },
  { id: 5, text: "게시글 5" },
];

const Articles = () => {
  return (
    <div>
      <Layout>
        <div>
          <Outlet />
        </div>
      </Layout>
      <ul>
        {items.map(item => (
          <ArticleItem key={item.id} id={item.id} text={item.text} />
        ))}
      </ul>
    </div>
  );
};

export default Articles;
```

- src/pages/ArticleItem.js

```js
import { NavLink } from "react-router-dom";

const ArticleItem = ({ id, text }) => {
  const activeStyle = {
    color: "green",
    fontSize: 21,
  };

  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {text}
      </NavLink>
    </li>
  );
};

export default ArticleItem;
```

### 7.6.3 NotFound 페이지 만들기

- src/pages/NotFound.js

```js
const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      404 error
    </div>
  );
};

export default NotFound;
```

- src/App.js

```js
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>

      <Route path="/articles" element={<Articles />}>
        <Route index element={<Navigate replace to="1" />} />
        <Route path=":id" element={<Article />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

### 7.6.4 Navigate 컴포넌트

- 예를 들어 로그인이 필요한 페이지인데 로그인을 안 했다면
- Redirect하고 싶을 때

- src/pages/Login.js

```js
import React from "react";

const Login = () => {
  return <div>로그인 페이지</div>;
};

export default Login;
```

- src/pages/MyPage.js

```js
import React from "react";
import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLogin = false;

  //   if (!isLogin) {
  //     return <Navigate to="/login" replace={true} />;
  //   } // 이렇게 쓰거나 저기 밑에 reture쓰나 똑같다

  return (
    <div>
      <h1>마이페이지</h1>
      {!isLogin && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default MyPage;
```
