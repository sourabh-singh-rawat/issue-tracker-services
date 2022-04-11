const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.options("*", cors());

// routes
const userRouter = require("./routes/users");
app.use("/", userRouter);

app.listen(4000, () => {
    console.log("Server is running at port 4000");
});
