# 5. 컴포넌트 반복

## 5.1 JS 배열의 map() 메서드

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map

## 5.2 데이터 배열을 컴포넌트 배열로 변환

```js
import React from "react";

const main = () => {
  const usernames = ["홍길동", "임꺽정", "알라딘", "지니", "미키마우스"];

  return (
    <div>
      <ul>
        {usernames.map((username, index) => {
          return <li key={index}>{username}</li>;
        })}
      </ul>
    </div>
  );
};

export default main;
```

## 5.3 응용

### 5.3.1 초기 상태 설정

```js
import React, { useState } from "react";

const initState = [
  { id: 1, username: "알라딘" },
  { id: 2, username: "지니" },
  { id: 3, username: "홍길동" },
  { id: 4, username: "임꺽정" },
  { id: 5, username: "미키마우스" },
];

const main = () => {
  // member 목록 상태
  const [members, setMembers] = useState(initState);
  // id 상태
  const [nextId, setNextId] = useState(6);

  return (
    <div>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default main;
```

### 5.3.2 데이터 추가 기능 구현

- push가 아닌 concat을 사용하는 이유는 불변성 유지(immutable) 때문임
- 리액트에서는 상태를 update할 때 기존 상태를 그대로 두면서 새로운 값을 설정해야함(불변성 유지)
- push는 기존 배열 자체를 변경
- concat은 새로운 배열을 만들어 줌

```js
import React, { useState } from "react";

const initState = [
  { id: 1, username: "알라딘" },
  { id: 2, username: "지니" },
  { id: 3, username: "홍길동" },
  { id: 4, username: "임꺽정" },
  { id: 5, username: "미키마우스" },
];

const main = () => {
  // member 목록 상태
  const [members, setMembers] = useState(initState);
  // id 상태
  const [nextId, setNextId] = useState(6);
  // input 상태
  const [username, setUsername] = useState("");

  const onChange = event => {
    setUsername(event.target.value);
  };

  const onClick = () => {
    // console.log("사용자 이름 추가할거임");

    // 배열의 내장 함수 concat을 사용하여 새로운 항목을 추가한 배열로 만듦
    const nextMembers = members.concat({
      id: nextId,
      username: username,
    });
    setNextId(nextId + 1);
    // console.log(nextId);
    setMembers(nextMembers);
    // console.log(nextMembers);
    setUsername(""); // 글 입력해서 사용자 추가한뒤 글씨 사라지게 함
    console.log("추가됐음");
  };

  return (
    <div>
      <input onChange={onChange} value={username} />
      <button onClick={onClick}>사용자 추가</button>

      <ul>
        {members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default main;
```

### 5.3.3 데이터 제거 기능 구현

- 각 항목을 더블 클릭 했을 때 화면에서 사라지는 기능 구현
- 불변성을 유지 하면서 update, filter 함수 사용
- fliter 함수는 배열에서 특정 조건을 만족하는 원소들만 분류

```js
import React, { useState } from "react";

const initState = [
  { id: 1, username: "알라딘" },
  { id: 2, username: "지니" },
  { id: 3, username: "홍길동" },
  { id: 4, username: "임꺽정" },
  { id: 5, username: "미키마우스" },
];

const main = () => {
  const numbers = [1, 2, 3, 4, 5];
  const bigger = numbers.filter(num => num > 3); // numbers를 사본으로 만들어서 한거임
  console.log(bigger);

  const remove = numbers.filter(num => num !== 3);
  console.log(remove);

  // member 목록 상태
  const [members, setMembers] = useState(initState);
  // id 상태
  const [nextId, setNextId] = useState(6);
  // input 상태
  const [username, setUsername] = useState("");

  // input 이벤트 핸들러
  const onChange = event => {
    setUsername(event.target.value);
  };

  const onClick = () => {
    // 배열의 내장 함수 concat을 사용하여 새로운 항목을 추가한 배열로 만듦
    const nextMembers = members.concat({
      id: nextId,
      username: username,
    });
    setNextId(nextId + 1);

    setMembers(nextMembers);

    setUsername(""); // 글 입력해서 사용자 추가한뒤 글씨 사라지게 함
    // console.log("추가됐음");
  };

  return (
    <div>
      <input onChange={onChange} value={username} />
      <button onClick={onClick}>사용자 추가</button>

      <ul>
        {members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default main;
```

```js
import React, { useState } from "react";

const initState = [
  { id: 1, username: "알라딘" },
  { id: 2, username: "지니" },
  { id: 3, username: "홍길동" },
  { id: 4, username: "임꺽정" },
  { id: 5, username: "미키마우스" },
];

const main = () => {
  // member 목록 상태
  const [members, setMembers] = useState(initState);
  // id 상태
  const [nextId, setNextId] = useState(6);
  // input 상태
  const [username, setUsername] = useState("");

  // input 이벤트 핸들러
  const onChange = event => {
    setUsername(event.target.value);
  };

  const onClick = () => {
    // 배열의 내장 함수 concat을 사용하여 새로운 항목을 추가한 배열로 만듦
    const nextMembers = members.concat({
      id: nextId,
      username: username,
    });
    setNextId(nextId + 1);

    setMembers(nextMembers);

    setUsername(""); // 글 입력해서 사용자 추가한뒤 글씨 사라지게 함
    // console.log("추가됐음");
  };

  // remove 이벤트 핸들러
  const onRemove = id => {
    const nextMembers = members.filter(member => member.id !== id);
    setMembers(nextMembers);
  };

  return (
    <div>
      <input onChange={onChange} value={username} />
      <button onClick={onClick}>사용자 추가</button>

      <ul>
        {members.map(member => (
          <li key={member.id} onDoubleClick={() => onRemove(member.id)}>
            {member.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default main;
```
