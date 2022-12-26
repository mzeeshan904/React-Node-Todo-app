require("dotenv").config();
const express = require("express");
const db = require("./database");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const app = express();
const secretKey = "secretkey";
const port = process.env.PORT || 3002;

const cors = require("cors");
const pool = require("./database");
// const { application } = require("express");

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



// Add/Register new user

app.post("/register", async (req, res) => {



    try {

        // const {full_name, email, password, confirm_password} = req.body;


        // const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        //     email
        //   ]);
      
        //   if (user.rows.length > 0) {
        //     return res.status(401).json("User already exist!");
        //   }
      
        //   const salt = await bcrypt.genSalt(10);
        //   const bcryptPassword = await bcrypt.hash(password, salt);

        const addNewUser = await db.query(
            "INSERT INTO user_registration (full_name, email, password, confirm_password) VALUES ($1, $2, $3, $4) RETURNING * ",
            [req.body.full_name, req.body.email, req.body.password, req.body.confirm_password,]
        );

        
        // if (addNewUser.rows.length > 0) {
        //     return res.status(401).send("user already exists");
        // }

        // jwt token generator function

        // const jwtTokenGenerator = (email) => {

        //     const payload = {
        //         addNewUser: email
        //     }
        //     return jwt.sign(payload, secretKey, { expiresIn: "1hr" })
        // }

        // const token = jwtTokenGenerator(addNewUser.rows[0].email)
        res.status(200).json({
            // token,

            status: "New User added successfully",
            data: {
                users: addNewUser.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});


// login user

app.post("/login", async (req, res) => {

    try {


        const {email, password} = req.body;

        const user = await pool.query("SELECT * FROM user_registration WHERE email = $1", [email, password]);

        if (user.rows.length === 0){
            return res.status(401).json("you are not a registered user please create a account");
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
