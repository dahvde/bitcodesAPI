const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        alt: { type: String, required: true },
        href: { type: String, required: true },
        description: { type: String, required: true },
        refferal: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        information: { type: String, required: true },
        clicks: { type: Number, required: true, default: 0 },
    },
    { versionKey: false }
);

module.exports = mongoose.model("site", siteSchema);
