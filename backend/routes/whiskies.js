const router = require("express").Router();
const Whiskies = require("../models/whiskey.model");
let Whiskey = require("../models/whiskey.model");

router.route("/").get((req, res) => {
  Whiskey.find()
    .then((whiskies) => res.json(whiskies))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const price = Number(req.body.price);
  const date = Date.parse(req.body.date);

  const newWhiskey = new Whiskey({
    username,
    description,
    price,
    date,
  });

  newWhiskey
    .save()
    .then(() => res.json("Whiskey added!"))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/:id").get((req, res) => {
  Whiskey.findById(req.params.id)
    .then((whiskey) => res.json(whiskey))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/:id").delete((req, res) => {
  Whiskey.findByIdAndDelete(req.params.id)
    .then(() => res.json("Whiskey deleted."))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/update/:id").post((req, res) => {
  Whiskey.findById(req.params.id)
    .then((whiskey) => {
      whiskey.username = req.body.username;
      whiskey.description = req.body.description;
      whiskey.price = Number(req.body.price);
      whiskey.date = Date.parse(req.body.date);

      whiskey
        .save()
        .then(() => res.json("Whiskey updated!"))
        .catch((err) => res.status(400).json("Error: ", err));
    })
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
