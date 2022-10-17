const {PermissionFlagsBits} = require("discord.js");
const Logger = require("../../exports/logging");
const fs = require("fs");

module.exports = {
    name: 'setmodlog',
    description: 'Set\'s the Mod Log channel.',
    usage: 'none',
    category: 'Config',
    permission: PermissionFlagsBits.ManageServer,
    dm: false,
    options: [
        {type:"channel", name:"channel", desc:"Channel to set ModLog to.", req:true}
    ],
    execute(interaction){
        let channel = interaction.options.getChannel("channel");
        
        if(interaction.client.GuildSettings[interaction.guildId] !== undefined) {
            interaction.client.GuildSettings[interaction.guildId].ModLogChannel = channel.id;

            try {
                fs.writeFileSync(`data/guilds/${interaction.guildId}/settings.json`, JSON.stringify(interaction.client.GuildSettings[interaction.guildId]), {flags:"w"})
            } catch(e) {
                Logger.Error(`Failed to save new settings. ${e}`);

                interaction.reply({content: "Oops, there was an error trying to do this. Try again later or get support.", ephemeral:true});

                return;
            }

            interaction.reply("Success!");
        } else {
            
        }
    }
}