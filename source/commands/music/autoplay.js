const { PermissionsBitField } = require("discord.js");

module.exports = {
    "enable": true,
    "name": "autoplay",
    "description": "Turn on / off automatic music playing",
    "category": "music",
    "permissions": {
        "client": [PermissionsBitField.Flags.SendMessages]
    },
    "usage": "autoplay",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
    "data": {
        "name": module.exports.name,
        "name_localizations": {
            "th": "เล่นอัตโนมัติ"
        },
        "description": module.exports.description,
        "description_localizations": {
            "th": "เปิด/ปิดการเล่นเพลงอัตโนมัติ"
        }
    },
    async execute(interaction) {
        const queue = interaction.client.music.getQueue(interaction);

        if (!queue) return await interaction.reply(interaction.client.translate.commands.autoplay.no_queue);
        if (interaction.user.id !== queue.songs[0].user.id && queue.autoplay === false) return await interaction.reply(interaction.client.translate.commands.autoplay.not_queue_owner);

        const mode = interaction.client.music.toggleAutoplay(interaction);

        await interaction.reply(mode ? interaction.client.translate.commands.autoplay.on : interaction.client.translate.commands.autoplay.off);
    }
};