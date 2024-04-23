import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

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
