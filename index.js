const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

app.set("view engine", "ejs");

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.get("/", async (req, res) => {

  const guilds = client.guilds.cache.map(g => ({
    id: g.id,
    name: g.name
  }));

  res.render("home", { guilds });
});

client.login(process.env.TOKEN);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Website running");
});
