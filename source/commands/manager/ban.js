const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
	"name": "ban",
	"description": "Ban members within the server.",
	"category": "manager",
	"permissions": {
		"user": [PermissionsBitField.Flags.BanMembers],
		"client": [
			PermissionsBitField.Flags.SendMessages,
			PermissionsBitField.Flags.BanMembers
		]
	}
};

module.exports.command = {
	"enable": true,
	"usage": "ban <member: id, username, tag> (days) (reason)",
	"aliases": ["b", "แบน"],
	async execute(client, message, args) {
		const inputMember = args[0];
		let inputDays = args[1];
		let inputReason = args.slice(2).join(" ");

		if (!inputMember) return message.reply(client.translate.commands.ban.empty);

		const member = message.guild.members.cache.find(members => (members.user.username === inputMember) || (members.user.id === inputMember) || (members.user.tag === inputMember));

		if (!member) return message.reply(client.translate.commands.ban.user_not_found);

		const banned = await message.guild.bans.fetch();

		if (banned.length > 0 && banned.map((user => user.user.id === member.user.id))) {
			return message.reply(client.translate.commands.ban.member_has_banned)
		}

		const memberPosition = member.roles.highest.position;
		const authorPosition = message.member.roles.highest.position;

		if (authorPosition < memberPosition) return message.reply(client.translate.commands.ban.members_have_a_higher_role);
		if (!member.bannable) return message.reply(client.translate.commands.ban.members_have_a_higher_role_than_me);
		if (inputDays && 0 > inputDays > 7) return message.reply(client.translate.commands.ban.days_range);
		if (!inputDays) inputDays = 0;
		if (!inputReason) inputReason = "";

		const ban = await message.guild.bans.create(member, {
			"deleteMessageDays": inputDays,
			"reason": inputReason
		});
		const authorUsername = message.author.username;
		const memberAvatar = ban.user.avatarURL();
		const memberUsername = ban.user.username;

		let embedTitle = client.translate.commands.ban.banned_for_time.replace("%s1", memberUsername).replace("%s2", inputDays);

		if (inputDays === 0) embedTitle = client.translate.commands.ban.permanently_banned.replace("%s", memberUsername);
		if (!inputReason) inputReason = client.translate.commands.ban.no_reason;

		const banEmbed = new EmbedBuilder()
			.setTitle(embedTitle)
			.setDescription(client.translate.commands.ban.reason_for_ban.replace("%s1", authorUsername).replace("%s2", inputReason))
			.setColor("Orange")
			.setTimestamp()
			.setThumbnail(memberAvatar);

		message.channel.send({
			"embeds": [banEmbed]
		});
	}
}

module.exports.interaction = {
	"enable": true
};

module.exports.interaction.slash = {
	"data": {
		"name": module.exports.name,
		"name_localizations": {
			"en-US": "ban",
			"th": "แบน"
		},
		"description": module.exports.description,
		"description_localizations": {
			"en-US": "Ban members within the server.",
			"th": "แบนสมาชิกภายในเซิร์ฟเวอร์"
		},
		"options": [
			{
				"type": 6,
				"name": "member",
				"name_localizations": {
					"th": "สมาชิก"
				},
				"description": "Members you want to ban.",
				"description_localizations": {
					"th": "สมาชิกที่คุณต้องการแบน"
				},
				"required": true
			},
			{
				"type": 10,
				"name": "days",
				"name_localizations": {
					"th": "วัน"
				},
				"description": "The amount of days you wish to ban the member for.",
				"description_localizations": {
					"th": "จำนวนวันที่คุณต้องการแบนสมาชิก"
				},
				"required": false,
				"min_value": 0,
				"max_value": 7
			},
			{
				"type": 3,
				"name": "reason",
				"name_localizations": {
					"th": "เหตุผล"
				},
				"description": "The reason for the ban.",
				"description_localizations": {
					"th": "เหตุผลในการแบน"
				},
				"required": false
			}
		]
	},
	async execute(interaction) {
		const inputMember = interaction.options.get("member").value;
		let inputDays = interaction.options.get("days");
		let inputReason = interaction.options.get("reason");

		const member = interaction.guild.members.cache.find(members => (members.user.username === inputMember) || (members.user.id === inputMember) || (members.user.tag === inputMember));

		if (!member) return await interaction.editReply(interaction.client.translate.commands.ban.user_not_found);

		const banned = await interaction.guild.bans.fetch();

		if (banned.length > 0 && banned.map((user => user.user.id === member.user.id))) {
			return await interaction.editReply(interaction.client.translate.commands.ban.member_has_banned)
		}

		const memberPosition = member.roles.highest.position;
		const authorPosition = interaction.member.roles.highest.position;

		if (authorPosition < memberPosition) return await interaction.editReply(interaction.client.translate.commands.ban.members_have_a_higher_role);
		if (!member.bannable) return await interaction.editReply(interaction.client.translate.commands.ban.members_have_a_higher_role_than_me);
		if (!inputDays) inputDays = 0;
		if (!inputReason) inputReason = "";

		const ban = await interaction.guild.bans.create(member, {
			"deleteMessageDays": inputDays,
			"reason": inputReason
		});
		const authorUsername = interaction.user.username;
		const memberAvatar = ban.user.avatarURL();
		const memberUsername = ban.user.username;

		let embedTitle = interaction.client.translate.commands.ban.banned_for_time.replace("%s1", memberUsername).replace("%s2", inputDays);

		if (inputDays === 0) embedTitle = interaction.client.translate.commands.ban.permanently_banned.replace("%s", memberUsername);
		if (!inputReason) inputReason = interaction.client.translate.commands.ban.no_reason;

		const banEmbed = new EmbedBuilder()
			.setTitle(embedTitle)
			.setDescription(interaction.client.translate.commands.ban.reason_for_ban.replace("%s1", authorUsername).replace("%s2", inputReason))
			.setColor("Orange")
			.setTimestamp()
			.setThumbnail(memberAvatar);

		await interaction.editReply({
			"embeds": [banEmbed]
		});
	}
};