import React from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { IconPlus } from "@tabler/icons-react";
import { IconMinus } from "@tabler/icons-react";

import { addNote } from "../../redux/slices/Note";
import "./style.css";

const NewNoteForm = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [task, setTask] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const tasks = task
      .split(",")
      .map((task) => task.trim())
      .filter((task) => task !== "");
    const id = nanoid();
    dispatch(addNote({ title, tasks, id }));
    setToggle(false);
    setTask("");
    setTitle("");
  };

  return (
    <div className="newNote">
      <form onSubmit={handleSubmit} className={`${toggle && "newNoteToggle"}`}>
        <h1>Создать cписок</h1>

        <label>Название:</label>
        <input
          required
          type="text"
          placeholder="Список покупок:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="tasks">Задачи:</label>
        <textarea
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Хлеб,
Молоко,
Яйца,
Сыр"
        />
        <button type="submit">Создать</button>
      </form>
      <div
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? <IconMinus /> : <IconPlus />}
      </div>
    </div>
  );
};

export default NewNoteForm;
