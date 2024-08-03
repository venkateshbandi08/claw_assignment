import React, { useState, useEffect } from "react";
import "./Landing.css";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../App";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Landing = () => {
  const [eventsList, setEventsList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    location: "",
    guest: "",
    date: "",
    description: "",
  });
  const [currentEventId, setCurrentEventId] = useState(null);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowUpdateModal = (event) => {
    setEventDetails(event);
    setCurrentEventId(event._id);
    setShowUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(baseUrl + "/api/events/events", {
        headers: { token: sessionStorage.getItem("user-token") },
      });
      setEventsList(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem("user-token");

      const response = await axios.post(
        baseUrl + "/api/events/events",
        eventDetails,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        fetchEvents();
        toast.success(response.data.message);
      }
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating event:", error);
    }
    setEventDetails({
      title: "",
      location: "",
      guest: "",
      date: "",
      description: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("user-token");

      const response = await axios.put(
        baseUrl + `/api/events/events/${currentEventId}`,
        eventDetails,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        await fetchEvents();
        toast.success(response.data.message);
      }
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating event:", error);
    }
    setEventDetails({
      title: "",
      location: "",
      guest: "",
      date: "",
      description: "",
    });
    setCurrentEventId(null);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  const deleteEvent = async (id) => {
    const token = sessionStorage.getItem("user-token");

    try {
      const response = await axios.delete(
        `${baseUrl}/api/events/events/${id}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        fetchEvents();
        toast.success(response.data.message);
      } else {
        console.error("Error deleting event:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="events-page-content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleShowCreateModal}>Create an Event</Button>
        </div>
        <div className="all-events"></div>
        <div className="events-container">
          {eventsList.map((eachItem, index) => (
            <div key={index} className="buttoons-and-cards-container">
              <div
                onClick={() =>
                  navigate("/event-details", {
                    state: { eventDetails: eachItem },
                  })
                }
                className="event-container"
              >
                <div>
                  <h4 className="single-line">{eachItem.title}</h4>
                </div>
                <div>
                  <p className="single-line">{eachItem.location}</p>
                </div>
                <div>
                  <p className="single-line">{eachItem.guest}</p>
                </div>
                <div>
                  <p className="single-line">{formatDate(eachItem.date)}</p>
                </div>
              </div>
              <div className="btns-container">
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowUpdateModal(eachItem)}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteEvent(eachItem._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGuest">
              <Form.Label>Guest</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest"
                name="guest"
                value={eventDetails.guest}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={eventDetails.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGuest">
              <Form.Label>Guest</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest"
                name="guest"
                value={eventDetails.guest}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={eventDetails.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Landing;
