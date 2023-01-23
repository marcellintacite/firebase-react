import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Sidebar({ active }) {
  return (
    <SidebarContainer active={active}>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            <div className="icon">
              <i className="fa fa-home"></i>
            </div>
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            <div className="icon">
              <i className="fa fa-info"></i>
            </div>
            <p>About</p>
          </NavLink>
        </li>
      </ul>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: ${(props) => (props.active ? "25%" : "0%")};
  transition: all 0.5s ease;
  overflow: hidden;
  height: 94vh;
  margin-top: 2px;
  background-color: #20212c;

  @media screen and (max-width: 768px) {
    width: ${(props) => (props.active ? "80%" : "0%")};
  }

  ul {
    list-style: none;
    margin-top: 1rem;
    padding: 8px;

    li {
      padding: 8px;
      background-color: #4848534a;
      margin-bottom: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      align-self: start;

      a {
        text-decoration: none;
        color: #fff;
        opacity: 0.6;
        align-items: center;
        display: flex;
        .icon {
          margin-right: 10px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background-color: #f07ea9;
        }
      }
      a.active {
        color: #fff;
        opacity: 1;
      }

      &:last-child {
        a {
          .icon {
            background-color: #a077c0;
          }
        }
      }
    }
  }
`;
