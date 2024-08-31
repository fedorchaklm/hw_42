import { ErrorMessage, Field, Form, Formik } from "formik";
import { addNote, Note, useAppDispatch } from "../../store";
import * as y from "yup";
import styles from "./NotesForm.module.css";

type Params = {
  resetForm: () => void;
};

export default function NotesForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: Note, { resetForm }: Params) => {
    dispatch(addNote(values));
    resetForm();
  };

  const NotesValidationScheme = y.object().shape({
    userNoteTitle: y
      .string()
      .min(2, "At least 2 chars required")
      .max(10, "Title should be less 10 chars")
      .required("This field is required"),
    userNoteDescription: y
      .string()
      .min(5, "At least 5 chars required")
      .max(50, "Title should be less 50 chars")
      .required("This field is required"),
  });

  return (
    <Formik
      initialValues={{ userNoteTitle: "", userNoteDescription: "" }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={NotesValidationScheme}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              type="text"
              name="userNoteTitle"
              placeholder="Enter the title of note"
              className={
                errors.userNoteTitle && touched.userNoteTitle
                  ? styles.input__error
                  : ""
              }
            />
          </div>
          <ErrorMessage
            name={"userNoteTitle"}
            component="div"
            className={styles.error__message}
          />
          <div>
            <Field
              type="text"
              name="userNoteDescription"
              placeholder="Enter the description of note"
              className={
                errors.userNoteDescription && touched.userNoteDescription
                  ? styles.input__error
                  : ""
              }
            />
          </div>
          <ErrorMessage
            name={"userNoteDescription"}
            component="div"
            className={styles.error__message}
          />
          <button type="submit">Add</button>
        </Form>
      )}
    </Formik>
  );
}
