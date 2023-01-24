import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "./../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animation from "../assets/todo.json";
import { HashLoader } from "react-spinners";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPwd: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userCredintial")) {
      navigate("/dashboard");
    }
  });
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
    setShow(true);
    if (data.email === "" || data.password === "" || data.confirmPwd === "") {
      toast.error("Veuillez remplir tous les champs");
      setShow(false);
    } else if (data.password !== data.confirmPwd) {
      toast.error("Les mots de passe ne correspondent pas");
      setShow(false);
    } else {
      setShow(true);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          localStorage.setItem("userCredintial", JSON.stringify(user));
          toast.success("Compte créé avec succès");
          setTimeout(() => {
            navigate("/confirmation");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, " et ", errorMessage);
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Cette adresse mail est déjà utilisée");
            setShow(false);
          }
          if (errorCode === "auth/invalid-email") {
            toast.error("Cette adresse mail n'est pas valide");
            setShow(false);
          }
          if (errorCode === "auth/weak-password") {
            toast.error("Le mot de passe doit contenir au moins 6 caractères");
            setShow(false);
          }
          if (errorCode === "auth/network-request-failed") {
            toast.error("Veuillez verifier votre connexion internet");
            setShow(false);
          }
        });
    }
  };
  return (
    <LoginStyle>
      <div className="container">
        <div className="header">
          <div className="logo">
            <Lottie animationData={animation} className="lottie" />
          </div>
          <h1>Inscription</h1>
          <p>Bienvenue sur votre manageur de tache</p>
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
          <div className="input-group">
            <label htmlFor="password">Confirmer votre mot de passe</label>
            <input
              type="password"
              name="confirmPwd"
              id="password"
              placeholder="*******"
              min={6}
              onChange={handleChange}
              value={data.confirmPwd}
            />
          </div>
          <button type="submit" className="btn">
            {show ? <HashLoader color="#fff" size={20} /> : null}
            {!show ? "Connexion" : null}
          </button>
        </form>
        <div className="footer">
          <p>
            Avez-vous un compte ? Cliquez <Link to="/">ici</Link>{" "}
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
  overflow: hidden;

  .container {
    width: 400px;
    min-height: 400px;
    background-color: #20212c;
    border-radius: 5px;
    color: #fff;
    padding: 1rem;

    animation: slide 0.5s ease-in-out;
    @keyframes slide {
      0% {
        transform: translateY(400px);
        opacity: 0.3;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    p,
    h1,
    label {
      animation: apa 0.5s ease-in-out;

      @keyframes apa {
        0% {
          transform: translateX(200px);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }

    .header {
      text-align: center;
      .logo {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
        .lottie {
          width: 130px;
        }
      }
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
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;

        &:active {
          transform: translateY(2px);
        }
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
        .btn {
          height: 50px;
        }
      }
    }
  }
`;
