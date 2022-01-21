import React from "react";
import { Link } from "react-router-dom";
import { GrAdd, GrTrash, GrEdit } from "react-icons/gr";
import { useGlobalContext } from "./context";

const Tasklist = () => {
  const { tasks, addNew, openEdit, del } = useGlobalContext();
  // const handleListEdit = (id) => {
  //   setParam("");
  //   console.log("setting listID in state");
  //   setListID(id);
  //   setIsEdit(true);
  //   console.log(`id has been set completely`);
  // };

  if (tasks.length === 0) {
    return (
      <section className="tasklist">
        <div className="tasklist-center">
          <p>click the button below to create your first task list!</p>
        </div>
        <div className="add-list add-task" onClick={() => addNew()}>
          <GrAdd />
          <p>add new list</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tasklist">
      <div className="tasklist-center">
        {/* get all list that are yet to be completed and style uniquely  */}
        {tasks
          .filter((task) => task.isCompleted === false)
          .map((task) => {
            const { id, title } = task;
            if (!task) {
              return <h3>You do not have any pending task</h3>;
            }
            return (
              <section className="tasks" key={id}>
                <Link to={`/list/${id}`}>
                  <p>{title}</p>
                </Link>
                <div className="task-control">
                  <button
                    type="button"
                    className="btn task-btn"
                    onClick={() => openEdit(id)}
                  >
                    <GrEdit className="edit-btn" />
                  </button>
                  <button
                    type="button"
                    className="btn task-btn"
                    onClick={() => del(id)}
                  >
                    <GrTrash className="delete-btn" />
                  </button>
                </div>
              </section>
            );
          })}

        {/* get all list that are completed and not deleted yet and style uniquely */}
        {tasks
          .filter((task) => task.isCompleted === true)
          .map((task) => {
            const { id, title } = task;
            return (
              task && (
                <div className=" tasks completed-task" key={id}>
                  <p>{title}</p>

                  <div className="task-control">
                    <button
                      type="button"
                      className="btn task-btn"
                      onClick={() => openEdit(id)}
                    >
                      <GrEdit className="edit-btn" />
                    </button>
                    <button
                      type="button"
                      className="btn task-btn"
                      onClick={() => del(id)}
                    >
                      <GrTrash className="delete-btn" />
                    </button>
                  </div>
                </div>
              )
            );
          })}
      </div>

      <div className="add-list add-task" onClick={() => addNew()}>
        <GrAdd />
        <p>add new list</p>
      </div>
    </section>
  );
};

export default Tasklist;
