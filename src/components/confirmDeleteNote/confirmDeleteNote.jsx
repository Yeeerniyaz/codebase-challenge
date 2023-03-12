import React from "react";
import { useDispatch } from "react-redux";

import "./style.css";
import { deleteNote } from "../../redux/slices/Note";

function ConfirmDeleteNote({
  note,
  showConfirmDeleteNote,
  setShowConfirmDeleteNote,
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    setShowConfirmDeleteNote(false);
  };

  const handleCancel = () => {
    setShowConfirmDeleteNote(false);
  };

  return (
    <div className={`confirmDeleteNote ${!showConfirmDeleteNote && "hidden"}`}>
      <div>
        <h1>Вы уверены что хотите удалить заметку?</h1>
        <p>Заметка будет удалена безвозвратно</p>
        <p>Название: {note.title}</p>
        <div>
          <button
            onClick={() => {
              handleCancel();
            }}
          >
            Нет
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteNote;
