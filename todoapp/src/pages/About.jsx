import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tacite from "./../assets/tacite.jpg";

export default function About() {
  const navigation = useNavigate();
  return (
    <AboutContainer>
      <div className="container">
        <div className="head">
          <div className="left">
            <div className="card" onClick={() => navigation("/dashboard")}>
              <span className="fa fa-arrow-left"></span>
            </div>
          </div>
          <div className="right">
            <a href="https://twitter.com/BahigaTacite">
              <span className="fa fa-twitter"></span>
            </a>
            <a href="https://www.instagram.com/aksantibahiga/">
              <span className="fa fa-instagram"></span>
            </a>
            <a href="https://www.linkedin.com/in/aksanti-bahiga-tacite-42b5981a1/">
              <span className="fa fa-linkedin"></span>
            </a>
          </div>
        </div>

        <div className="body">
          <div className="left">
            <div className="circle">
              <img src={tacite} alt="Aksanti Bahiga Tacite" />
            </div>
            <div className="text">
              <h2>Aksanti Bahiga Tacite</h2>
              <p>Développeur frontend</p>

              <div className="phone">
                <a href="wa.link/8jn8yf">
                  <span className="fa fa-whatsapp"></span>
                </a>
                <a href="tel:+243999537410">
                  <span className="fa fa-phone"></span>
                </a>
                <a href="mailto:aksantibahiga3@gmail.com">
                  <span className="fa fa-envelope"></span>
                </a>
              </div>
            </div>
          </div>
          <div className="right">
            <h2>A propos</h2>
            <p>
              Cette application a été conçu par Aksanti Bahiga Tacite, étudiant
              à l'UCB et dévéloppeur web frontend. Passionné par la nouvelle
              technologie et la resolution des problèmes, <b>Tacite</b> est
              aussi concepteur de <a href="https://tingpage.com">Tingpage</a>{" "}
            </p>
            <div className="tech">
              <h3>Technologies utilisées</h3>
              <ul>
                <li>React</li>
                <li>React Router</li>
                <li>Styled Components</li>
                <li>Firebase</li>
                <li>React Toastify</li>
              </ul>
            </div>
            <div className="code">
              <h3>Code source</h3>
              <p>
                Le code source de cette application est disponible sur{" "}
                <a href="https://github.com/marcellintacite/firebase-react/tree/main/todoapp">
                  Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AboutContainer>
  );
}
const AboutContainer = styled.div`
  width: 100%;
  background-color: #17181f;
  padding: 10px;
  display: flex;
  align-items: center;
  min-height: 100vh;
  animation: ani 0.5s ease-in-out;
  @keyframes ani {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 830px) {
    min-height: 140vh;
  }
  .container {
    width: 80%;
    margin-top: 10px;
    border-radius: 10px;
    min-height: 90vh;
    margin: auto;
    padding-bottom: 10px;
    background-color: #20212c;
    animation: opa 0.5s ease-in-out;
    @keyframes opa {
      from {
        transform: translateY(-100px);
      }
      to {
        transform: translateY(0px);
      }
    }
    @media screen and (max-width: 830px) {
      min-height: 100vh;
      width: 99%;
      margin-top: 20px;
    }

    .head {
      height: 70px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      padding-right: 10px;
      color: #fff;
      border-bottom: 1px solid #2f313c;

      .left {
        .card {
          width: 40px;
          height: 40px;
          color: #fff;
          background-color: #2f313c;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 10px;
        a {
          width: 40px;
          height: 40px;
          color: #fff;
          text-decoration: none;
          background-color: #2f313c;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          &:hover {
            background-color: #3f414c;
            transition: all 0.3s ease-in;
          }
        }
      }
    }

    .body {
      display: flex;
      min-height: 75vh;
      .left,
      .right {
        flex: 1;
      }
      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        .text {
          text-align: center;
          color: #fff;
          .phone {
            padding-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;

            a {
              text-decoration: none;
              color: #fff;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #2f313c;
            }
          }
        }
        .circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      @media screen and (max-width: 830px) {
        flex-direction: column;
      }

      .right {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 2rem;

        h2,
        p {
          animation: text 0.5s ease-in-out;
          @keyframes text {
            from {
              transform: translateY(-100px);
            }
            to {
              transform: translateY(0px);
            }
          }
        }
        h2 {
          padding-bottom: 1rem;
        }
        p {
          text-align: justify;
          a {
            text-decoration: none;
            color: #f07ea9;
          }
          padding-bottom: 1rem;
        }

        .tech {
          width: 100%;
          padding-top: 1rem;
          h3 {
            text-align: center;
          }
          ul {
            list-style: circle;
          }
        }
        .code {
          width: 100%;
          padding-top: 1rem;
          h3 {
            text-align: center;
          }
          p {
            padding-top: 10px;
          }
        }
      }
    }
  }
`;
