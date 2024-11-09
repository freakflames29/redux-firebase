import React from "react";
import { FireAuth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/AuthSlice";
function Login() {
  const gauth = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const loginHandler = () => {
    signInWithPopup(FireAuth, gauth)
      .then((result) => {
        console.log(result.user.displayName);

        dispatch(
          authActions.setUser({
            email: result.user.email,
            displayName: result.user.displayName,
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

  return (
    <>
      <button onClick={loginHandler}>Login with google</button>
      <button onClick={signoutHandler}>Logout</button>
    </>
  );
}

export default Login;
