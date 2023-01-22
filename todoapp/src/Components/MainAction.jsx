import React from "react";
import styled from "styled-components";
import AddComponent from "./AddComponent";
import CardTask from "./CardTask";

export default function MainAction({ userItems }) {
  console.log(userItems);
  return (
    <ContainerStyled>
      <div className="container_c">
        <h3>Gestionnaire des taches</h3>
        <AddComponent />
        <div className="tasks">
          <div className="no_done">
            <h4>Non terminé</h4>
            <div className="cards">
              {userItems.length > 0 &&
                userItems.map((item) => {
                  return (
                    <CardTask key={item.date} id={item.date} data={item} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: 100%;
  min-height: 90vh;

  .container_c {
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;

    h3 {
      font-size: 1.9rem;
      margin-top: 1rem;
      color: #fff;
    }

    .tasks {
      width: 100%;
      margin-top: 1rem;
      color: #fff;
      .no_done {
        h4 {
          font-size: 1.3rem;
        }
        .cards {
          padding: 10px 0;
        }
      }
    }
    @media (max-width: 768px) {
      width: 90%;
      margin: auto;
    }
  }
`;
