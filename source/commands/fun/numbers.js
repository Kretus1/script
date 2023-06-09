const { PermissionsBitField } = require("discord.js");

module.exports = {
    "enable": true,
    "name": "numbers",
    "description": "Random number.",
    "category": "fun",
    "permissions": {
        "client": [PermissionsBitField.Flags.SendMessages]
    },
    "usage": "numbers <min(Number)> <max(Number)>",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
    "data": {
        "name": module.exports.name,
        "name_localizations": {
            "th": "ตัวเลข"
        },
        "description": module.exports.description,
        "description_localizations": {
            "th": "สุ่มตัวเลข"
        },
        "options": [
            {
                "type": 10,
                "name": "min",
                "name_localizations": {
                    "th": "ต่ำสุด"
                },
                "description": "The minimum number",
                "description_localizations": {
                    "th": "จำนวนขั้นต่ำ"
                },
                "required": true
            },
            {
                "type": 10,
                "name": "max",
                "name_localizations": {
                    "th": "สูงสุด"
                },
                "description": "The maximum number",
                "description_localizations": {
                    "th": "จำนวนสูงสุด"
                },
                "required": true
            }
        ]
    },
    async execute(interaction) {
        let inputMin = interaction.options.getNumber("min");
        let inputMax = interaction.options.getNumber("max");

        if (inputMin > inputMax) {
            let temp = inputMax;
            inputMax = inputMin;
            inputMin = temp;
        }

        const result = Math.floor(Math.random() * (inputMax - inputMin + 1)) + inputMin;

        await interaction.reply(interaction.client.translate.commands.numbers.result.replace("%s", result));
    }
}