const minionsRouter = require("express").Router();
const workRouter = require("./work");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const item = getFromDatabaseById("minions", id);
  if (item) {
    req.item = item;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("minions", req.body));
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.item);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  res.send(updateInstanceInDatabase("minions", req.body));
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const id = req.params.minionId;
  const deleted = deleteFromDatabasebyId("minions", id);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

minionsRouter.use("/:minionId/work", workRouter);
module.exports = minionsRouter;
