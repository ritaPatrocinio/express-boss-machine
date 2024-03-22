const ideasRouter = require("express").Router();

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const item = getFromDatabaseById("ideas", id);
  if (item) {
    req.item = item;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  res.status(201).send(addToDatabase("ideas", req.body));
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.item);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  res.send(updateInstanceInDatabase("ideas", req.body));
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const deleted = deleteFromDatabasebyId("ideas", id);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
