import express from "express";
import data from "./data/mock.json" assert {type: "json"};
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.listen(port, () => {
    console.log(`Server runnung on port ${port}!`);
    //console.log(data);
});

app.get("/", (req, res) => {
    res.json(data);
});

app.get("/download", (req, res) => {
    res.download("images/img.png");
});

// Get with next
app.get("/next", (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next();
}, (req, res) => {
    res.send("I just set up the route with second callback");
});

app.route("/class")
    .get((req, res) => {
        res.send("Retrieve class info");
    })
    .post((req, res) => {
        res.send("Create class info");
    }).put((req, res) => {
        res.send("Update class info");
    });

// Get with params
app.get("/class/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const student = data.filter((student) => student.id === studentId);
    res.send(student);
});

app.post("/create", (req, res) => {
    res.send("This is a POST request at create");
});

app.put("/edit", (req, res) => {
    res.send("This is a PUT request at edit");
});

app.delete("/delete", (req, res) => {
    res.send("This is a DELETE request at delete");
});