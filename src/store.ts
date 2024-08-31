import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";


export type Note = {
  userNoteTitle: string,
  userNoteDescription: string
}

type NotesState = {
  notes: Array<Note>;
};

enum NoteActionTypes {
  ADD_NOTE = "ADD_NOTE",
  CLEAR_NOTES = "CLEAR_NOTES",
}

export const addNote = (note: Note) => ({ type: NoteActionTypes.ADD_NOTE, payload: note });
export const clearNotes = () => ({ type: NoteActionTypes.CLEAR_NOTES });

const initialState: NotesState = {
  notes: [],
};

function notesReducer(state = initialState, action: { type: NoteActionTypes, payload: Note }): NotesState {
  switch (action.type) {
    case NoteActionTypes.ADD_NOTE: {
      if (action.payload != null) {
        return { notes: [action.payload, ...state.notes] };
      }
      return state;
    }
    case NoteActionTypes.CLEAR_NOTES:
      return initialState;
    default:
      return state;
  }
}

//store
export const store = configureStore({
  reducer: notesReducer,
});

// typescript recomandations
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
