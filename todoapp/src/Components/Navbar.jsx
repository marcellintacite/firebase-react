import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar({ setShow: setShowAdd }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);

  return (
    <NavbarContainer>
      <div className="left">
        <span className="fa fa-align-justify"></span>
      </div>
      <div className="right">
        <div className="add" onClick={() => setShowAdd(true)}>
          <span className="fa fa-plus"></span>
        </div>
        <div className="user">
          <Avatar
            name={user.nom}
            size="35"
            textSizeRatio={1.75}
            round
            onClick={() => setShow(!show)}
            className="user_icon"
          />
          <div
            className={show ? "down active" : "down"}
            onMouseLeave={() => setShow(!show)}
          >
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/deconnexion">Déconnexion</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #20212c;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;

  .left {
    span {
      font-size: 1.2rem;
    }
  }

  .right {
    margin-right: 10px;
    display: flex;
    align-items: center;
    position: relative;
    .add {
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, #f1769d 0%, #961883 100%);
    }
    .user {
      margin-left: 20px;
      overflow-x: hidden;

      .user_icon {
        cursor: pointer;
      }

      .down {
        display: none;
        height: 0;
        border-radius: 10px;
        border: 1px solid #ffffff60;
        box-shadow: 1px 2px 2px #f4f4f41b;
      }
      .down.active {
        position: absolute;
        display: block;
        height: auto;
        padding: 20px;
        background: #20212c;
        top: 38px;
        right: 0px;
        animation: apa 0.5s ease-in-out;
        @keyframes apa {
          0% {
            transform: translateY(-200px);
          }
          100% {
            transform: translateY(0);
          }
        }

        ul {
          list-style: none;
          li {
            padding: 10px 0px;
            margin-bottom: 10px;
            a {
              border-bottom: 1px solid #b1b1b1;
              text-decoration: none;
              color: #fff;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: 65px;
  }
`;
