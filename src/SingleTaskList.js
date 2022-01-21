import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrTrash, GrEdit, GrAdd } from "react-icons/gr";
import { useGlobalContext } from "./context";

const SingleTaskList = () => {
  const { tasks, openEdit, addNew, del } = useGlobalContext();
  const { id } = useParams();

  //   use the unique list id to fetch all task in that list
  // const fetchListTasks = useCallback(async () => {
  //   const newUniqueTasks = await axios
  //     .get(`https://localhost:4000/api/v1/tasks/${id}`)
  //     .then((result) => result.data)
  //     .catch((err) => console.log(err));

  //   setUniqueTasks(newUniqueTasks);
  // }, [id, setUniqueTasks]);

  //   useEffect initiates the fetch function on id changes
  // useEffect(() => {
  //     fetchListTasks()
  // }, [id, fetchListTasks]);

  const isNotCompletedTasks = tasks
    .filter((task) => task.id === id)[0]
    .tasks.filter((task) => task.isCompleted === false);

  const isCompletedTasks = tasks
    .filter((task) => task.id === id)[0]
    .tasks.filter((task) => task.isCompleted === true);

  if (isNotCompletedTasks.length === 0 && isCompletedTasks.length !== 0) {
    return (
      <section className="tasklist">
        <div className="tasklist-center">
          <p>You do not have any pending task!</p>
          {isCompletedTasks.map((uniqueTask) => {
            const { id: taskID, title } = uniqueTask;
            return (
              uniqueTask && (
                <div className=" tasks completed-task" key={taskID}>
                  <p>{title}</p>
                  <div className="task-control">
                    <button
                      className="btn task-btn"
                      onClick={() => openEdit(id, taskID)}
                    >
                      <GrEdit className="edit-btn" />
                    </button>
                    <button
                      className="btn task-btn"
                      onClick={() => del(id, taskID)}
                    >
                      <GrTrash className="delete-btn" />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="add-list add-task" onClick={() => addNew(id)}>
          <GrAdd />
          <p>add new task</p>
        </div>
      </section>
    );
  } else if (isNotCompletedTasks.length === 0) {
    return (
      <section className="tasklist">
        <div className="tasklist-center">
          <p>You do not have any pending task</p>
        </div>
        <div className="add-list add-task" onClick={() => addNew(id)}>
          <GrAdd />
          <p>add new task</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tasklist">
      <div className="tasklist-center">
        {isNotCompletedTasks.map((uniqueTask) => {
          const { id: taskID, title } = uniqueTask;
          return (
            <section className="tasks" key={taskID}>
              <p>{title}</p>
              <div className="task-control">
                <button
                  className="btn task-btn"
                  onClick={() => openEdit(id, taskID)}
                >
                  <GrEdit className="edit-btn" />
                </button>
                <button
                  className="btn task-btn"
                  onClick={() => del(id, taskID)}
                >
                  <GrTrash className="delete-btn" />
                </button>
              </div>
            </section>
          );
        })}
        {isCompletedTasks.map((uniqueTask) => {
          const { id: taskID, title } = uniqueTask;
          return (
            uniqueTask && (
              <div className=" tasks completed-task" key={taskID}>
                <p>{title}</p>
                <div className="task-control">
                  <button
                    className="btn task-btn"
                    onClick={() => openEdit(id, taskID)}
                  >
                    <GrEdit className="edit-btn" />
                  </button>
                  <button
                    className="btn task-btn"
                    onClick={() => del(id, taskID)}
                  >
                    <GrTrash className="delete-btn" />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
      <div className="add-list add-task" onClick={() => addNew(id)}>
        <GrAdd />
        <p>add new task</p>
      </div>
    </section>
  );
};

export default SingleTaskList;
