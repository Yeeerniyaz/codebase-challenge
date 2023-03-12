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

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const tasks = event.target.tasks.value
      .split(",")
      .map((task) => task.trim())
      .filter((task) => task !== "");
    const id = nanoid();
    dispatch(addNote({ title, tasks, id }));
  };

  return (
    <div className="newNote">
      <form onSubmit={handleSubmit} className={`${toggle && "newNoteToggle"}`}>
        <h1>Создать заметку</h1>

        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Список покупок:"
        />
        <label htmlFor="tasks">Задачи:</label>
        <textarea
          id="tasks"
          name="tasks"
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
