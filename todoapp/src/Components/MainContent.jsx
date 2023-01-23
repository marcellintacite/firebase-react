import React from "react";
import styled from "styled-components";
import MainAction from "./MainAction";
import Sidebar from "./Sidebar";
import _ from "lodash";
import moment from "moment";
export default function MainContent({ active, userItems }) {
  let dataToshow = userItems;

  let n = _.sortBy(dataToshow, function (o) {
    return new moment(o.time.seconds * 1000);
  }).reverse();

  return (
    <ContainerStyled>
      <Sidebar active={active} />
      <MainAction userItems={n} />
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: #17181f;
  display: flex;
`;
