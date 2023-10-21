"use strict"

const app = require("../app");
const PORT = 3306;

app.listen(PORT, () => {
    console.log("서버 가동");
});
