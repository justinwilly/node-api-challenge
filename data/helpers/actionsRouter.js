const express = require("express");
const helmet = require("helmet");

const Project = require("./projectModel");
const Action = require("./actionModel");

const router = express.Router();

router.use(express.json());
router.use(helmet());

// POST actions to projects
router.post("/:id/actions", (req, res) => {
    if (!req.body.project_id) {
        res
            .status(404)
            .json({ message: "The Project with the specified ID does not exist." });
        } else if (!req.body.project_id) {
        res
            .status(404)
            .json({ message: "Please provide a Project ID to continue." });
        } else {
    Action.insert(req.body)
        .then(actions => {
            res.status(201).json(actions);
        })
            .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: "Error adding the Projects actions"
            });
        });
    }
});
//! POST actions to projects


// GET actions for peojects
router.get("/:id/actions", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res
            .status(404)
            .json({ message: "The project with the specified ID does not exist." });
    }
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "error geting project actions" });
        });
});
//! GET actions for Projects


// PUT Actions with specific Project
router.put("/:id/actions/:actions_id", (req, res) => {
    const changes = req.body;
    const actionsId = req.params.actions_id;
    if (!req.params.id) {
        res
            .status(404)
            .json({ message: "The project with the specified ID does not exist." });
    } else {
        Action.update(actionsId, changes)
            .then(actions => {
                res.status(200).json({
                    message:"Successfully Edited the specified action for the specified project"
                });
            })
            .catch(err => {
                console.log("error on PUT /api/projects/:id/actions/:actions_id", err);
                res.status(500).json({ errorMessage: "error editing the actions array to the project"
                });
            });
    }
});
// !PUT Actions with specific Project

//DELETE Project
router.delete("/:id/actions/:actions_id", (req, res) => {
    id = req.params.id;
    actionsId = req.params.actions_id;
    Action.remove(actionsId)
        .then(removed => {
            res.status(200).json({
            message: "successfully removed Action with the Specified Action ID and Project ID"
            });
        })
        .catch(error => {
            console.log(error);
            res
            .status(500)
            .json({ errorMessage: "error deleting specified actions" });
        });
});
// DELETE Project with specific ID

module.exports = router;