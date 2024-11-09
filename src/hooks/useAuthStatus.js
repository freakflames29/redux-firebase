import { onAuthStateChanged } from "firebase/auth";
import { authActions } from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FireAuth } from "../firebase/config";
const useAuthStatus = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(FireAuth, (user) => {
      if (user) {
        dispatch(
          authActions.setUser({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
          })
        );

        console.log("User logged in ");
        setLoading(false);
      } else {
        dispatch(authActions.clearUser(null));
        console.log("User logged out ");
        setLoading(false);
      }
    });

    return () => unsub();
  }, [dispatch]);

  return loading;
};

export default useAuthStatus;
