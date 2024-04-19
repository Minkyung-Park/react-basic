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
