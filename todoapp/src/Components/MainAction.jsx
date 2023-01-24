import React from "react";
import styled from "styled-components";
import AddComponent from "./AddComponent";
import CardTask from "./CardTask";
import Lottie from "lottie-react";
import empty from "../assets/empty.json";

export default function MainAction({ userItems }) {
  return (
    <ContainerStyled>
      <div className="container_c">
        <h3>Gestionnaire des taches</h3>
        <AddComponent />
        <div className="tasks">
          <div className="no_done">
            {userItems.length > 0 && <h4>Non terminé</h4>}
            <div className="cards">
              {userItems.length > 0 &&
                userItems.map((item, index) => {
                  return (
                    <CardTask
                      key={item.date}
                      id={item.date}
                      data={item}
                      index={index}
                    />
                  );
                })}
              {userItems.length === 0 && (
                <div className="empty">
                  <Lottie
                    animationData={empty}
                    color="#fff"
                    size={10}
                    className="lottie"
                  />
                  <h4>Aucune tache</h4>
                </div>
              )}
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

          .empty {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            gap: 10px;
            .lottie {
              width: 35%;

              @media (max-width: 768px) {
                width: 80%;
              }
            }
          }
        }
      }
    }
    @media (max-width: 768px) {
      width: 90%;
      margin: auto;
    }
  }
`;
