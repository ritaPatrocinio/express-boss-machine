const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body;
  const revenue = idea.numWeeks * idea.weeklyRevenue;
  if (revenue >= 1e6) {
    next();
  } else {
    res
      .status(400)
      .send("All ideas must be worth at least one million dollars!");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
