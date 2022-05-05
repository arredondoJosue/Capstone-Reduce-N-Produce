import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";

export default function EditNote() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div onClick={() => setShow(false)}>
      <form className="child-widget-subcontainer notes-subcontainer">
        <div className="form-group">
          {/* <label htmlFor="exampleInputEmail1">Title</label> */}
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <textarea
            className="form-control"
            id="exampleInputPassword1"
            rows="3"
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Share with</label>
          <select
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Share with"
          >
            <option>Select</option>
            <option>John Doe</option>
            <option>Jane Doe</option>
            <option>Joe Doe</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => setShow(false)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
