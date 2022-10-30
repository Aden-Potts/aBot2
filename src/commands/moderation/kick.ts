import { APIInteractionDataResolvedGuildMember, ChatInputCommandInteraction, GuildMember, PermissionsBitField } from "discord.js";
import { Bot } from "src/exports/bot";
import { Logger } from "../../exports/logging";


module.exports = {
    name: 'kick',
    description: 'Kicks a specific user.',
    usage: '<user> [reason]',
    category: 'Moderation',
    permission: PermissionsBitField.Flags.KickMembers,
    dm: false,
    options: [
        {type:"user", name:"user", desc:"The guild member to kick.", req:true},
        {type:"str", name:"reason", desc:"The reason for the kick.", req:false},
    ],
    exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        var gMember: any = interaction.options.getMember("user")
        if(gMember == null || !(gMember instanceof GuildMember))
            return;

        var reason: string = interaction.options.getString("reason") ?? "No reason provided.";
        var memberTag = gMember.user?.tag;

        gMember.send(`You have been kicked from ${interaction.guild?.name ?? "error"}. Reason: ${reason}.`).catch((e) => {
            Logger.Error(e);
        })

        gMember.kick(reason).then(() => {
            interaction.reply({content:`${memberTag} has been kicked.`, ephemeral:true});
        }).catch((e) => {
            Logger.Error(e);

            interaction.reply({content:`${memberTag} has not been kicked due to an error! \`\`\`${e}\`\`\``, ephemeral:true});
            return;
        });
    }
}
