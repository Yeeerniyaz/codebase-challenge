import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = JSON.parse(localStorage.getItem("notes")) || [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        tasks: action.payload.tasks.map((task) => ({
          id: nanoid(),
          label: task,
          completed: false,
        })),
      });
      localStorage.setItem("notes", JSON.stringify(state));
      console.log(action);
    },
    deleteNote: (state, action) => {
      const newState = state.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(newState));
      return newState;
    },
    updateNote: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      state[index].title = action.payload.title;
      state[index].tasks = action.payload.tasks.map((task) => ({
        id: nanoid(),
        label: task,
        completed: false,
      }));
      localStorage.setItem("notes", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      state[index].tasks = state[index].tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
      localStorage.setItem("notes", JSON.stringify(state));
    },
    toggleTask: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      const taskIndex = state[index].tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      state[index].tasks[taskIndex].completed =
        !state[index].tasks[taskIndex].completed;
      localStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

export const { addNote, deleteNote, updateNote, toggleTask, removeTask } =
  notesSlice.actions;

export const noteReducer = notesSlice.reducer;
