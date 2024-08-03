const Discord = require("discord.js")
const config = require("../../config/config.json")
const emoji = require("../../config/emoji.json")

module.exports = {
    name: "emojiinfo",
    description: "[ 🤸‍♀️ ] Ver informações de um emoji!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
         name: "name",
         description: "Qual o nome do emoji?",
         type: Discord.ApplicationCommandOptionType.String,
         required: true
        }
    ],

    run: async (client, interaction, args) => {
            try {
                let name = interaction.options.getString("name") 
                let emoji = client.emojis.cache.find(emoji => emoji.toString() === name) || client.emojis.cache.find(emoji => emoji.name === name) || client.emojis.cache.get(name);

                if (emoji && emoji.animated !== undefined) {
                    if (!emoji.animated) {

                let img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
                let botao = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setStyle(5)
                            .setLabel("Faça o download")
                            .setEmoji("📎")
                            .setURL(img)
                    );

                    let embed = new Discord.EmbedBuilder()
                    .setColor(config.embed)
                    .setTitle("Informações do Emoji:")
                    .setThumbnail(`${img}`)
                    .addFields(
                        {
                            name: `> \📝 Nome do emoji:`,
                            value: `\`${emoji.name}\``,
                            inline: false
                        },
                        {
                            name: `> \🆔 ID do emoji:`,
                            value: `\`${emoji.id}\``,
                            inline: false
                        },
                        {
                            name: `> \🧿 Menção do emoji:`,
                            value: `\`${emoji}\``,
                            inline: false
                        },
                        {
                            name: `> \🖼 O emoji é:`,
                            value: `\`Imagem (png/jpg)\``,
                            inline: false
                        }
                    );

                    interaction.reply({ embeds: [embed], components: [botao] })
                } else {

                    let img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;
                    let botao = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(5)
                                .setLabel("Faça o download")
                                .setEmoji("📎")
                                .setURL(`${img}`)
                        );
    
                        let embed = new Discord.EmbedBuilder()
                        .setColor(config.embed)
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(img)
                        .addFields(
                            {
                                name: `> \📝 Nome do emoji:`,
                                value: `\`${emoji.name}\``,
                                inline: false
                            },
                            {
                                name: `> \🆔 ID do emoji:`,
                                value: `\`${emoji.id}\``,
                                inline: false
                            },
                            {
                                name: `> \🧿 Menção do emoji:`,
                                value: `\`${emoji}\``,
                                inline: false
                            },
                            {
                                name: `> \🖼 O emoji é:`,
                                value: `\`Gif\``,
                                inline: false
                            }
                        );

                        interaction.reply({ embeds: [embed], components: [botao] })
                        }
            }

        } catch (e) { 
            console.log(e)
            interaction.reply(`${emoji.x_} | ${interaction.user} Ops! Não consegui identificar o emoji.`)
        }

        }

    }