const { Events, EmbedBuilder } = require("discord.js");
const { getDatabase, ref, child, set } = require("firebase/database");
const { settingsData } = require("../utils/databaseUtils");
const { IDConvertor } = require("../utils/miscUtils");

module.exports = {
    "name": Events.GuildRoleCreate,
    "once": false,
    execute(role) {
        settingsData(role.client, role.guild);

        const guildRef = child(child(child(ref(getDatabase(), "projects"), IDConvertor(role.client.user.username)), "guilds"), role.guild.id);
        const channelRef = child(guildRef, "notification/roleCreate");
        const channelSnapshot = role.client.api.guilds[role.guild.id].notification.roleCreate;

        if (typeof channelSnapshot === "boolean") {
            const notification = role.guild.channels.cache.find(channels => channels.id === channelSnapshot);
            const roleCreate = new EmbedBuilder()
                .setTitle(role.client.translate.events.roleCreate.role_notification)
                .setDescription(role.client.translate.events.roleCreate.role_create.replace("%s", role.id))
                .setTimestamp()
                .setColor("Yellow");

            if (!notification) return;

            notification.send({ "embeds": [roleCreate] });
        } else {
            set(channelRef, channelSnapshot ? true : false).then(() => module.exports.execute(role));
        }
    }
};