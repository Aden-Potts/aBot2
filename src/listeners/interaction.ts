import {GuildMember, Interaction, PermissionsBitField} from "discord.js";
import { Bot } from "src/exports/bot";
import {Logger} from "../exports/logging";


export default (abot: Bot): void => {
    const client = abot.clientObj;

    client.on("interactionCreate", async (interaction: Interaction) => {
        if(!interaction.isCommand())
            return;

        var commandName = interaction.commandName;
        var cmd = abot.commands.get(commandName);
        var member = interaction.member as GuildMember

        if(cmd) {
            if(cmd.permission != PermissionsBitField.Flags.SendMessages && !interaction.memberPermissions?.has(cmd.permission)) {
                interaction.reply({content:"You do not have access to this command!", ephemeral:true});

                return;
            }

            try {
                cmd.exec(interaction, abot)
            } catch(e: any) {

                Logger.Error(`An error appeared while executing command ${commandName} from member ${member.user.tag} (${member.id}): //////////////\n${e}\n//////////////`);
                interaction.reply({content:"Uh oh! An error appeared while executing this command. Please try again later.", ephemeral:true});
            };

            Logger.Info(`${member.user.tag} (${member.id}) executed command ${commandName}.`)
        }
    })
}
