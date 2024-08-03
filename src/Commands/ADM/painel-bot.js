const Discord = require('discord.js')
const config = require("../../config/config.json")

module.exports = {
    name: 'painel-bot',
    description: '[ADM] Configure o bot',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
    ],

    run: async (client, interaction) => {

        if (interaction.user.id != "1116750535345836055") {
            interaction.reply({
                content: `❌ | Você nn tem acesso`,
                ephemeral: true,
              });
              
        } else {

            interaction.reply({
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("alterar_username")
                                .setLabel("Alterar Username")
                                .setEmoji("📛")
                                .setStyle(Discord.ButtonStyle.Success),
                            new Discord.ButtonBuilder()
                                .setCustomId("alterar_avatar")
                                .setLabel("Alterar Avatar")
                                .setEmoji("👴")
                                .setStyle(Discord.ButtonStyle.Success),
                        )
                ],
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setThumbnail(config.Logo)
                        .setTitle(`⚙️| Painel de Configuração do Bot`)
                        .setDescription(`
                        ⚙️| Status do Bot: *ON*
                        
                        **Use os botões abaixo pra configurar o bot**`)
                        .setColor(config.embed)
                ],
            })
        }
    }
}