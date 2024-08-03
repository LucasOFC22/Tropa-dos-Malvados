const client = require("../../../index");
const Discord = require("discord.js")
const verificacao = require("../../models/verificacao")

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
  if (interaction.customId === 'verificacao') {

    let verify = await verificacao.findOne({ GuildID: interaction.guild.id, Discord: interaction.user.id })
    if (verify) {
   let bb = verify.Channel; 
   interaction.reply({ content: `❌ | ${interaction.user} você já uma verificacao`, ephemeral: true }) 
   } else if (verify === null) {
      
      const modal100 = new Discord.ModalBuilder()
      .setCustomId('modal100')
      .setTitle('Verification System')

      const nomeper = new Discord.TextInputBuilder()
      .setCustomId('nomeper')
      .setLabel('Qual seu nome?')
      .setMaxLength(20)
      .setMinLength(1)
      .setPlaceholder('Informe seu nome in-game')
      .setStyle(Discord.TextInputStyle.Short)
  
      const p1 = new Discord.ActionRowBuilder().addComponents(nomeper);
      modal100.addComponents(p1)
      await interaction.showModal(modal100);
  
    }}
  }
 if (!interaction.isModalSubmit()) return;
 if (interaction.customId === 'modal100') {

  const nomePersonagem = interaction.fields.getTextInputValue('nomeper');
  const membro = "1269109338375585792";
  const member = interaction.member;

  let verify = await verificacao.findOne({ GuildID: interaction.guild.id, Discord: interaction.user.id })
    if (verify) {
   interaction.reply({ content: `❌ | Já faz sua verificação`, ephemeral: true }) 
   } else if (verify === null) {

  const novoApelido = `${nomePersonagem}`
  await member.setNickname(novoApelido);
  await interaction.guild.members.cache.get(member.id).roles.add(membro);

    interaction.reply({ content: `${interaction.user} | Você fez sua verificação com sucesso e sua entrada na tropa já está liberada `, ephemeral: true })
    await verificacao.create({ 
      GuildID: interaction.guild.id,
      Discord: interaction.user.id,
      Name: `${nomePersonagem}`
    })

    const emb = new Discord.EmbedBuilder()
    .setColor("Red")
    .setTitle('Novo Membro!')
    .setDescription(`**Discord:** ${interaction.user}\n**Personagem:** \`${nomePersonagem}\``)
    .setFooter({ text: `Verification System | Tropa Dos Malvados` })
    let canal = client.channels.cache.find((ch) => ch.id === "1269109338375585792");
    await canal.send({ embeds: [emb] })

}}
})