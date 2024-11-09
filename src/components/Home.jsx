import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/AuthSlice";
import { signOut } from "firebase/auth";
import { FireAuth, FireDB } from "../firebase/config";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import { getDoc, doc } from "firebase/firestore";
import { getTodo } from "./Todo";

function Home() {
  const userInfo = useSelector((state) => state.auth.user);
  const [hobbyLoader, setHobbyLoader] = useState(true);
  const loading = useAuthStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    signOut(FireAuth)
      .then(() => {
        dispatch(authActions.clearUser());
        console.log("Signout success");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (userInfo !== null) {
      const docref = doc(FireDB, "users", userInfo.uid);
      getDoc(docref).then((snap) => {
        if (snap.exists()) {
          dispatch(authActions.setHobby(snap.data()));
          console.log(snap.data());
          setHobbyLoader(false);
        } else {
          console.log("No hobby found");
        }
      });
    }

    return () => {};
  }, [userInfo]);

  const [todos, setTodos] = useState(null);

  function loadMytodo() {
    getTodo(userInfo.uid)
      .then((snapshot) => {
        if (!snapshot.empty) {
          setTodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );

          console.log(todos);
        } else {
          console.log("No todo");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      {userInfo == null ? (
        <h1>
          Please <Link to="/login">Login</Link> to continue
        </h1>
      ) : (
        <div>
          <h1>Hello, {userInfo.displayName} !! </h1>
          <h2>
            Hobby: {hobbyLoader ? <span>fetching...</span> : userInfo.hobby}{" "}
          </h2>

          <br />

          {todos
            ? todos.map((todo) => (
                <>
                  <table border="2px">
                    <td>{todo.id}</td>
                    <td>{todo.task}</td>
                    <td>{todo.status ? "Done" : "Not done"}</td>
                  </table>
                </>
              ))
            : ""}

          <button onClick={loadMytodo}>Load my todo</button>

          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Home;
