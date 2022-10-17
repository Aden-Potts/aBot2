import {Client, Interaction, SlashCommandBuilder, GatewayIntentBits, REST, Routes, PermissionResolvable, PermissionsBitField} from "discord.js";
import { Bot } from "src/exports/bot";
import {Logger} from "../exports/logging";


export default (abot: Bot): void => {
    const client = abot.clientObj;

    client.on("interactionCreate", async (interaction: Interaction) => {
        if(!interaction.isCommand())
            return;

        var commandName = interaction.commandName;
        var cmd = abot.commands.get(commandName);

        if(cmd) {
            if(!interaction.inGuild() && cmd.dm === false) {
                interaction.reply("This command isn't available in DMs.");

                return;
            } else {
                if(cmd.dm === false && cmd.permission != PermissionsBitField.Flags.SendMessages && !interaction.memberPermissions?.has(cmd.permission)) {
                    interaction.reply({content:"You do not have access to this command!", ephemeral:true});

                    return;
                }
            }

            try {
                cmd.exec(interaction, abot)
            } catch(e: any) {
                Logger.Error(e);
                interaction.reply({content:"Uh oh! An error appeared while executing this command. Please try again later.", ephemeral:true});
            };

        }
    })
}
