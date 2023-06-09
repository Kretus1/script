const { Events, EmbedBuilder, StickerFormatType } = require("discord.js");
const { getDatabase, ref, child, set } = require("firebase/database");
const { settingsData } = require("../utils/databaseUtils");
const { IDConvertor } = require("../utils/miscUtils");

module.exports = {
    "name": Events.GuildStickerCreate,
    "once": false,
    execute(sticker) {
        settingsData(sticker.client, sticker.guild);

        const guildRef = child(child(child(ref(getDatabase(), "projects"), IDConvertor(sticker.client.user.username)), "guilds"), sticker.guild.id);
        const channelRef = child(guildRef, "notification/stickerCreate");
        const channelSnapshot = sticker.client.api.guilds[sticker.guild.id].notification.stickerCreate;

        if (typeof channelSnapshot === "boolean") {
            const notification = sticker.guild.channels.cache.find(channels => channels.id === channelSnapshot);
            const stickerCreate = new EmbedBuilder()
                .setTitle(sticker.client.translate.events.stickerCreate.sticker_notification)
                .setDescription(sticker.client.translate.events.stickerCreate.sticker_create.replace("%s", sticker.name))
                .setThumbnail(sticker.format !== StickerFormatType.Lottie ? sticker.url : "")
                .setTimestamp()
                .setColor("Yellow");

            if (!notification) return;

            notification.send({ "embeds": [stickerCreate] });
        } else {
            set(channelRef, channelSnapshot ? true : false).then(() => module.exports.execute(sticker));
        }
    }
};