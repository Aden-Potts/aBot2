import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Bot } from "src/exports/bot";


module.exports = {
    name: 'setstatus',
    description: 'Sets the bots status.',
    usage: 'none',
    category: 'Misc',
    permission: PermissionsBitField.Flags.Administrator, // This will be the default permission.
    dm: true,
    options: [
        {type:"str", name:"status", desc:"some status", req:true}
    ],
    exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        let text: string = interaction.options.getString("status") ?? "";

        abot.clientObj.user?.setActivity(text);
    }
}
