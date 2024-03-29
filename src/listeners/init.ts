require("dotenv").config();

import {Client, SlashCommandBuilder, REST, Routes, Guild} from "discord.js";
import { Bot, GuildSettings } from "src/exports/bot";
import {Logger} from "../exports/logging";
import interaction from "./interaction";

const filesys = require("fs");


export default async (abot: Bot): Promise<void> => {
    const client: Client = abot.clientObj;

    client.on("ready", async () => {
        if(!client.user) {
            return;
        }

        Logger.Info(`Bot starting up using ID ${client.user.tag}. Loading commands...`)

        await loadCommands(abot);
        await loadGuildData(abot);
        await interaction(abot);

        client.user.setActivity("aBot2.0");

        Logger.Info("Bot has been started!");
    });
}

const loadCommands = async (abot: Bot): Promise<void> => {
    const rest = new REST({version: "10"}).setToken(process.env.LoginToken ?? "");

    let commands = [];

    for(const folder of filesys.readdirSync('./src/commands')){
        const commandFiles = filesys.readdirSync(`./src/commands/${folder}`).filter((file: string) => file.endsWith('.ts')); 
    
        for(const file of commandFiles){
            /* We loop through each file in the command directory, and require it due to me using exports to handle command creation. */
            const command = require(`../commands/${folder}/${file}`);
            if(!command)
                continue;
    
            Logger.Info(`Loading command '${command.name}' from category ${folder}`);
    
            const cmdData = new SlashCommandBuilder().setName(command.name).setDescription(command.description); // Set the basic slashcommand data
    
            // Loop through module.exports.options. Generally, it should look something like this: {type:"str", name:"randomtext", desc:"some random ass text to print out", req:true}
            for(const d of command.options) {
                //Logger.Debug(`Adding Option ${d.name} of type ${d.type}`)
                d.name = d.name.toLowerCase(d.name);
                switch(d.type) {
                    case "str":
                        cmdData.addStringOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
                    case "num":
                        cmdData.addIntegerOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
                    case "int":
                        cmdData.addIntegerOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
                    case "bool":
                        cmdData.addBooleanOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
                    case "user":
                        cmdData.addUserOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
                    case "channel":
                        cmdData.addChannelOption(option => option.setName(d.name).setDescription(d.desc).setRequired(d.req));
                        break;
    
                }
            }
    
            if(command.permission != 0) { // in the old days i set 0 as everyone has access. with discord slashcommands, 0 means no one has access so we just skip adding permissions if its for everyone. im too lazy to change my ways.
                cmdData.setDefaultMemberPermissions(command.permission);
            }

            if(command.dm == false) {
                cmdData.setDMPermission(false);
            } else {
                cmdData.setDMPermission(true);
            }
    
            //client.CommandList.set(command.name, command);
            abot.commands.set(command.name, command); //add command data to the command list collection.

            commands.push(cmdData);
            Logger.Info('Command Loaded!');
        }
    }
    
    // Send the shit to discord
    (async () => {
        try {
           Logger.Debug("Sending command list to Discord via REST");
    
            await rest.put(Routes.applicationCommands(process.env.ApplicationID ?? ""), {body:commands}).catch((e: string) => {
                Logger.Error(e);

                return;
            }); 

            Logger.Debug("Discord acknowledged our command list.")
        } catch(e) {
            console.error(e);
        }
    })();

}

const loadGuildData = async(abot: Bot): Promise<void> => {
    const client = abot.clientObj;
    const guilds = client.guilds.cache;
    
    await guilds.each(g => {
        g.fetchOwner().then((owner) => {
            var data: GuildSettings = abot.LoadGuildSettings(g.id);

            abot.guilds.set(g.id, {name:g.name, owner:owner, settings: data});
        }).catch(Logger.Error);
    })
}