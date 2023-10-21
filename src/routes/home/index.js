"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/각자 맡은 파트", ctrl.GET.각자 맡은 파트);
router.post("/각자 맡은 파트", ctrl.POST.각자 맡은 파트);


module.exports = router;