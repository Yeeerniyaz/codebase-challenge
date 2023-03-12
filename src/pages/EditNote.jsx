import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateNote } from "../redux/slices/Note";

import "./editNote.css";

function EditNote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const note = useSelector((state) =>
    state.note.find((item) => item.id === id)
  );

  const title = note.title;
  const content = note.tasks;

  const tasks = content.map((item) => {
    return item.label;
  });

  const tasksString = tasks.join(",\n");

  const [newTitle, setNewTitle] = React.useState(title);
  const [newContent, setNewContent] = React.useState(tasksString);

  const editNote = (e) => {
    e.preventDefault();
    dispatch(
      updateNote({
        id: note.id,
        title: newTitle,
        tasks: newContent
          .split(",")
          .map((task) => task.trim())
          .filter((task) => task !== ""),
      })
    );
	navigete("/");
  };

  return (
    <div className="container">
      <div className="editNoteC">
        <h1>Редактировать</h1>
        <form className="editNote">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows="3"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
          <Link to="/">Отмена</Link>
          <button type="submit" className="btn btn-primary" onClick={editNote}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
