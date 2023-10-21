"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.GET.root);
router.post("/calendar", ctrl.POST.calendar);


module.exports = router;