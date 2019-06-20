const router = require("express").Router();
const { Page } = require("../models");
const { addPage } = require("../views");

router.get("/add", (req, res, next) => {
      res.send(addPage());
});

router.get("/", (req, res, next) => {
    // redirects to localhost PORT
    res.redirect("/");
});

router.post("/", async(req, res, next) => {
    // status not working
    const slugVar = req.body.title.split(' ').join('_').toLowerCase();
    console.log(`Name: ${req.body.name}, Email: ${req.body.email}, Title: ${req.body.title}, Content: ${req.body.content}, Status: ${req.body.status}`);

    const page = new Page({
        title: req.body.title,
        content: req.body.content,
        slug: slugVar
      });
    
      // make sure we only redirect *after* our save is complete!
      // note: `.save` returns a promise.
      try {
        await page.save();
        res.redirect('/');
      } catch (error) { next(error) }
});



module.exports = router;
