import React, { useState } from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../services/firebase";
import Lottie from "lottie-react";
import success from "../assets/success.json";

export default function AddTask({ showAdd, setShowAdd }) {
  const [loading, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState({
    titre: "",
    description: "",
    done: false,
    time: new Date(),
  });

  const handleChange = (e) => {
    const ndata = { ...data, [e.target.name]: e.target.value };
    setData(ndata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    const uid = JSON.parse(localStorage.getItem("userCredintial")).uid;
    const usersRef = doc(db, "users", uid);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(usersRef, {
      tasks: arrayUnion(data),
    }).then(() => {
      setShow(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowAdd(false);
      }, 3000);
      setData({
        titre: "",
        description: "",
        done: false,
      });
    });
  };
  return (
    <>
      {showAdd && (
        <StyledAdd>
          <div className="container">
            {showSuccess && (
              <div className="success">
                <Lottie animationData={success} color="#fff" size={20} />
              </div>
            )}
            {!showSuccess && (
              <div>
                <h2>Ajouter une tache</h2>
                <form action="" onSubmit={handleSubmit}>
                  <div className="form_group">
                    <label htmlFor="titre">Titre tache</label>
                    <input
                      type="text"
                      name="titre"
                      id=""
                      placeholder="partir à l'eglise"
                      value={data.titre}
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="description">Déscription de la tache</label>
                    <textarea
                      type="text"
                      name="description"
                      id=""
                      placeholder="Ceci est un exemple"
                      value={data.description}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <button type="submit">
                    {!loading && "Enreigistrer"}
                    {loading && <HashLoader color="#fff" size={20} />}
                  </button>
                </form>
              </div>
            )}
            <div className="close" onClick={() => setShowAdd(false)}>
              <span className="fa fa-times"></span>
            </div>
          </div>
        </StyledAdd>
      )}
    </>
  );
}

const StyledAdd = styled.div`
  width: 400px;
  margin: auto;
  height: 0;
  display: flex;
  background-color: #20212c;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: apa 0.3s ease-in;
  padding-bottom: 1rem;
  height: 440px;

  @keyframes apa {
    0% {
      height: 0;
    }
    100% {
      height: 500px;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 10px;
    .close {
      background: linear-gradient(90deg, #f1769d 0%, #961883 100%);
      position: absolute;
      cursor: pointer;
      color: #fff;
      top: -20px;
      right: -10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      text-align: center;
      color: #fff;
      padding: 10px;
      padding-top: 20px;
    }
    form {
      width: 90%;
      margin: auto;
      margin-top: 1rem;
      color: #fff;
      .form_group {
        margin-top: 1rem;
        input,
        textarea {
          width: 100%;
          height: 40px;
          margin-top: 0.3rem;
          border: none;
          outline: none;
          border-radius: 5px;
          padding: 0 0.4rem;
          background-color: #17181f;
          color: #fff;
        }
        textarea {
          height: 150px;
          padding: 10px;
          resize: none;
        }
      }
      button {
        width: 100%;
        margin-top: 15px;
        height: 45px;
        background-color: #f1769d;
        color: #fff;
        border: none;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .load {
          width: 20px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 95%;
    .container {
      padding: 0;
      form {
        width: 95%;
        .form_group {
          input {
            height: 50px;
          }
        }
      }
    }
  }
`;
