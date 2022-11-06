import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from "discord.js";
import { Bot } from "src/exports/bot";


module.exports = {
    name: 'eightball',
    description: 'Ask the magic 8ball a question.',
    usage: '<question>',
    category: 'Fun',
    permission: PermissionsBitField.Flags.SendMessages, // This will be the default permission.
    dm: true,
    options: [
        {type:"str", name:"question", desc:"the question the bot should answer.", req:true}
    ],
    exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        let responses: Array<string> = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
        "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
        "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
        "Yes.", "Yes – definitely.", "You may rely on it."];

        var member = interaction.member as GuildMember;

        let q: string = interaction.options.getString("question") ?? "";
        let response: string = responses[Math.floor(Math.random() * responses.length)];

        interaction.reply(`Question from <@${member.id}>:\n> ${q}\nAnswer: ${response}`);
    }
}
