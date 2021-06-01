const express = require("express");
const router = express.Router();
const Site = require("../models/site");

// All sites
router.get("/", async (req, res) => {
    try {
        const sites = await Site.find();
        res.json(sites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// One site
router.get("/:id", getSite, (req, res) => {
    res.send(res.site);
});
// Creat Site
router.post("/", async (req, res) => {
    const site = new Site({
        image: req.body.image,
        alt: req.body.alt,
        href: req.body.href,
        description: req.body.description,
        refferal: req.body.refferal,
        type: req.body.type,
        name: req.body.name,
        information: req.body.information,
    });
    try {
        const newSite = await site.save();
        res.status(201).json(newSite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Updating Site
router.patch("/:id", getSite, async (req, res) => {
    res.site.clicks += 1;
    try {
        const updatedSite = await res.site.save();
        res.json(updatedSite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Deleting Site
router.delete("/:id", getSite, async (req, res) => {
    try {
        await res.site.remove();
        res.json({ message: "Deleted Site" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSite(req, res, next) {
    let site;
    try {
        site = await Site.findById(req.params.id);
        if (site == null) {
            return res.status(404).json({ message: "Cannot find site" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.site = site;
    next();
}

module.exports = router;
