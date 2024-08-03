const Discord = require("discord.js");
const config = require("../../config/config.json")
const emoji = require("../../config/emoji.json")

module.exports = {
  name: "painel-ticket", 
  description: '[ADM]  Envie o painel de tikcet.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "chat",
        description: "[ 👑 ] Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
],
  
    run: async(client, interaction) => {

        if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`)

        let chat = interaction.options.getChannel("chat")

        if (!chat.send)
        return interaction.reply({
            content: `**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
            ephemeral: true,
        })

        const botao = new Discord.ActionRowBuilder()
    .addComponents([
        new Discord.ButtonBuilder()
        .setCustomId('criarticket')
        .setLabel('Criar Ticket')
        .setEmoji(emoji.seta)
        .setStyle(Discord.ButtonStyle.Secondary)
    ])

          
           const embedTicket = new Discord.EmbedBuilder()
           .setColor(config.embed)
           .setAuthor({ name: 'SISTEMA DE ATENIDIMENTO VIA TICKET', iconURL: interaction.guild.iconURL({ dynamic: true, size: 2048 })})
           .setDescription(`Utilize este botão para abrir o seu ticket`)
           .setFooter({ text: `Lembre-se não abra um ticket sem necessidade` })
           .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 2048 }))
           .addFields(
               { name: 'Horários de atendimento', value: '``08:00 às 23:00 (UTC - 3)``', inline: true },
           )
         

         interaction.reply({ content: `✅ - Feito! Ticket enviado no canal ${chat}!`, ephemeral: true})
         chat.send({ components: [botao], embeds: [embedTicket] })
              
    

      } 

  }