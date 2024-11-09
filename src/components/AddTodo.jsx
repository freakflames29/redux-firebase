import React, { useRef } from "react";
import { addTodo } from "./Todo";
import { useSelector } from "react-redux";
function AddTodo() {
  let todo = useRef();
  let status = useRef();

  const userInfo = useSelector((state) => state.auth.user);

  const todoHandler = () => {
    let todoValue = todo.current.value;
    let statusValue = status.current.checked;

    const data = {
      task: todoValue,
      status: statusValue,
    };
    addTodo(userInfo.uid, data)
      .then((data) => {
        if (data) {
          console.log("Todo added", data.id);
        } else {
          console.log("Todo not added");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <input type="text" placeholder="add todo" ref={todo} />
      <input type="checkbox" ref={status} />
      <label>Completed ?</label>
      <br />
      <br />
      <button onClick={todoHandler}>Add</button>
    </div>
  );
}

export default AddTodo;
