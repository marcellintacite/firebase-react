import moment from "moment/moment";
import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Check";
import "moment/locale/fr";
moment.locale("fr");

export default function CardTask({ data }) {
  const [checkedValue, setCheckedValue] = useState(data.done);
  const testDate = new Date(data.date);
  const h = moment(testDate).format("Do MMM YYYY, h:mm:ss a");
  const output = new Date(data.time.seconds * 1000);
  const made = moment(output).fromNow();

  const onCheckChange = (e) => {
    console.log(e);
    setCheckedValue(e.target.checked);
  };
  return (
    <CardContainer>
      <div className="head">
        <div className="check">
          <div class="round">
            <input
              type="checkbox"
              id="checkbox"
              value={checkedValue}
              onChange={(e) => onCheckChange(e)}
            />
            <label for="checkbox"></label>
          </div>
        </div>
        <h4>{data.titre}</h4>
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

  .head {
    display: flex;
    height: 40px;
    align-items: center;
    gap: 10px;

    .check {
      .round {
        position: relative;
        width: 24px;
        height: 24px;
      }
      .round label {
        border: 1px solid #f07ea9;
        border-radius: 50%;
        cursor: pointer;
        height: 24px;
        left: 0;
        position: absolute;
        top: 0;
        width: 24px;
      }

      .round label:after {
        border: 2px solid #fff;
        border-top: none;
        border-right: none;
        content: "";
        height: 6px;
        left: 4px;
        opacity: 0;
        position: absolute;
        top: 6px;
        transform: rotate(-45deg);
        width: 12px;
        transition: all 0.4s ease;
      }

      .round input[type="checkbox"] {
        visibility: hidden;
      }

      .round input[type="checkbox"]:checked + label {
        background-color: #f07ea9;
        border-color: #f07ea9;
      }

      .round input[type="checkbox"]:checked + label:after {
        opacity: 1;
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
