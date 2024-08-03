const Discord = require ('discord.js')
const config = require ("../../config/config.json")

module.exports = {
    name: "serverbot",
    description: "[ 👑 ] Ver quais servidores o bot estar",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

      if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`) 
      interaction.reply(`Verifique o seu privado!`);
      let guildMap = client.guilds.cache.map( g => `**${g.name}** | **${g.id}**`).join("\n")
      const embed = new Discord.EmbedBuilder()
       .setAuthor({ name: '📚 Aqui estao meus servidores' })
       .setDescription(`${guildMap}`)
       .setColor(config.embed)
       .setFooter({ text: `Comando requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
       .setTimestamp()
    interaction.user.send({embeds: [embed]})
    }
}