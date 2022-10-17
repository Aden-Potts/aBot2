require("dotenv").config();

import {Client, ClientOptions, Collection, REST, GatewayIntentBits} from "discord.js";
import {Bot} from "./exports/bot";
import init from "./listeners/init";

// Construct the client object.
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

const aBot = new Bot(client); // We won't pass the commandlist here, during the init we'll set the command list.

// Initialize the bot.
init(aBot);

client.login(process.env.LoginToken);