import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  /**
   * This function is used to handle the change of the input
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * This function is used to handle the submit of the form
   * @param {form event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      toast.error("Veuillez remplir tous les champs");
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // navigate("/home");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    console.log(data);
  };
  return (
    <LoginStyle>
      <div className="container">
        <div className="header">
          <h1>Connexion</h1>
          <p>Bienvenue encore et hereux de vous revoir</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Votre adresse mail </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="test@gmail.com"
              min={6}
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Votre mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              min={6}
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <button type="submit" className="btn">
            Connexion
          </button>
        </form>
        <div className="footer">
          <p>
            Vous n'avez pas de compte ? ou vous voulez en créer un ? Cliquez{" "}
            <Link to="/inscription">ici</Link>{" "}
          </p>
        </div>
      </div>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #17181f;

  .container {
    width: 400px;
    min-height: 400px;
    background-color: #20212c;
    border-radius: 5px;
    color: #fff;
    padding: 1rem;

    .header {
      text-align: center;
      h1 {
        text-align: center;
        padding: 5px;
        color: #fff;
      }
    }

    form {
      width: 90%;
      margin: auto;
      margin-top: 2rem;
      .input-group {
        margin-bottom: 1rem;
        input {
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 5px;
          outline: none;
          padding: 0 0.4rem;
          margin-top: 5px;
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        border: none;
        background: #f1769d;
        border-radius: 5px;
        margin-top: 5px;
        cursor: pointer;
        font-weight: 600;
        color: #fff;
      }
    }
    .footer {
      width: 90%;
      margin: auto;
      margin-top: 10px;
      padding-bottom: 10px;

      p {
        text-align: center;
        padding-top: 0.3rem;
        color: #bcbcbc;

        a {
          color: #f1769d;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      width: 90%;
      height: auto;
      p {
        font-size: 0.9rem;
      }
      form {
        width: 100%;

        .input-group {
          input {
            height: 45px;
          }
        }
      }
    }
  }
`;
