require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { select_players } = require("./database/db");
const { generate_itemsets, support } = require("./utils/values_calc");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/players", async(req, res) => {
    const players = await select_players();
    const itemsets = generate_itemsets(players);
    res.json(support(itemsets));
});

app.listen(3000, () => {
    console.log(`Server running at ${3000}`);
});