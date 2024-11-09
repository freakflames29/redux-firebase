import { collection, addDoc, getDocs } from "firebase/firestore";
import { FireDB } from "../firebase/config";

export function addTodo(uid, todoData) {
  const collecRef = collection(FireDB, "users", uid, "todo");

  return addDoc(collecRef, {
    task: todoData.task,
    status: todoData.status,
  });
}

export function getTodo(uid) {
  const collecRef = collection(FireDB, "users", uid, "todo");
  return getDocs(collecRef);
}
