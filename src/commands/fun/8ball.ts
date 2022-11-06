import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from "discord.js";
import { Bot } from "src/exports/bot";

const eightball = require("./eightball");


module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question.',
    usage: '<question>',
    category: 'Fun',
    permission: PermissionsBitField.Flags.SendMessages, // This will be the default permission.
    dm: true,
    options: [
        {type:"str", name:"question", desc:"the question the bot should answer.", req:true}
    ],
    exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        eightball.exec(interaction, abot);
    }
}
