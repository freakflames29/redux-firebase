import React, { useEffect } from "react";
import { FireAuth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/AuthSlice";
import { FireDB } from "../firebase/config";
import { setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const gauth = new GoogleAuthProvider();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);

  const loginHandler = () => {
    signInWithPopup(FireAuth, gauth)
      .then((result) => {
        console.log(result.user.displayName);

        dispatch(
          authActions.setUser({
            email: result.user.email,
            displayName: result.user.displayName,
            uid: result.user.uid,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signoutHandler = () => {
    signOut(FireAuth)
      .then((msg) => {
        console.log("Signoutout succesfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // to navigate if login and also it restricts users to visit login page if login

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  return (
    <>
      <button onClick={loginHandler}>Login with google</button>
    </>
  );
}

export default Login;
