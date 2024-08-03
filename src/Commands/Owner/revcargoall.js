const Discord = require ('discord.js')
const config = require("../../config/config.json")

module.exports = {
name: "removercargoall",
description: '[ 👑 ] Rev cargo all!',
type: Discord.ApplicationCommandType.ChatInput,
options: [
    {
        name: "cargo",
        type: Discord.ApplicationCommandOptionType.Role,
        description: "[ 👑 ] Seleciona o cargo que deseja remover dos membros.",
        required: true
        
        },
       

],

run: async (client, interaction, args) => {

    if (!interaction.guild.members.cache.get(client.user.id).permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) return interaction.reply("Não tenho permissão.")
    if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`) 
     let role = interaction.options.getRole("cargo");
     let server = interaction.guild;

    const pedroremovercargo = new Discord.EmbedBuilder()
    .setTitle("Gerenciamento de Cargos")
    .setDescription(` _Cargo Removido:_ ${role}\n _Quem utilizou o comando:_ ${interaction.user}\n _Removendo o cargo para:_ \`${server.memberCount}\` Membros`)
    .setColor(config.embed)

    interaction.guild.members.cache.forEach(member => {
    member.roles.remove(role.id).catch(e => console.error(e));
        })
     interaction.reply({ embeds: [pedroremovercargo] });


    }
}