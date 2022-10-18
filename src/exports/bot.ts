require("dotenv").config(); // load up environment config

import {Client, Collection, PermissionResolvable} from "discord.js";

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

export class Bot {
    readonly clientObj: Client; // There should be no reason we'd need to reassign this variable.
    commands: Collection<string, Command> = new Collection<string, Command>; // Initialize a new, empty collection with type string for the key, and type object for the value.

    constructor(client: Client, commandList?: Collection<string, Command>) { //collection key will be the command name, collection data will be the command object.
        this.clientObj = client;

        if(commandList)
            this.commands = commandList;

    }
}