const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");
const authCheck = require("../middleware/authCheck");

router.get("/", authCheck, async (req, res) => {
  console.log("GET request incoming");
  await Bug.find({})
    .sort({ created: -1 })
    .then((bugs) =>
      res.status(200).json({ bugs: bugs, userData: req.userData })
    );
});

router.get("/findbug/:bugId", (req, res) => {
  console.log("Incoming");
  Bug.findOne({ _id: req.params.bugId }).then((bug) =>
    res.status(200).json({ bug })
  );
});

router.post("/findbug", async (req, res) => {
  await Bug.find({
    description: new RegExp(req.body.searchByDescription, "i"),
  })
    .exec()
    .then((results) => res.status(200).json({ results }));
});

router.post("/", authCheck, (req, res) => {
  console.log("POST request incoming");
  console.log(req.body);
  const newBug = new Bug({
    description: req.body.description,
    openedByFirstName: req.body.openedByFirstName,
    openedByLastName: req.body.openedByLastName,
    assignedto: req.body.assignedto,
    priority: req.body.priority,
    status: "Open",
  });

  newBug
    .save()
    .then((bug) => res.status(201).json({ bug: bug }))
    .catch((err) => console.log(err));
});

router.patch("/findbug/:bugId", async (req, res) => {
  await Bug.update(
    { _id: req.params.bugId },
    {
      description: req.body.description,
      assignedto: req.body.assignedto,
      priority: req.body.priority,
    }
  ).then(() => res.status(200).json({ msg: "Updated" }));
});

router.delete("/:bugId", (req, res) => {
  console.log(req.params.bugId.split(","));
  const bugsToDelete = req.params.bugId.split(",");

  Bug.deleteMany({ _id: { $in: bugsToDelete } })
    .exec()
    .then((result) => {
      res.status(200).json({ msg: "Bug(s) deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
