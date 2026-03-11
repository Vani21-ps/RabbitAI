require("dotenv").config();
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./swagger")
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const uploadRoute = require("./routes/uploadRoute"); // 👈 IMPORT ROUTE

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

app.use(limiter);

// CONNECT ROUTES
app.use("/api", uploadRoute);

// health route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// test route
app.get("/", (req, res) => {
  res.send("Server working");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});