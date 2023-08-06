import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import multer from "multer";
//routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/", (req, res) => {
  res.send("Blog app started");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
