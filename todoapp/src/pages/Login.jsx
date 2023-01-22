import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import Lottie from "lottie-react";
import animation from "../assets/todo.json";
import { HashLoader } from "react-spinners";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
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
    setShow(true);
    if (data.email === "" || data.password === "") {
      toast.error("Veuillez remplir tous les champs");
      setShow(false);
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          localStorage.setItem("userCredintial", JSON.stringify(user));
          setShow(false);
          navigate("/dashboard");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if (errorCode === "auth/wrong-password") {
            toast.error("Mot de passe incorect");
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
          if (errorCode === "auth/user-not-found") {
            toast.error("L'utilisateur n'existe pas");
            setShow(false);
          }
        });
    }
    console.log(data);
  };
  return (
    <LoginStyle>
      <div className="container">
        <div className="header">
          <div className="logo">
            <Lottie animationData={animation} className="lottie" />
          </div>
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
            {show && <HashLoader color="#fff" size={20} />}
            {!show && "Connexion"}
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
    animation: slide 0.5s ease-in-out;
    @keyframes slide {
      0% {
        transform: translateY(-200px);
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
          transform: translateX(-200px);
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
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
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
        button: {
          height: 50px;
        }
      }
    }
  }
`;
