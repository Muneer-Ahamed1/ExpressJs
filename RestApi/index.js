const express = require("express");
const app = express();
const studentInfo = [
    {
        id: 1,
        name: "muneer",
        college: "vvit",
        status: "graduated"
    },
    {
        id: 2,
        name: "muneer",
        college: "vvit",
        status: "graduated"
    },
    {
        id: 3,
        name: "muneer",
        college: "vvit",
        status: "graduated"
    },
    {
        id: 4,
        name: "muneer",
        college: "vvit",
        status: "graduated"
    }
]
app.use((req, res, next) => {
    res.header({ "x-restAPi": "Crud-ExpressJs" })
    next();
})
function validation(req) {
    let id = parseInt(req.params.id);
    let bool = false;
    studentInfo.map((vl) => {
        if (vl.id === id) {
            bool = true;
        }
    })
    return bool;
}
app.use("/student/put/:id", (req, res, next) => {

    if (validation(req)) {
        next();
    }
    else {
        res.status(404).json({ message: "client id error" })
    }


})
app.use("/student/delete/:id", (req, res, next) => {
    if (validation(req)) {
        next();
    }
    else {
        res.status(404).json({ message: "client id error" })

    }

})

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>Welcome to CRUD RestFul Api</h1>")
})
app.post("/student/post", (req, res) => {
    console.log(req.body)
    studentInfo.push(req.body);
    res.status(200).send({ message: "Data Posted Successfully!" });

})
app.get("/student/get", (req, res) => {
    res.send(studentInfo)
})
app.put("/student/put/:id", (req, res) => {
    let id = parseInt(req.params.id);
    
    
    studentInfo[id].name = req.body.name;

    res.status(200).json(studentInfo);
})
app.delete("/student/delete:id", (req, res) => {
    let id = parseInt(req.params.id);
    studentInfo.filter((vl) => vl.id === id)
    res.status(200).json(studentInfo);
})


app.listen(5000, () => {
    console.log("listen at 5000")
})