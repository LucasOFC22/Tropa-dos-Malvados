const Discord = require("discord.js")
const { Util } = require('discord.js');
const { parse } = require("twemoji-parser");
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
    name: "addemoji",
    description: "[ 🛠️ ] Adicione um emoji no seu servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "emoji",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Emoji que vc deseja adicionar",
            required: true
            
        },
        {

        name: "nome",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Nome do Emoji que vc deseja adicionar",
        required: true

        }
    ],

    
    run: async (client, interaction, args) => {

        if(!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return interaction.reply(`${emoji.x_} ${interaction.user} **|** Você não possui permissão para utilizar esse comando. \n\n>>> *Para utilizar esse comando você precisa da permissão* **Gerenciar emojis**.`);

        const emoji = interaction.options.getString("emoji")

        let emj = Util.parseEmoji(emoji)

        if(emj.id) {
            const link = `https://cdn.discordapp.com/emojis/${emj.id}.${emj.animated ? "gif" : "png"}`;
            const name = interaction.options.getString("nome")
                interaction.guild.emojis.create(
                `${link}`,
                `${name || `${emj.name}`}`
            ).catch(() => {
                return interaction.reply(`${emoji.x_} **|** Parece que este servidor atingiu o limite máximo de emojis.`);
            })
            interaction.reply(`<a:fogo:1014702658851975178> **|** Emoji adicionado com sucesso!`)
        } else {
            let CheckEmoji = parse(emoji, {assetType:"png"});
            if(!CheckEmoji[0])
            return interaction.reply(`${emoji.x_} **|** O emoji que você enviou é invalido.`)
        }
        }
}