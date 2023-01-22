import React, { useState } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import animation from "../assets/user.json";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function UserInfo() {
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    numero: "",
    tasks: [],
  });
  const [show, setShow] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * This function is used to handle the submit of the form
   * @param {form event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    console.log(data);
    if (data.nom === "" || data.prenom === "" || data.numero === "") {
      toast.error("Veuillez remplir tous les champs");
    } else {
      await setDoc(doc(db, "users", auth.currentUser.uid), data)
        .then((res) => {
          setShow(false);
          navigation("/dashboard");
        })
        .catch((error) => {
          toast.error("Une erreur est survenue");
          console.error("Error writing document: ", error);
        });
    }
  };
  return (
    <ConfirmationContainer>
      <div className="container">
        <div className="header">
          <div className="logo">
            <Lottie animationData={animation} className="lottie" />
          </div>
          <h1>Confirmation</h1>
          <p>
            Votre compte a été créé avec succès ! Veuillez configurer vos
            identifiants
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="prenom">Votre prenom </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Richard"
              min={4}
              onChange={handleChange}
              required
              value={data.prenom}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nom">Votre nom complet</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Asumani Kalyo Josué"
              min={6}
              required
              onChange={handleChange}
              value={data.nom}
            />
          </div>
          <div className="input-group">
            <label htmlFor="numero">Votre numéro :</label>
            <input
              type="tel"
              name="numero"
              id="numero"
              placeholder="+243 999 999 999"
              min={6}
              required
              onChange={handleChange}
              value={data.numero}
            />
          </div>
          <button type="submit" className="btn">
            {show ? <HashLoader color="#fff" size={20} /> : null}
            {!show ? "Valider" : null}
          </button>
        </form>
      </div>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
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
        transform: translateY(-300px);
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
      padding-bottom: 1rem;
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
