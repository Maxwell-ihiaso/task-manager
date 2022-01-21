import { stringify } from "uuid";

const reducer = (state, action) => {
  if (action.type === "DISPLAY_LIST") {
    return { ...state, tasks: action.payload };
  }

  if (action.type === "OPEN_EDIT") {
    return {
      ...state,
      listID: action.payload.listID,
      taskID: action.payload.taskID,
      isEdit: true,
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, isEdit: false, isNew: false };
  }

  if (action.type === "ADD_NEW") {
    if (action.payload) {
      return { ...state, isNew: !state.isNew, listID: action.payload };
    }
    return { ...state, isNew: !state.isNew };
  }

  if (action.type === "RESET") {
    return {
      ...state,
      isEdit: false,
      isNew: false,
      listID: "",
      taskID: "",
      pushedLocal: !state.pushedLocal,
    };
  }

  if (action.type === "CLEAN_ID") {
    return { ...state, taskID: "", listID: "" };
  }

  if (action.type === "DELETE") {
    const locTask = JSON.parse(localStorage.getItem("task"));
    if (action.payload.taskID) {
      const tempTask = locTask.map((task) => {
        if (task.id === action.payload.listID) {
          return {
            ...task,
            tasks: task.tasks.filter(
              (ntask) => ntask.id !== action.payload.taskID
            ),
          };
        }
        return task;
      });
      localStorage.setItem("task", JSON.stringify(tempTask));
      return {
        ...state,
        tasks: tempTask,
      };
    } else {
      const tempTask = locTask.filter(
        (task) => task.id !== action.payload.listID
      );
      localStorage.setItem("task", JSON.stringify(tempTask));

      return {
        ...state,
        tasks: tempTask,
      };
    }
  }
  return state;
};

export default reducer;
