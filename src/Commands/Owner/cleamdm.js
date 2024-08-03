const Discord = require("discord.js")
const config = require("../../config/config.json")

module.exports = {
    name: "cleardm",
    description: "Limpar mensagens do bot na sua DM.",
  

    run: async (client, interaction) => {
      const emoji = require('../../config/emoji.json')
  const dm = await interaction.user.createDM();

  const embed = new Discord.EmbedBuilder()
  .setTitle(`Limpeza DM`)
  .setDescription(`Estou limpando a DM, aguarde`)
  .setColor(config.embed)
  .setThumbnail(config.Logo)

  await interaction.reply({ embeds: [embed] });

  const deleteMessages = await client.channels.cache
    .get(dm.id)
    .messages.fetch({ limit: 99 });

  await deleteMessages.map((msg) => {
    if (msg.author.bot) {
      msg.delete();
    }
  });

  const embed_1 = new Discord.EmbedBuilder()
  .setTitle(`Limpeza DM`)
  .setDescription(`Todas as mensagens do Bot foram deletas`)
  .setColor(config.embed)
  .setThumbnail(config.Logo)

  await interaction.editReply({ embeds: [embed_1] });
}
}