import React from "react";
import styled from "styled-components";
import MainAction from "./MainAction";
import Sidebar from "./Sidebar";

export default function MainContent() {
  return (
    <ContainerStyled>
      <Sidebar />
      <MainAction />
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
`;
