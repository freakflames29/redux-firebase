import React, { useRef } from "react";
import { FireDB } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
function Addinfo() {
  let hobby = useRef();
  const userInfo = useSelector((state) => state.auth.user);

  const hobbyHandler = async () => {
    const enteredHobby = hobby.current.value;
    console.log(enteredHobby);

    const docref = doc(FireDB, "users", userInfo.uid);

    try {
      const doc = await setDoc(docref, {
        hobby: enteredHobby,
      });
      console.log("Doc added");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <label htmlFor="hobby">Hobby</label> <br />
      <input
        type="text"
        name="hobby"
        id="hobby"
        placeholder="Enter your hobby...."
        ref={hobby}
      />
      <br /> <br />
      <button onClick={hobbyHandler}>Add hobby</button>
    </div>
  );
}

export default Addinfo;
