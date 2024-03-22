const workRouter = require("express").Router({mergeParams: true});
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

workRouter.param("minionId", (req, res, next, id) => {
    const item = getFromDatabaseById("minions", id);
    if (item) {
      req.item = item;
      next();
    } else {
      res.status(404).send();
    }
  });

workRouter.param("workId", (req, res, next, id, id2) => {
  const work = getFromDatabaseById("work", id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(400).send();
  }
});

workRouter.get("/", (req, res, next) => {
  const minionId = req.params.minionId;
  const workByMinion = getAllFromDatabase("work").filter(
    (w) => w.minionId === minionId
  );
  res.send(workByMinion);
});

workRouter.post("/", (req, res, next) => {
  res.status(201).send(addToDatabase("work", req.body));
});

workRouter.put("/:workId", (req, res, next) => {
  if (req.body.id === req.params.workId) {
    res.send(updateInstanceInDatabase("work", req.body));
  } else {
    res.status(400).send();
  }
});

workRouter.delete("/:workId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = workRouter;
