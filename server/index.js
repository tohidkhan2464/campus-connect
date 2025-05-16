require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const searchRoutes = require("./routes/Search");
const postRoutes = require("./routes/Post");
const notificationRoutes = require("./routes/Notification");
const broadcastRoutes = require("./routes/Broadcast");
const adminRoutes = require("./routes/Admin");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/broadcast", broadcastRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/search", searchRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
