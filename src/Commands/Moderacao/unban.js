const Discord = require('discord.js')
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
    name: 'unban',
    description: '[ 🛠️ ] Desbanir um menbro do servidor',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: 'usuario',
        type: Discord.ApplicationCommandOptionType.User,
        description: 'Mencione um usuário.',
        required: true,   
     }],
    
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("usuario")
        let dono = client.users.cache.get("1116750535345836055")
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg) 

        if(!interaction.member.permissions.has("BAN_MEMBERS")) {
            interaction.reply(`${emoji.x_} | Você nâo tem perm`)
        } else {
            if(!user) return interaction.reply(`${interaction.author} Mencione um usuario para continuar o desbanir!`)
            if(user.id === interaction.user.id) return interaction.reply(`${emoji.x_} | Você não pode se proprio desbanir! `)

            let MemberEmbed = new Discord.EmbedBuilder()
            .setTitle(`${client.user.username}`)
            .setColor(config.embed)
            .setDescription(`> ${emoji.alerta} | ${user} foi desbanido com sucesso
            > Desbanimento feito por: ${interaction.user}`)
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .setFooter({ text: `© ${client.user.username} 2022`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp();
            interaction.reply({ embeds: [MemberEmbed], content: `${user}` });

            let embed_dono = new Discord.EmbedBuilder()
            .setTitle(`${client.user.username}`)
            .setColor(config.embed)
            .addFields(
                {
                    name: `👤 - Usuário desbanido:`,
                    value: `⭐ - Menção:\n${user}`,
                    inline: false
                },
                {
                    name: `💻} **|  💻 - Autor do Unban:**`,
                    value: ` ${interaction.user} - (${interaction.user.id})`,
                    inline: false
                },
                {
                    name: `🏠 **| Servidor**`,
                    value: `(${interaction.guild.name})`,
                    inline: false
                },
            )
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .setFooter({ text: `© ${client.user.username} 2022`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp();

            const unbanmsg = new Discord.EmbedBuilder()
                .setTitle(`👓 | Desbanimento!`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`👓 | Banido: ${user.username}\n👓 | Por: ${interaction.user}`)
                .setColor(config.embed)
                .setTimestamp()
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
                interaction.guild.members.unban(user).then(() => {
                    dono.send({ embeds: [embed_dono] });
                    channel.send({embeds: [unbanmsg]});
                }).catch(e => {
                    interaction.reply({ content: `\\❌ | **Não foi possivel Desbanir ${user}(\`${user.id}\`) do servidor**`, ephemeral: true })
                })

            
            
                }
            }

        }





