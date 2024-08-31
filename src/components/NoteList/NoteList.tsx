import styles from './NoteList.module.css';
import { Component, PropsWithChildren } from "react";

type Props = PropsWithChildren<{ title: string }>

class NoteList extends Component<Props> {
  #title: string = '';

  get title() {
    return `***${this.#title}***`;
  }

  set title(value) {
    const cleaned = value.replace(/[0-9\s]+/g, '');
    this.#title = !cleaned ? 'No title' : cleaned;
  }

  render() {
    this.title = this.props.title;
    return (
      <>
        <h2>{this.title}</h2>
        <ul className={styles.note_list}>
          {this.props.children}
        </ul>
      </>
    );
  }
}

export default NoteList;
