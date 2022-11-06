import { ChatInputCommandInteraction, GuildMember, GuildChannel, PermissionsBitField } from "discord.js";
import {AudioPlayer, getVoiceConnection, VoiceConnection} from "@discordjs/voice";
import { Bot } from "src/exports/bot";
import {playYT, joinVoice} from "../../exports/voice";
import { Logger } from "../../exports/logging";
import ytdl from "ytdl-core-discord";


module.exports = {
    name: 'play',
    description: 'Plays a YouTube video.',
    usage: '<url>',
    category: 'Voice',
    permission: PermissionsBitField.Flags.SendMessages, 
    dm: false,
    options: [
        {type:"str", name:"url", desc:"youtube url", req:true}
    ],
    async exec(interaction: ChatInputCommandInteraction, abot: Bot) {
        const member = interaction.member as GuildMember;

        if(!member?.voice.channel) {
            console.log(member?.voice.channel);
            interaction.reply({content: "Sorry, but it appears you're not in a Voice Channel at the moment.", ephemeral:true});

            return;
        }

        var channel: GuildChannel = member.voice.channel;
        const con = getVoiceConnection(channel.guild.id);
        if(con != null) {
            if(con.joinConfig.channelId != channel.id) {
                interaction.reply({content:"Sorry, but I am currently in another Voice Channel at this time. Either join my current channel and add this video to the queue, or wait until I am available.", ephemeral:true});

                return;
            }
        }

        var url: string = interaction.options.getString("url") ?? ""

        joinVoice(channel).then((v => {
            if(v instanceof AudioPlayer) {
                playYT(v, channel.guild.id, url)
            } else {
                interaction.reply({content:"Sorry, it appears im having issues playing this. Try again maybe?", ephemeral:true});
            }
        })).catch(Logger.Error);

        ytdl.getInfo(url).then((info) => {
            interaction.reply(`:notes: Now playing: "${info.videoDetails.title}" - ${info.videoDetails.video_url} :notes: `);
        }).catch((e) => {
            interaction.reply(`Sorry, but an error appeared trying to run this command. \`\`${e}.\`\``);


            return;
        });
    }
}
