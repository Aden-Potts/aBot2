import { AudioPlayer, AudioResource, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel, NoSubscriberBehavior, StreamType, VoiceConnection } from "@discordjs/voice";
import { GuildChannel } from "discord.js";
import { Logger } from "./logging";
import ytdl from 'ytdl-core-discord';

const fs = require("fs");


export async function joinVoice(channel: GuildChannel): Promise<AudioPlayer | boolean> {
    var cid: string = channel.id;
    var gid: string = channel.guild.id;

    try {
        const conn = joinVoiceChannel({
            channelId: cid,
            guildId: gid,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
    } catch(e) {
        Logger.Error(`Failed to create voice connection for channelid ${channel.id} in guild ${channel.guild.name}. Error: ${e}`);
        return false;
    }

    return createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
        }
    });
}

// instead of just sending the connection itself, we will use getVoiceConnection. apparently, tracking connection objects yourself will cause memory leaks once they're destroyed.
export async function playYT(player: AudioPlayer, gid: string, url: string): Promise<void> {
    const connection = getVoiceConnection(gid);
    
    var audiostream;

    try {
        audiostream = await ytdl(url, {filter: "audioonly"});
    } catch (e) {
        Logger.Error(`Failed to play video '${url}'. Error: ${e}`);
        return;   
    }

    const resource: AudioResource = createAudioResource(audiostream, {inputType: StreamType.Opus});
    
    connection?.subscribe(player);
    player.play(resource);
}