require("dotenv").config(); // load up environment config

import {Client, Collection, GuildMember, PermissionResolvable} from "discord.js";
import { Logger } from "./logging";

const filesys = require("fs");

export type CommandOption = {
    type: string,
    name:string,
    desc:string,
    req:boolean
}

export type Command = {
    name: string,
    description: string,
    usage: string,
    category: string,
    permission: PermissionResolvable,
    dm: boolean,
    options: Array<CommandOption>,
    exec: Function
}

export type GuildData = {
    name: string,
    owner: GuildMember,
    settings: GuildSettings
}

export type GuildSettings = {
    ModLogChannel: string,
    EnabledCommandCategories: Array<any>,
}

export class Bot {
    readonly clientObj: Client; // There should be no reason we'd need to reassign this variable.
    commands: Collection<string, Command> = new Collection<string, Command>; // Initialize a new, empty collection with type string for the key, and type object for the value.
    guilds: Collection<string, GuildData> = new Collection<string, GuildData>;
    readonly DefaultGuildSettings = {"ModLogChannel": "", "EnabledCommandCategories":["fun", ""]};

    constructor(client: Client, commandList?: Collection<string, Command>) { //collection key will be the command name, collection data will be the command object.
        this.clientObj = client;

        if(commandList)
            this.commands = commandList;

    }

    LoadGuildSettings(gid: string): GuildSettings {
        if(process.env.DataSaveType == "file") {
            const location: string = `./data/guilds/${gid}`;

            if(filesys.existsSync(location) && filesys.existsSync(`${location}/settings.json`)) {
                var data;

                try {
                    data = JSON.parse(filesys.readFileSync(`${location}/settings.json`));
                } catch(e) {
                    Logger.Error(`Failed to load guild settings for ${gid}: ${e}`);
                }

                for(const [key, value] of Object.entries(this.DefaultGuildSettings)) {
                    if(!(key in data)) {
                        Logger.Debug(`Guild ${gid} has outdated settings. Adding new settings.`);

                        data[key] = value;
                        this.SaveGuildSettings(gid, data);
                    }
                }

                return data;
            } else { // the guild is new/data was deleted or is missing
                this.SaveGuildSettings(gid, this.DefaultGuildSettings);

                return this.DefaultGuildSettings;
            }
        } else {
            // TODO: implement mysql shit
            return this.DefaultGuildSettings;
        }
    }

    SaveGuildSettings(gid: string, settings: GuildSettings): void {
        if(!filesys.existsSync(`./data/guilds/${gid}`))
            filesys.promises.mkdir(`./data/guilds/${gid}`).catch(Logger.Error)

        filesys.promises.writeFile(`./data/guilds/${gid}/settings.json`, JSON.stringify(settings)).catch(Logger.Error);
    }
}