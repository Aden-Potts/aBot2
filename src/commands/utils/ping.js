module.exports = {
    name: 'ping',
    description: 'Ping Pong!',
    usage: 'none',
    category: 'Misc',
    permission: 0,
    dm: true,
    options: [
        {type:"str", name:"random", desc:"some random text", req:true}
    ],
    execute(interaction){
        let str = interaction.options.getString("random");
        if(!str)
            str = "poop";

        interaction.reply(`Pong! ${str}`);
    }
}