//
import {Client, Collection} from "discord.js";

export class Bot {
    readonly clientObj: Client; // There should be no reason we'd need to reassign this variable.
    commands: Collection<string, object> = new Collection<string, object>; // Initialize a new, empty collection with type string for the key, and type object for the value.

    constructor(client: Client, commandList?: Collection<string, object>) { //collection key will be the command name, collection data will be the command object.
        this.clientObj = client;

        if(commandList)
            this.commands = commandList;

    }
}