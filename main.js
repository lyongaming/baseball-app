require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { select_players } = require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/players", async(req, res) => {
    const players = await select_players();
    res.json(players);
});

app.listen(3000, () => {
    console.log(`Server running at ${3000}`);
});