import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Bot } from "src/exports/bot";


module.exports = {
    name: 'ping',
    description: 'Ping Pong!',
    usage: 'none',
    category: 'Misc',
    permission: PermissionsBitField.Flags.SendMessages, // This will be the default permission.
    dm: true,
    options: [
        {type:"str", name:"random", desc:"some random text", req:true}
    ],
    exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        let text: string = interaction.options.getString("random") ?? "";

        interaction.reply(`Pong! ${text}`);
    }
}
