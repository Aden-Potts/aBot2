require("dotenv").config();

import {Client, GatewayIntentBits} from "discord.js";
import {Bot} from "./exports/bot";
import { Logger } from "./exports/logging";
import init from "./listeners/init";

// Construct the client object.
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates]
});

const aBot = new Bot(client); // We won't pass the commandlist here, during the init we'll set the command list.

// Initialize the bot.
init(aBot);


client.login(process.env.LoginToken);