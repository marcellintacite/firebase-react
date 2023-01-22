import React from "react";
import styled from "styled-components";
import MainAction from "./MainAction";
import Sidebar from "./Sidebar";
import _ from "lodash";
export default function MainContent({ active, userItems }) {
  // let dataToshow = [];
  // if (_.isEmpty(userItems)) {
  //   console.log("empty");
  // } else {
  //   dataToshow = _.sortBy(userItems, [
  //     function (o) {
  //       return o.date;
  //     },
  //   ]);
  // }
  return (
    <ContainerStyled>
      <Sidebar active={active} />
      <MainAction userItems={userItems} />
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: #17181f;
  display: flex;
`;
