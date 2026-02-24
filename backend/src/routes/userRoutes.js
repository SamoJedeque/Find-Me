const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/me", auth, async(req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name"]
    });

    res.json(user);
});

module.exports = router;