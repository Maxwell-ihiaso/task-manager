import React from "react";
import axios from "axios";
import { v4 as genID } from "uuid";
import { useGlobalContext } from "./context";

const TaskForm = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const { isNew, isEdit, listID, taskID, reset, closeModal } =
    useGlobalContext();
  const inputContainer = React.useRef(null);
  const checkedContainer = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("listID: ", listID, "taskID: ", taskID);

    const list = inputContainer.current.value;
    const isCompleted = isChecked;
    const action = inputContainer.current.name;
    const itemInLocal = JSON.parse(localStorage.getItem("task"));

    if (action === "edit") {
      // setTaskList({ list, isCompleted, listID, workingID });

      // GET THE LIST THAT USER CLICKS
      console.log("attempting to edit content...");
      if (taskID) {
        const newItemInLocal = itemInLocal.map((items) => {
          if (items.id === listID) {
            return {
              ...items,
              tasks: items.tasks.map((tempTask) => {
                if (tempTask.id === taskID) {
                  return { ...tempTask, title: list, isCompleted };
                }
                return tempTask;
              }),
            };
          }
          return items;
        });
        localStorage.setItem("task", JSON.stringify(newItemInLocal));
      } else {
        const newItemInLocal = itemInLocal.map((items) => {
          if (items.id === listID) {
            return { ...items, title: list, isCompleted };
          }
          return items;
        });
        localStorage.setItem("task", JSON.stringify(newItemInLocal));
      }
    }

    // -------------------HANDLE ADD NEW TASK-------------
    if (action === "add") {
      if (itemInLocal && listID) {
        // add the new task to the existig unique list
        itemInLocal
          .filter((list) => list.id === listID)[0]
          .tasks.push({
            id: genID(),
            title: list,
            isCompleted,
          });
        localStorage.setItem("task", JSON.stringify(itemInLocal));
      } else if (itemInLocal) {
        itemInLocal.push({
          id: genID(),
          title: list,
          isCompleted,
          tasks: [],
        });

        localStorage.setItem("task", JSON.stringify(itemInLocal));
      } else {
        localStorage.setItem(
          "task",
          JSON.stringify([
            {
              id: genID(),
              title: list,
              isCompleted,
              tasks: [],
            },
          ])
        );
      }
      // setTaskList({ list, listID, workingID });
    }
    reset();
    return;
  };

  /***************
   * FOCUS THE CURSOR IN THE INPUT BOX on
   * taskform call
   ***************/
  React.useEffect(() => {
    if (isNew || isEdit) {
      inputContainer.current.focus();
    }
  }, [isNew, isEdit]);

  /***************
   * POPULATE DATE IN EDIT FIELD on
   * taskform call
   **************  */
  React.useEffect(() => {
    // -----------GET UNIQUE TASK
    if (taskID && listID && isEdit) {
      const selectedList = JSON.parse(localStorage.getItem("task")).filter(
        (list) => list.id === listID
      );
      const selectedTask = selectedList[0].tasks.filter(
        (task) => task.id === taskID
      );
      inputContainer.current.value = selectedTask[0].title;
      setIsChecked(selectedTask[0].isCompleted);
    }

    // ------------GET UNIQUES LIST
    else if (listID && isEdit) {
      const selectedList = JSON.parse(localStorage.getItem("task")).filter(
        (list) => list.id === listID
      );
      inputContainer.current.value = selectedList[0].title;
      setIsChecked(selectedList[0].isCompleted);
    }
  }, [listID, taskID, isEdit]);

  // ===========FUNCTION TO POST DATA GIVEN URL AND DATA TO BE POSTED=============
  // const postData = React.useCallback(
  //   async (url, taskList) => {
  //     const newList = await axios
  //       .post(url, taskList)
  //       .then((result) => result.data)
  //       .catch((err) => console.log(err));

  //     setTasks(newList);
  //   },
  //   [setTasks]
  // );

  // React.useEffect(() => {
  //   postData("https://localhost:4000/api/v1/tasks", taskList);
  // }, [taskList, postData]);

  /***********************
   * DISPLAY SECTION
   *************************/
  if (isEdit) {
    return (
      <section className="task-form">
        <button type="button" className="close-btn" onClick={closeModal}>
          x
        </button>
        <form className="form-center" onSubmit={handleSubmit}>
          <div className="form-header">
            <p>{`Edit your ${taskID ? "task" : "list"}`}</p>
          </div>
          <div className="form-footer">
            <input
              className="form-input"
              name="edit"
              type="text"
              ref={inputContainer}
            />
            <div className="isCompleted">
              <label className="completed-container">
                completed task?
                <input
                  type="checkbox"
                  checked={isChecked}
                  ref={checkedContainer}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <button className="btn" type="submit">
              {`${isChecked ? "mark as completed" : "edit task"}`}
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
    isNew && (
      <section className="task-form">
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
        <form className="form-center" onSubmit={handleSubmit}>
          <div className="form-header">
            <p>what would you like to do?</p>
          </div>
          <div className="form-footer">
            <input
              className="form-input"
              name="add"
              type="text"
              ref={inputContainer}
            />
            <button className="btn" type="submit">
              {`add ${taskID ? "task" : "list"}`}
            </button>
          </div>
        </form>
      </section>
    )
  );
};

export default TaskForm;
