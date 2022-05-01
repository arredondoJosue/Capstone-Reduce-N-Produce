import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import "../styles/NewNote.scss";

export default function NewNote() {
  // CREATE NEW NOTE
  // note_title, note_text, note_timestamp, note_author_id, note_shared_with

  return (
    <div className="new-note">
      {/* <div className="new-note-header">
        <h3 className="new-note-title">Add New Task</h3>
      </div> */}
      <div className="new-note-body">
        <Formik
          initialValues={{
            noteTitle: "",
            noteText: "",
            sharedWith: "",
            user_id: 1,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              axios
                .post("http://localhost:5000/api/v1/notes/new-note", values)
                .then((res) => {
                  console.log(res);
                })
                .then(() => {
                  axios
                    .get(`http://localhost:5000/api/v1/tasks/${1}`)
                    .then((res) => {
                      setTasks(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  // setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="new-note-form">
              <div className="new-note-form">
                <div className="new-note-form-section-top">
                  <div className="new-note-form-field">
                    <label
                      className="new-note-form-field-label"
                      htmlFor="noteTitle"
                    >
                      Title
                    </label>
                    <Field
                      className="new-note-form-title"
                      type="text"
                      name="noteTitle"
                    />
                  </div>
                </div>

                <div className="new-note-form-section-bottom">
                  <div className="new-note-form-section-top">
                    <div className="new-note-form-field">
                      <label
                        className="new-note-form-field-label"
                        htmlFor="noteText"
                      >
                        Description
                      </label>
                      <Field
                        className="new-note-form-description"
                        as="textarea"
                        name="noteText"
                      />
                    </div>
                  </div>

                  <div className="new-note-form-field">
                    {/* <label
                      className="new-note-form-field-label"
                      htmlFor="sharedWith"
                    >
                      Share
                    </label> */}
                    <Field
                      className="new-note-form-shared"
                      as="select"
                      name="sharedWith"
                    >
                      <option value="">Share With...</option>
                      <option value={1}>John Doe</option>
                      <option value={2}>Jane Doe</option>
                      <option value={3}>Joe Doe</option>
                    </Field>
                  </div>
                </div>
              </div>
              <button
                className="new-note-button"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
