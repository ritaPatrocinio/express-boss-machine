const meetingsRouter = require("express").Router();

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  const item = createMeeting();

  res.status(201).send(addToDatabase("meetings", item));
});

meetingsRouter.delete("/", (req, res, next) => {
  res.status(204).send(deleteAllFromDatabase("meetings"));
});

module.exports = meetingsRouter;
