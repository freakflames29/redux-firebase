import "./App.css";
import { FireApp, FireAuth } from "./firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import { useSelector } from "react-redux";
function App() {
  const userInfo = useSelector((state) => state.auth.user);

  return <>{userInfo ? <h1>Hello {userInfo.displayName}</h1> : <Login />}</>;
}

export default App;
