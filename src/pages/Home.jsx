import React from "react";
import { useSelector } from "react-redux";
import NewNoteForm from "../components/NewNoteForm/NewNoteForm";
import Notes from "../components/Notes/Note";

import "./home.css";

function Home() {
  const notes = useSelector((state) => state.note);

  const NotesMap = () => {
    return notes.map((item) => {
      return <Notes note={item} key={item.id} />;
    });
  };

  return (
    <div className="container">
      <div className="home">
        <h1>Заметкий</h1>
        <div className="notes">
          <NotesMap />
        </div>
      </div>
      <NewNoteForm />
    </div>
  );
}

export default Home;
