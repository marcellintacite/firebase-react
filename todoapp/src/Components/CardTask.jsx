import moment from "moment/moment";
import React, { useState } from "react";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import "moment/locale/fr";
import { db } from "./../firebase";
import { Checkbox } from "@mui/material";
import { toast } from "react-toastify";
moment.locale("fr");

export default function CardTask({ data, index }) {
  const [checkedValue, setCheckedValue] = useState(data.done);
  const testDate = new Date(data.date);
  const h = moment(testDate).format("Do MMM YYYY, h:mm:ss a");
  const output = new Date(data.time.seconds * 1000);
  const made = moment(output).fromNow();

  const tes = moment.now() > new Date(data.date).getTime();
  const onCheckChange = (e) => {
    setCheckedValue(e.target.checked);
    console.log(e.target.checked, e.target.name, " et ", index);
  };

  const handleDelete = async () => {
    const uid = JSON.parse(localStorage.getItem("userCredintial")).uid;
    console.log("delete");
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      tasks: arrayRemove(data),
    }).then(() => {
      console.log("Document successfully deleted!");
      toast.success("Tâche supprimée avec succès");
    });
  };

  // const handleUpdate = async () => {
  //   const uid = JSON.parse(localStorage.getItem("userCredintial")).uid;
  //   const userRef = doc(db, "users", uid);
  //   const ndata = { ...data, done: checkedValue };
  //   await updateDoc(userRef, {
  //     tasks: arrayUnion(ndata),
  //   }).then(() => {
  //     console.log("Document successfully deleted!");
  //     toast.success("Tâche terminée avec succès");
  //   });
  // };
  return (
    <CardContainer index={index} done={checkedValue} passed={tes}>
      <div className="head">
        <div className="left">
          <div className="check">
            <Checkbox
              onChange={(e) => onCheckChange(e)}
              sx={{
                color: "#f07ea9",
                "&.Mui-checked": {
                  color: "#f07ea9",
                },
                width: 30,
              }}
              value={checkedValue}
            />
          </div>
          <h4>{data.titre}</h4>

          {tes && (
            <div className="valid">
              <span className="fa fa-check"></span>
              <p>Déjà passé</p>
            </div>
          )}
        </div>
        <div className="right">
          <span className="fa fa-trash" onClick={handleDelete}></span>
        </div>
      </div>
      <div className="body">
        <h5>Déscription</h5>
        <p>{data.description}</p>
      </div>
      <div className="footer">
        <div className="label">
          <i className="fa fa-clock"></i>
          <span>{made}</span>
        </div>
        <div className="label">
          <i className="fa fa-calendar"></i>
          <span>{h}</span>
        </div>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: ${(props) => (props.passed ? "#1b0f26" : "#20212c")};
  background-color: ${(props) => props.done && "#7ddd7d20"};
  margin-bottom: 1rem;
  border-radius: 10px;

  padding: 0.5rem;
  opacity: 0;
  transition: all 0.3s ease;

  animation: test 0.5s ease-in-out;
  animation-delay: ${(props) => props.index * 0.3}s;
  opacity: 1;
  @keyframes test {
    0% {
      opacity: 0.4;
      transform: translateY(140px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
    background-color: #2f303d;
    cursor: grab;
    margin-bottom: 2rem;
  }
  .head {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    .left {
      display: flex;
      align-items: center;
      gap: 8px;
      .valid {
        padding: 6px 8px;
        display: flex;
        margin-right: 1rem;
        align-items: center;
        gap: 10;
        border-radius: 5px;
        background-color: #65204296;
        background-color: ${(props) => props.done && "#7ddd7d"};
        color: ${(props) => props.done && "#333"};
        font-size: 11px;

        p {
          margin-left: 5px;
        }
      }
    }
    .right {
      padding-right: 10px;

      span {
        padding: 10px;
        cursor: pointer;

        color: #f07ea9;
      }
    }

    h4 {
      font-size: 1rem;
      font-weight: 500;
      text-decoration: ${(props) => props.done && "line-through"};
      color: ${(props) => props.done && "#12b164"};
    }
  }
  .body {
    width: 80%;
    padding-left: 2.2rem;
    padding-top: 5px;
    h5 {
      font-size: 1.1rem;
      font-weight: 400;
      text-decoration: underline;
    }
    p {
      font-size: 1rem;
      color: #dcdcdc;
      padding-top: 5px;
    }

    @media screen and (max-width: 768px) {
      width: 98%;
      padding-left: 0;
    }
  }
  .footer {
    padding-left: 2.2rem;
    display: flex;
    margin-top: 20px;
    padding-bottom: 1rem;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 0;
    }
    .label {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-right: 20px;

      &:first-child {
        color: #12b164;
      }
      &:last-child {
        color: #f07ea9;
        color: ${(props) => props.done && "#7ddd7d"};
      }
    }
  }
`;
