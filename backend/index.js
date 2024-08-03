import express from "express";
import "dotenv/config";
import axios from "axios";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// connecting to mongo db
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.use("/api/user", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/sessions", sessionRouter);

// Fetch weather information
app.get("/weather/:location", async (req, res) => {
  try {
    const { location } = req.params;
    // console.log(`Fetching weather for location: ${location}`);

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("Weather API key is missing");
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    res.status(200).json({ weather: response.data });
  } catch (error) {
    console.error(
      `Error fetching weather for location, Enter correct name of a city: ${req.params.location}`,
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
