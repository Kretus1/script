const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
	"enable": true,
	"name": "about",
	"description": "See information about bots.",
	"category": "me",
	"permissions": {
		"client": [PermissionsBitField.Flags.SendMessages]
	},
	"usage": "about",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
	"data": {
		"name": module.exports.name,
		"name_localizations": {
			"th": "เกี่ยวกับ"
		},
		"description": module.exports.description,
		"description_localizations": {
			"th": "ดูข้อมูลเกี่ยวกับบอท"
		},
	},
	async execute(interaction) {
		const clientFetch = await interaction.client.user.fetch();
		const clientAvatar = interaction.client.user.avatarURL();
		const clientUsername = interaction.client.user.username;
		const clientColor = clientFetch.accentColor;
		const contentUpdate = interaction.client.config.update;
		const aboutEmbed = new EmbedBuilder()
			.setTitle(interaction.client.translate.commands.about.my_profile)
			.setDescription(interaction.client.translate.commands.about.my_profile_detail.replace("%s", clientUsername))
			.setColor(clientColor)
			.setTimestamp(new Date(contentUpdate))
			.setAuthor({ "name": clientUsername, "iconURL": clientAvatar, "url": "https://shiorus.web.app/" })
			.setFooter({ "text": interaction.client.translate.commands.about.update_on });

		await interaction.reply({ "embeds": [aboutEmbed] });
	}
};