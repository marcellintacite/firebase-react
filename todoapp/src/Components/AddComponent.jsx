import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../services/firebase";
import Lottie from "lottie-react";
import success from "../assets/success.json";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddComponent() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    titre: "",
    description: "",
    done: false,
    date: "",
    time: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleChange = (e) => {
    const ndata = { ...data, [e.target.name]: e.target.value };
    setData(ndata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uid = JSON.parse(localStorage.getItem("userCredintial")).uid;
    const usersRef = doc(db, "users", uid);

    // // Atomically add a new region to the "regions" array field.
    await updateDoc(usersRef, {
      tasks: arrayUnion(data),
    })
      .then(() => {
        setShowSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setShowSuccess(false);
          setShow(false);
        }, 4000);

        setData({
          titre: "",
          description: "",
          done: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Une erreur est survenue");
      });
  };
  return (
    <AddStyled>
      <div className="button" onClick={() => setShow(!show)}>
        <div className="icon">
          <i className={show ? "fa fa-caret-down" : "fa fa-plus"}></i>
        </div>
        <p>Ajouter une tache</p>
      </div>
      {show && (
        <div className="input">
          {showSuccess && (
            <div className="success">
              <Lottie animationData={success} color="#fff" className="su" />
            </div>
          )}

          {!showSuccess && (
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="form_group">
                <label htmlFor="titre">Tache</label>
                <input
                  type="text"
                  placeholder="Faire la course"
                  name="titre"
                  onChange={(e) => handleChange(e)}
                  value={data.titre}
                />
              </div>
              <div className="form_group">
                <label htmlFor="task">Description</label>
                <textarea
                  placeholder="test"
                  rows={5}
                  name="description"
                  value={data.description}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>

              <div className="form_group">
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  placeholder="YY-DD-MM"
                  value={data.date}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button type="submit">
                {!loading && "Ajouter la tache"}
                {loading && <HashLoader color="#fff" size={20} />}
              </button>
            </form>
          )}
        </div>
      )}
    </AddStyled>
  );
}
const AddStyled = styled.div`
  width: 100%;

  .success {
    width: 80%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .su {
      width: 150px;
    }
  }
  .button {
    width: 100%;
    cursor: pointer;
    display: flex;
    height: 45px;
    align-items: center;
    border: 1px solid #f07aa266;
    padding: 5px 15px;
    border-radius: 10px;
    margin-top: 1rem;
    p {
      color: #fff;
    }
    .icon {
      width: 25px;
      height: 25px;
      margin-right: 10px;

      i {
        font-size: 14px;
      }
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f07aa2;
    }
  }
  .input {
    margin-top: 10px;
    animation: opa 0.5s ease-in-out;
    border: 1px solid #3334;
    border-radius: 5px;
    @keyframes opa {
      from {
        opacity: 0;
        transform: translateY(200px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    form {
      width: 100%;
      padding: 10px;

      .form_group {
        color: #fff;
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        flex-direction: column;
        gap: 5px;
        input,
        textarea {
          width: 100%;
          padding: 15px 15px;
          border-radius: 5px;
          border: none;
          outline: none;
          background-color: #20212c;
          color: #fff;
          resize: none;
        }
      }
      button {
        width: 100%;
        padding: 12px 15px;
        border-radius: 5px;
        margin-top: 0.7rem;
        background-color: #a077c0;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
`;
