const {PermissionFlagsBits} = require("discord.js");
const Logger = require("../../exports/logging");

module.exports = {
    name: 'purge',
    description: 'Ping Pong!',
    usage: 'none',
    category: 'Misc',
    permission: PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {type:"num", name:"amount", desc:"Amount of Messages", req:true},
        {type:"channel", name:"channel", desc:"Channel to delete in (optional)", req:false},
        {type:"bool", name:"silent", desc:"Wheather to announce to everyone or just you.", req:false}
    ],
    execute(interaction){
        let amt = interaction.options.getInteger("amount");
        let channel = interaction.options.getChannel("channel");
        let silent = interaction.options.getBoolean("silent") || false;

        
        if(!channel)
            channel = interaction.channel;

        let content = {content:`Deleted ${amt} message(s)`, ephemeral:false};

        if(silent)
            content.ephemeral = true;

        channel.bulkDelete(amt).then(interaction.reply(content)).catch((e) => {
            Logger.Error(e);

            interaction.reply({content: "Whoops, an error appeared trying to delete these messages. Try again later or ask for support.", ephemeral:true});

            return;
        });
    }
}