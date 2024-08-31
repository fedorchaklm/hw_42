import { Note } from "../../store";
import styles from "./NoteItem.module.css";

type Props = {
  note: Note;
};

function NoteItem({ note }: Props) {
  return (
    <li className={styles.item}>
      <p className={styles.item__title}>
        <b>Title:</b> {note.userNoteTitle}
      </p>
      <p className={styles.item__description}>
        <b>Description:</b> {note.userNoteDescription}
      </p>
    </li>
  );
}

export default NoteItem;
