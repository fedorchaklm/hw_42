import styles from "./App.module.css";
import { useEffect, useState } from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteItem from "./components/NoteItem/NoteItem";
import { clearNotes, useAppDispatch, useAppSelector } from "./store";
import NotesForm from "./components/NotesForm/NotesForm";

function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string>("");
  const notes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch(() => setError("Something went wrong"));
  }, []);

  if (error) {
    return <p className={styles.error_info}>Error: {error} </p>;
  }

  if (!user) {
    return <p className={styles.loading_info}>Loading...</p>;
  }

  return (
    <div className={styles.app}>
      <p className={styles.user_info}>
        UserName: <b>{user.name}</b>
      </p>
      <h1>Your notesList</h1>
      <NotesForm />
      {notes.length === 0 ? (
        <p className={styles.notes_wrap}>There are no notes</p>
      ) : (
        <>
          <NoteList title="Notes">
            {notes.map((note, index) => (
              <NoteItem note={note} key={index} />
            ))}
          </NoteList>
          <button
            className={styles.clearBtn}
            onClick={() => dispatch(clearNotes())}
          >
            Delete notes
          </button>
        </>
      )}
    </div>
  );
}

export default App;
