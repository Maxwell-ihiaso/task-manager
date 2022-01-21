import React from "react";
import TaskForm from "./TaskForm";
import { useGlobalContext } from "./context";

const Task = () => {
  const { isNew, isEdit } = useGlobalContext();

  return (
    <section className={`modal ${(isNew || isEdit) && "show-modal"}`}>
      {/* <div className={`modal-center ${(isNew || isEdit) && "show-center"}`}> */}
      <div className={`modal-center show-center`}>
        <TaskForm />
      </div>
    </section>
  );
};

// Trying to close the modal on blur using ref

export default Task;
