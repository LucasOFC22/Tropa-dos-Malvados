const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
name: "kick",
description: "[ 🛠️ ]Expulse um membro",
type: Discord.ApplicationCommandType.ChatInput,
options: [
    {
        name: "user",
        type: Discord.ApplicationCommandOptionType.User,
        description: "Qual user deseja kickar?",
        required: true
        
        },
        {
            name: "motivo",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual o motivo?",
            required: false
            
            },

],

run: async (client, interaction, args) => {
    if (!interaction.guild) return interaction.reply({ content: "${emoji.x_} | Você não perm" })
    let user = interaction.options.getUser("user");
    const memberTarget = interaction.guild.members.cache.get(user.id);
    let rr = interaction.options.getString("motivo");
    let rra = interaction.options.getString("motivo");
    if(rra == null) rra = `Sem motivo`;
    if(rr == null) rr = `Kickado pelo dono do server!`;
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `${emoji.x_} | Você não tem perm.`})
    let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
    if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
    let gg = channelID.Channel
    let channel = interaction.guild.channels.cache.get(gg)
    if(user.id == interaction.user.id) return interaction.reply({content: `Você não pode se kickar!`});
    if(user.id == interaction.guild.me.id) return interaction.reply({content: `Você não pode me kickar!`});
    if(user.id == interaction.guild.ownerId) return  interaction.reply({content: `Você não pode kickar o dono do server!`});
    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return interaction.reply({content: `Você não tem perm para isso!`});
    if(!interaction.guild.members.cache.get(client.user.id).permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return interaction.reply({content: `Eu não tenho perm para isso!`});
    if(interaction.guild.ownerId) {

    memberTarget.kick();

    let MemberEmbed = new Discord.EmbedBuilder()
        .setTitle(`${client.user.username} Kick`)
        .setColor(config.embed)
        .setDescription(`> <:warn:979386982323073084> | Ops.. ${user}, você foi expulso do servidor\n
        > Motivo ${rr}
        > Expulsão feita por: ${interaction.user.tag}`)
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp();
        channel.send({ embeds: [MemberEmbed]})
    return  interaction.reply({ embeds: [MemberEmbed]})

    }



    let MemberEmbed22 = new Discord.EmbedBuilder()
        .setTitle(`${client.user.username} Kick`)
        .setColor(config.embed)
        .setDescription(`> <:warn:979386982323073084> | Ops.. ${user}, você foi expulso do servidor\n
        > Motivo ${rra}
        > Expulsão feita por: ${interaction.user.tag}`)
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp();
    interaction.reply({ embeds: [MemberEmbed22]});
    channel.send({ embeds: [MemberEmbed22]})
    memberTarget.kick()
}}

    
    

