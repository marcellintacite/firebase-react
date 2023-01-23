import moment from "moment";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar({
  setShow: setShowAdd,
  setActiveDash,
  active,
  userItems,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  let notifications = [];
  if (userItems.length !== 0) {
    notifications = userItems.filter(
      (item) => moment.now() > new Date(item.date).getTime()
    );
  }

  const handleOpen = () => {
    setActiveDash(!active);
  };

  return (
    <NavbarContainer>
      <div className="left">
        <span
          className={active ? "fa fa-times" : "fa fa-align-justify"}
          onClick={handleOpen}
        ></span>
      </div>
      <div className="right">
        <div className="add" onClick={() => setShowAdd(true)}>
          <span className="fa fa-plus"></span>
        </div>
        <div className="notification" onClick={() => setShowNotif(!showNotif)}>
          <span className="fa fa-bell"></span>
          <div className="number">{notifications.length}</div>
          {showNotif && (
            <div
              className={
                showNotif
                  ? "notification_container active"
                  : "notification_container"
              }
            >
              <div className="first">
                <h4>Taches expirées</h4>
                {notifications.length !== 0 &&
                  notifications.map((item, index) => (
                    <div key={index} className="item">
                      <p>{item.titre}</p>
                      <div className="footer">
                        <span>
                          {moment(new Date(item.date)).format(
                            "Do MMM YYYY, h:mm:ss a"
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
  box-shadow: 1px 5px 5px #2224;
  z-index: 1000;

  .left {
    span {
      font-size: 1.2rem;
      padding: 5;
      cursor: pointer;
    }
  }

  .right {
    margin-right: 10px;
    display: flex;
    align-items: center;
    position: relative;
    gap: 5px;

    .notification {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-left: 15px;
      cursor: pointer;
      margin-right: 5px;
      background: #c9c9c92b;
      border-radius: 10px;
      .notification_container.active {
        min-height: auto;

        transition: all 0.4s ease-in-out;
      }
      .notification_container {
        position: absolute;
        width: 300px;
        right: 0px;
        min-height: 100px;
        top: 40px;
        background-color: #2c2d39;
        padding: 10px;
        border-radius: 5px;
        z-index: 1000;
        animation: coming 0.4s ease-in;

        @media screen and (max-width: 600px) {
          right: -85px;
          top: 45px;
        }
        @keyframes coming {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .item p {
          padding-bottom: 5px;
        }
        .footer span {
          color: #e45454;
        }

        h4 {
          margin-bottom: 7px;
        }
        .item {
          background-color: #20212c;
          padding: 10px 5px;
          border-radius: 5px;
          margin-bottom: 10px;

          &:hover {
            background-color: #151520;
            transition: all 0.4s ease-in-out;
          }
        }
      }
      .number {
        top: -5px;
        right: -3px;
        color: #fff;
        font-weight: 600;
        position: absolute;
        font-size: 11px;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #ff7c7c;
      }
    }
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
