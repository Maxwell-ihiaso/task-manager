import React, { useState, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";

const AppContext = React.createContext();

const localTask = () => {
  const taskInLocal = JSON.parse(localStorage.getItem("task"));
  if (taskInLocal) {
    return taskInLocal;
  }
  return [];
};

const initialState = {
  tasks: localTask(),
  pushedLocal: false,
  isNew: false,
  isEdit: false,
  isDelete: false,
  isShowAlert: false,
  isCompleted: false,
  listID: "",
  taskID: "",
};

export const AppProvider = ({ children }) => {
  const [taskInput, setTaskInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const openEdit = (listID, taskID = "") => {
    dispatch({ type: "OPEN_EDIT", payload: { listID, taskID } });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const addNew = (id = "") => {
    dispatch({ type: "ADD_NEW", payload: id });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const cleanID = () => {
    dispatch({ type: "CLEAN_ID" });
  };

  const edit = () => {
    dispatch({ type: "EDIT" });
  };

  const del = (listID, taskID) => {
    dispatch({ type: "DELETE", payload: { listID, taskID } });
  };

  //   function to fetch all list on initial app render
  // const fetchAllTask = async () => {
  //   const allTasks = await axios
  //     .get("https://localhost:4000/api/v1/tasks")
  //     .then((result) => result.data)
  //     .catch((err) => console.log(err));
  //   setTasks(allTasks);
  // };

  const fetchAllLocalTask = async () => {
    const taskInLocal = await JSON.parse(localStorage.getItem("task"));

    if (taskInLocal) {
      dispatch({ type: "DISPLAY_LIST", payload: taskInLocal });
      // setTasks(allLocalTask);
    } else {
      dispatch({ type: "DISPLAY_LIST", payload: [] });
      // setTasks([]);
    }
  };

  //   useEffect calls the fetch function only on first render
  useEffect(() => {
    // fetchAllTask();
    fetchAllLocalTask();
  }, [state.pushedLocal]);

  return (
    <AppContext.Provider
      value={{
        taskInput,
        setTaskInput,
        ...state,
        openEdit,
        edit,
        addNew,
        reset,
        cleanID,
        closeModal,
        del,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
