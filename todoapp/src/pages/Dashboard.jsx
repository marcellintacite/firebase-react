import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import MainContent from "../Components/MainContent";
import AddTask from "../Components/AddTask";

export default function Dashboard() {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    document.title = "Tableau de bord";
    const getData = async () => {
      const docRef = doc(
        db,
        "users",
        auth.currentUser.uid
          ? auth.currentUser.uid
          : JSON.parse(localStorage.getItem("userCredintial").uid)
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
        setShow(true);
      } else {
        // doc.data() will be undefined in this case
        navigation("/confirmation");
        console.log("No such document!");
      }
    };
    getData();
  });
  return (
    <DashboardContainer>
      {show && (
        <>
          <Navbar />
          <MainContent />

          {showAdd && <AddTask />}
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
  height: 100vh;
  background-color: #17181f;
  position: relative;

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
