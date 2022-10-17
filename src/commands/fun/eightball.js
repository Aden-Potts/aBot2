const {PermissionFlagsBits} = require("discord.js");
const Logger = require("../../exports/logging");

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    name: '8ball',
    description: 'Gives you a random result.',
    usage: 'none',
    category: 'Fun',
    permission: 0,
    dm: true,
    options: [
        {type:"str", name:"question", desc:"The question.", req:true}
    ],
    execute(interaction){
        let pos = [
            "",
            "Most certainly",
            "Without a doubt",
            "You may rely on it",
            "Yes definitely",
            "It is decidedly so",
            "As I see it, yes",
            "Most likely",
            "Yes",
            "Outlook good",
            "Signs point to yes"
        ];

        let neutral = [
            "",
            "Reply hazy try again",
            "Better not tell you now",
            "Ask again later",
            "Cannot predict now",
            "Concentrate and ask again",
        ];

        let neg = [
            "",
            "Don't count on it",
            "Outlook not so good",
            "My sources say no",
            "Very doubtful",
            "My reply is no",
            "Nah you stank ass big toe"
        ];

        let q = interaction.options.getString("question");
        let res = "Error";

        var i = random(50, 400);

        if(q.includes("blusheep") || q.includes("blu")) {
            if(q.includes("girl")){
                i = 151;
            } else {
                i = 1;
            }
        }

        if(i < 151) {
            res = pos[random(1, 10)];
        } else if(i >= 151 && i < 251) {
            res = neutral[random(1, 5)];
        } else {
            res = neg[random(1, 6)];
        }

        interaction.reply(`Question: ${q}\nAnswer: ${res}`);
    }
}