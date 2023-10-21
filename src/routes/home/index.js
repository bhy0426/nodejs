"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.GET.root);
router.get("/login", ctrl.GET.login);
router.get("/signup", ctrl.GET.signup);
router.get("/user/calendar", ctrl.GET.calendar);
router.get("/user/timer/ranking", ctrl.GET.ranking);

router.post("/login", ctrl.POST.login);
router.post("/signup", ctrl.POST.signup);

module.exports = router;