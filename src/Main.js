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
