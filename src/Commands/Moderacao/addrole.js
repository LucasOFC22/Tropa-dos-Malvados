const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
name: "addcargo",
description: "[ 🛠️ ] Addcargo em algum usuario",
type: Discord.ApplicationCommandType.ChatInput,
options: [
       {
        name: "user",
        type: Discord.ApplicationCommandOptionType.User,
        description: "seleciona o membro que deseja adicionar o cargo.",
        required: true
        
        },
   
    {
        name: "cargo",
        type: Discord.ApplicationCommandOptionType.Role,
        description: "seleciona o cargo que deseja setar.",
        required: true
        
        },
       

], 


run: async (client, interaction, args) => {
    
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `${emoji.x_} | Você não tem perm.`}) 
    let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
    let gg = channelID.Channel
    if (!gg) return interaction.reply("Canal de Logs Mod não foi setado!") 
    let channel = interaction.guild.channels.cache.get(gg)
    
    let member = interaction.options.getUser("user");
    let role = interaction.options.getRole("cargo");

     const pedroaddcargo = new Discord.EmbedBuilder()
     
     .setTitle("Gerenciamento de Cargos")
     .addFields({ name: `👤 Usuario`, value: `${member}`})
     .addFields({ name: `👉 Cargo Adicionado`, value: `${role}`})
     .setColor(config.embed)

     await interaction.guild.members.cache.get(member.id).roles.add(role) 
     channel.send({ embeds: [pedroaddcargo] })
     interaction.reply({ embeds: [pedroaddcargo] }); 


}
}