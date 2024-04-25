# 9. AXIOS

- https://axios-http.com/kr/
- `npm install axios`
- `yarn add axios`

# 9.1 axios 로 API 호출해서 데이터 받아오기

- https://axios-http.com/kr/
- https://jsonplaceholder.typicode.com/

- src/pages/Axios.js

```js
import axios from "axios";
import React, { useState } from "react";

const Axios = () => {
  const [data, setData] = useState(null);

  const onClick = () => {
    console.log("버튼 작동");
    // axios.get 함수는 파라미터로 전달된 주소에 GET 요청을 해줌
    // 그리고 이에 대한 결과는 .then을 통해 비동기적으로 확인할 수 있음
    axios.get("https://jsonplaceholder.typicode.com/posts/1").then(response => {
      setData(response.data);
    });
  };

  return (
    <div>
      <h2>axios</h2>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          readOnly={true}
          value={JSON.stringify(data, null, 2)}
        />
      )}
    </div>
  );
};

export default Axios;
```

- async/await 적용

```js
import axios from "axios";
import React, { useState } from "react";

const Axios = () => {
  const [data, setData] = useState(null);

  const onClick = async () => {
    console.log("버튼 작동");
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>axios</h2>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          readOnly={true}
          value={JSON.stringify(data, null, 2)} // null -> 모든 속성, 2 -> 들여쓰기
        />
      )}
    </div>
  );
};

export default Axios;
```

# 9.2 newsapi API 키 발급받기

- https://newsapi.org/register
- https://newsapi.org/s/south-korea-news-api
- src/pages/Axios.js

```js
import axios from "axios";
import React, { useState } from "react";

const Axios = () => {
  const [data, setData] = useState(null);

  const onClick = async () => {
    console.log("버튼 작동");
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=API_KEY",
      ); // API_KEY를 발급 받아서 적어
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>axios</h2>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          readOnly={true}
          value={JSON.stringify(data, null, 2)} // null -> 모든 속성, 2 -> 들여쓰기
        />
      )}
    </div>
  );
};

export default Axios;
```
