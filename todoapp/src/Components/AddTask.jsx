import React from "react";
import styled from "styled-components";

export default function AddTask() {
  return (
    <StyledAdd>
      <div className="container">
        <h1>AddTask</h1>
      </div>
    </StyledAdd>
  );
}

const StyledAdd = styled.div`
  width: 500px;
  margin: auto;
  height: 400px;
  display: flex;
  background-color: #20212c;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: apa 0.4s ease-in;

  @keyframes apa {
    0% {
      width: 0;
    }
    100% {
      width: 500px;
    }
  }
`;
