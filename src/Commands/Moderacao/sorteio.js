const Discord = require("discord.js");
const ms = require("ms");
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
    name: `sorteio`,
    description: `Criar uma sorteio`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'tempo',
            description: 'Selecione a duração do sorteio (1d, 1h ou 1m, D = Dia / H = Hora / M = Minuto.)',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'canal',
            description: 'Selecione o canal que deseja realizar o sorteio',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: 'premio',
            description: 'Escreva qual vai ser o premio do sorteio',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async(client, interaction, args) => {

        let tempo = interaction.options.getString('tempo');
        let canalsorteio = interaction.options.getChannel('canal');
        let prize = interaction.options.getString('premio');
        let channelID = await logData.findOne({
          GuildID: interaction.guild.id,
      })
      let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg)
      if (!channel) return interaction.reply("Canal de Logs Mod não foi setado!") 
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))
    return interaction.reply({embeds: [new Discord.EmbedBuilder()
        .setDescription(`${interaction.user}** Você não tem permissão para usar este comando.**`)
        .setColor(config.embed)
      ]});

    const { guild } = interaction
    let Embed = new Discord.EmbedBuilder()
      .setTitle(`[SORTEIO]`)
      .setThumbnail(config.Logo)
      .setDescription(`**Criador do Sorteio:** ${interaction.user}\n**Prêmio:** ${prize}\n**Tempo de Duração:** ${tempo}\n\n**Para participar basta reagir com:** 💚`)
      .setTimestamp(Date.now() + ms(tempo))
      .setFooter({ text: 'O ganhador será anúnciado após o tempo ser esgotado !'})
      .setColor(config.embed)
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))

    return interaction.reply({embeds: [new Discord.EmbedBuilder()
        .setDescription(`${interaction.user}** Você não tem permissão para usar este comando.**`)
        .setColor(config.embed)
      ]});
      let logs = new Discord.EmbedBuilder()
      .setTitle(`Sistema de Sorteio`)
      .setThumbnail(config.Logo)
      .setDescription(`O staff ${interaction.user} iniciou um sorteio em ${canalsorteio}`)
      .setTimestamp(Date.now() + ms(tempo))
      .setColor(config.embed)
    let m = await canalsorteio.send({embeds: [Embed]})
    interaction.reply(`O sistema de sorteio foi iniciado`)
    m.react("💚");
    setTimeout(() => {
      if (m.reactions.cache.get("💚").count <= 1) {
        return interaction.channel.send({embeds: [new Discord.EmbedBuilder()
        .setDescription(`Nínguem reagiu, ou seja ninguém para sortear.\n O sorteio foi encerrado sem nenhum vencedor.`)
        .setColor(config.embed)
      ]
    });
  }

let winner = m.reactions.cache.get("💚").users.cache.filter((u) => !u.bot).random();
  let win = new Discord.EmbedBuilder()
      .setTitle(`Sistema de Sorteio`)
      .setThumbnail(config.Logo)
      .setDescription(`🎉 | Parabéns ${winner} por ganhar o sorteio valendo **${prize}**!`)
      .setTimestamp(Date.now() + ms(tempo))
      .setColor(config.embed)
      interaction.channel.send({ embeds: [win] })
    }, ms(tempo));
    
}};