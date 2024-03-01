require("dotenv").config();
const express = require("express");
const app = express();
// const http = require("http");
// const setupWebSocket = require("./websocket");

// const server = http.createServer(app);

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const searchRoutes = require("./routes/Search");
const requestRoutes = require("./routes/Request");
const postRoutes = require("./routes/Post");
const notificationRoutes = require("./routes/Notification");
const messageRoutes = require("./routes/Message");
const broadcastRoutes = require("./routes/Broadcast");
// const adminRoutes = require("./routes/Admin");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     setAllowedOrigin: "*",
//     // origin: "https://localhost:4000",
//     // credentials: true,
//   })
// );
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));
// app.use(express.static("../public"));
cloudinaryConnect();

app.use("/api/data/user", userRoutes);
// app.use("/api/data/admin", adminRoutes);
app.use("/api/data/profile", profileRoutes);
app.use("/api/data/broadcast", broadcastRoutes);
app.use("/api/data/message", messageRoutes);
app.use("/api/data/notification", notificationRoutes);
app.use("/api/data/post", postRoutes);
app.use("/api/data/request", requestRoutes);
app.use("/api/data/search", searchRoutes);
// app.get("/products/:id", (req, res) => {
//   const productId = req.params.id; // Fetch product data from database
//   db.getProduct(productId)
//     .then((product) => {
//       res.json(product); // Send product data as JSON response
//     })
//     .catch((error) => {
//       res.status(500).send(error.message); // Handle error
//     });
// });
// setupWebSocket(server);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
