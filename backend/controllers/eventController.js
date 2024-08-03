import eventModel from "../models/eventModel.js";

// Create a new event
const addEvent = async (req, res) => {
  try {
    const { date, guest, title, location, description } = req.body;
    const userId = req.body.userId;
    const newEvent = new eventModel({
      guest,
      date,
      title,
      location,
      description,
      userId,
    });
    await newEvent.save();
    res.status(200).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "unable to add the event, please fill all details",
    });
  }
};

// retrive all events
const getEvents = async (req, res) => {
  try {
    const userId = req.body.userId;
    const events = await eventModel.find({ userId: userId });
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "unable to fetch user events" });
  }
};

// update events
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { guest, date, title, location, description } = req.body;
    const updatedEvent = await eventModel.findByIdAndUpdate(
      id,
      { guest, date, title, location, description },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in updating the event" });
  }
};

// delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in deleting the event" });
  }
};

export { addEvent, getEvents, updateEvent, deleteEvent };
