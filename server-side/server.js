require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const db = require("./database");
const cors = require("cors");

// middleware
app.use(express.json());
 app.use(cors());
// routes
// create/add task

app.post("/add", async (req, res) => {
    try {
        const postATask = await db.query(
            "INSERT INTO taskstable (title, description) VALUES ($1, $2) RETURNING * ",
            [req.body.title, req.body.description]
        );
        res.status(200).json({
            status: "task added successfully",
            data: {
                tasks: postATask.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// get all tasks

app.get("/get/all", async (req, res) => {
    try {
        const getTasksResult = await db.query("SELECT * FROM taskstable");

        res.status(200).json({
            status: " all tasks updated successfully",
            data: {
                tasks: getTasksResult.rows,
        },
        });
    } catch (err) {
        console.log(err);
    }
});

// get a task

app.get("/get/one/task/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const getATask = await db.query(
            "SELECT * FROM taskstable WHERE task_id = $1",
            [req.params.id]
        );
        res.status(200).json({
            status: "task got successfully",
            data: {
                tasks: getATask.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//update a task by id

app.put("/update/task/:id", async (req, res) => {
    try {
        const updateATask = await db.query(
            "UPDATE taskstable SET title = $1, description = $2 WHERE task_id = $3 RETURNING * ",
            [req.body.title, req.body.description, req.body.task_id]
        );

        res.status(200).json({
            status: "task updated successfully",
            data: {
                tasks: updateATask.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// delete a task by id

app.delete("/delete/task/:id", async (req, res) => {

    try {
        const deleteATask = await db.query(
            "DELETE FROM taskstable WHERE task_id = $1",
            [req.params.id]
        );

        res.status(200).json({
            status: "task deleted successfully",
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
