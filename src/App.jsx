import "./App.css";
import { FireAuth } from "./firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";

import { useSelector } from "react-redux";
import useAuthStatus from "./hooks/useAuthStatus";
import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Addinfo from "./components/Addinfo";
import AddTodo from "./components/AddTodo";
function App() {
  const userInfo = useSelector((state) => state.auth.user);

  const loadingStatus = useAuthStatus();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/addinfo",
          element: <Addinfo />,
        },
        {
          path: "/addtodo",
          element: <AddTodo />,
        },
      ],
    },
  ]);

  if (loadingStatus) {
    return <div>Loading....</div>;
  }

  // return <>{userInfo ? <Home /> : <Login />}</>;
  return <RouterProvider router={router} />;
}

export default App;
