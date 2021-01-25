const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("student.db");

var multer = require("multer");

const router = express.Router();

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./images"));
const PORT = 3300;
const ip = "192.168.10.5";

// for parsing application/json
//app.use(bodyParser.json());

// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./images");
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}`);
    },
});
const upload = multer({
    storage: storage,
});

app.get("/", (req, res) => {
    res.send("hello world");
});

// GET FROM STUDENTS TABLE
app.get("/AllStudents", (req, res) => {
    db.all("Select * from Students", (err, row) => {
        if (row) {
            res.send(row);
        } else {
            res.status(404).send(err);
        }
    });
});

// INSERT INTO STUDENTS TABLE
app.post("/RegisterStudent", upload.single("image"), (req, res) => {
    console.log("req.body =", JSON.stringify(req.body));
    db.all(
        "Insert into Students values(null,?,?,?)",
        [
            req.body.RollNumber,
            req.body.student_Name,
            req.body.age,

        ],
        (err, row) => {
            if (row) {
                res
                    .status(200)
                    .json({ msg: "Successfully inserted" });
            } else {
                res.status(404).send(err);
            }
        }
    );
});


app.post("/UpdateStudent/:id", (req, res, next) => {
    // console.log('update student')
    var reqBody = req.body;
    db.run(`UPDATE Students set RollNumber = ?, student_Name = ?, age = ? WHERE student_id = ?`,
        [reqBody.RollNumber, reqBody.student_Name, reqBody.age, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ student_id: this.changes });
        });
});

app.delete("/delete/:id", (req, res, next) => {
    console.log('deleted', req.params.id)
    db.run(`DELETE FROM Students WHERE student_id = ${req.params.id}`,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})



// LISTENING SERVER
app.listen(PORT, ip, () => {
    console.log("Server is listening at http://" + ip + ":" + PORT);
});
