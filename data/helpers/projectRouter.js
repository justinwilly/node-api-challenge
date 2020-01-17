const express = require("express");
const helmet = require("helmet");

const Project = require("./projectModel");
const Action = require("./actionModel");

const router = express.Router();

router.use(express.json());
router.use(helmet());

//GET list of projects
router.get("/", (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
        res.status(500).json({ error: "The projects could not be retrieved." });
        });
});
//!GET list of projects



//GET project with specific ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Project.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res
            .status(500)
            .json({ error: "The user information could not be retrieved." });
        });
});
//!GET project with specific ID



//POST Project
router.post("/", (req, res) => {
    Project.insert(req.body)
        .then(project => {
        res.status(201).json(project);
        })
        .catch(err => {
            // log error to database
        console.log(err);
        res.status(500).json({
            message: "Error adding the Project"
        });
    });
});
//!POST Project



//DELETE Project
router.delete("/:id", (req, res) => {
    id = req.params.id;
    Project.remove(id)
        .then(removed => {
        res.status(200).json({ message: "The Project has been terminated!" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "error geting specified project" });
        });
});
// DELETE Project with specific ID



// PUT Project with specific ID
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!id) {
        res
            .status(404)
            .json({ message: "The project with the specified ID does not exist." });
    } else {
        Project.update(id, changes)
            .then(project => {
            res.status(200).json(project);
            })
            .catch(err => {
                console.log("error on PUT /api/projects/:id", err);
                res
                .status(500)
                .json({ errorMessage: "error editing the project to the database" });
            });
        }
});
// !PUT Project with specific ID


module.exports = router;