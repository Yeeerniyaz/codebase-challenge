import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IconTrash, IconPencil } from "@tabler/icons-react";

import "./style.css";
import ConfirmDeleteNote from "../confirmDeleteNote/confirmDeleteNote";
import { removeTask, toggleTask } from "../../redux/slices/Note";

export default function Note({ note }) {
  const [showConfirmDeleteNote, setShowConfirmDeleteNote] =
    React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTask = (id) => {
    dispatch(removeTask({ id: note.id, taskId: id }));
  };

  const compledTask = (id) => {
    dispatch(toggleTask({ id: note.id, taskId: id }));
  };

  const tasks = note.tasks;
  const TasksMap = () => {
    return tasks.map((item) => {
      return (
        <li key={item.id}>
          <div>
            <p className={`${item.completed && "true"}`}>{item.label}</p>
            <div>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  compledTask(item.id);
                }}
              />
              <IconTrash
                size="1.2rem"
                onClick={() => {
                  deleteTask(item.id);
                }}
              />
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="note">
      <div className="header">
        <h3>{note.title}</h3>
        <div>
          <IconPencil
            size="1.7rem"
            onClick={() => {
              navigate(`/edit/${note.id}`);
            }}
          />
          <IconTrash
            size="1.7rem"
            onClick={() => {
              setShowConfirmDeleteNote(true);
            }}
          />
          <ConfirmDeleteNote
            note={note}
            showConfirmDeleteNote={showConfirmDeleteNote}
            setShowConfirmDeleteNote={setShowConfirmDeleteNote}
          />
        </div>
      </div>
      <ul>
        <TasksMap />
      </ul>
    </div>
  );
}
