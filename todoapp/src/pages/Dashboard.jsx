import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import MainContent from "../Components/MainContent";
import AddTask from "../Components/AddTask";
import moment from "moment";

export default function Dashboard() {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState(false);
  const [activeDash, setActiveDash] = useState(false);
  const [userItems, setUserItems] = useState([]);

  const uid = JSON.parse(localStorage.getItem("userCredintial")).uid;
  const getData = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem("user", JSON.stringify(docSnap.data()));
      setUserItems(docSnap.data().tasks);
      setShow(true);
    } else {
      // doc.data() will be undefined in this case
      navigation("/confirmation");
      console.log("No such document!");
    }
  };

  useEffect(() => {
    document.title = "Tableau de bord";
    getData();
  }, []);
  return (
    <DashboardContainer showAdd={popup}>
      {show && (
        <>
          <Navbar
            setShow={setPopup}
            setActiveDash={setActiveDash}
            active={activeDash}
            userItems={userItems}
          />
          <MainContent active={activeDash} userItems={userItems} />

          <AddTask showAdd={popup} setShowAdd={setPopup} />
        </>
      )}
      {!show && (
        <div className="loader">
          <ScaleLoader color="#fff" />
          <p>Veuillez patienter</p>
        </div>
      )}
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  background-color: #17181f;
  position: relative;
  min-height: 100vh;

  .loader {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    p {
      padding-top: 20px;
    }
  }
`;
