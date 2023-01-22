import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Signout() {
  useEffect(() => {
    localStorage.removeItem("userCredintial");
    localStorage.removeItem("user");
    signOut(auth);
    window.location.replace("/");
  });
  return null;
}
