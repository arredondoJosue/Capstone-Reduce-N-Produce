import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotes, setPopoverNote } from "../Hooks/userSlice";

import axios from "axios";
import "../styles/NewNote.scss";

export default function NewNote({ handleClose }) {
  const userInfo = useSelector((state) => state.globalStore.userInfo);
  const dispatch = useDispatch();

  let x = false;
  function toggleShow() {
    handleShow(x);
  }

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
            user_id: userInfo.user_id,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              axios
                .post("http://localhost:5000/api/v1/notes/new-note", values)
                .then((res) => {
                  console.log(res);
                  values.noteTitle = "";
                  values.noteText = "";
                  values.sharedWith = "";
                  dispatch(setNotes(res.data)); // set tasks to the response data from the server
                  handleClose();
                })
                .then(() => {
                  axios
                    .get(
                      `http://localhost:5000/api/v1/notes/${userInfo.user_id}`
                    )
                    .then((res) => {
                      dispatch(setNotes(res.data)); // set tasks to the response data from the server
                      console.log("hit the notes get route");
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
                    {/* <label
                      className="new-note-form-field-label"
                      htmlFor="noteTitle"
                    >
                      Title
                    </label> */}
                    <Field
                      className="new-note-form-title"
                      type="text"
                      name="noteTitle"
                      placeholder="Title"
                    />
                  </div>
                </div>

                <div className="new-note-form-section-bottom">
                  <div className="new-note-form-section-top">
                    <div className="new-note-form-field">
                      {/* <label
                        className="new-note-form-field-label"
                        htmlFor="noteText"
                      >
                        Description
                      </label> */}
                      <Field
                        className="new-note-form-description"
                        as="textarea"
                        name="noteText"
                        placeholder="Your note here..."
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
