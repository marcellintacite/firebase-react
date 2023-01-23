import moment from "moment/moment";
import React, { useState } from "react";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import "moment/locale/fr";
import { db } from "./../firebase";
import { Checkbox } from "@mui/material";
moment.locale("fr");

export default function CardTask({ data, index }) {
  const [checkedValue, setCheckedValue] = useState(data.done);
  const testDate = new Date(data.date);
  const h = moment(testDate).format("Do MMM YYYY, h:mm:ss a");
  const output = new Date(data.time.seconds * 1000);
  const made = moment(output).fromNow();

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
    });
  };
  return (
    <CardContainer index={index}>
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
        </div>
        <div className="right">
          <span className="fa fa-trash"></span>
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
  background-color: #20212c;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding: 0.5rem;
  opacity: 0;

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
      gap: 5px;
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
      }
    }
  }
`;
