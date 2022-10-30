import { Guild } from "discord.js";
import { Bot } from "src/exports/bot";

export default (abot: Bot): void => {
    const client = abot.clientObj;

    client.on("guildCreate", (g: Guild) => {
        abot.SaveGuildSettings(g.id, abot.DefaultGuildSettings);
    });
}
