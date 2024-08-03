const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "anunciar",
    description: "[ 🛠️ ] Fazer anuncio",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'canal',
            description: 'Canal onde será enviado seu anuncio.',
            required: true,
            type: Discord.ApplicationCommandOptionType.Channel,
        },
    ], 
    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            interaction.reply({content: `${emoji.x_} | Você não tem perm.`})

        } else {
            let chat = interaction.options.getChannel('canal');

            let embed_2 = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`${interaction.user} Qual será o título do anúncio?`);
            interaction.reply({ embeds: [embed_2] }).then(() => {
                let coletor = interaction.channel.createMessageCollector({
                    filter: (i) => i.author.id == interaction.user.id,
                    max: 1,
                });

                coletor.on("collect", async (titulo) => {
                    titulo.delete();

                    let embed_3 = new Discord.EmbedBuilder()
                        .setColor(config.embed)
                        .setDescription(`${interaction.user} Qual será a descrição do anúncio?`);
                    interaction.editReply({ embeds: [embed_3], fetchReply: true }).then(() => {
                        let coletor = interaction.channel.createMessageCollector({
                            filter: (i) => i.author.id == interaction.user.id,
                            max: 1,
                        });

                        coletor.on("collect", async (desc) => {
                            desc.delete();
                            coletor.stop()

                                    let titulo2 = titulo.content
                                    let desc2 = desc.content

                                    interaction.editReply(`O anúncio foi enviado para ${chat} com sucesso.`).then(m => {
                                        chat.send({
                                            embeds: [
                                                new Discord.EmbedBuilder()
                                                    .setTitle(titulo2)
                                                    .setDescription(desc2)
                                                    .setColor(config.embed)
                                                    .setTimestamp(new Date)
                                                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })

                                            ]
                                        }).catch(e => { m.edit({ content: `> ${interaction.user} Algo deu errado.`, embeds: [] }) })
                                    })
                                })
                            })
                        })
                    })
                }
            }
        }
