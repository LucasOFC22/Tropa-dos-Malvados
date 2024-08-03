const Discord = require("discord.js");
const db = require('quick.db')
const logData = require('../../models/logs');
const ms = require("ms");
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "tempmute",
    description: "[ 🛠️ ] Castigo Temporário !",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
    {
        name: 'user',
        description: 'Qual membro você quer ver a advertência?',
        type: Discord.ApplicationCommandOptionType.User,
        required: true,

    },
    {
        name: "tempo",
        type: Discord.ApplicationCommandOptionType.Number,
        description: "Qual o tempo?",
        required: true
        
    }],

    run: async(client, interaction, args) => {
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`${emoji.x_} | Voce não tem perm`) 
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg) 

        if(user.id == interaction.guild.ownerId) return  interaction.reply({content: `${emoji.x_} | Você não pode banir o dono do server!`});
        let servidor = interaction.guild.id;

        let cargo_mute = await db.get(`cargo_mute_${interaction.guild.id}`);
        let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

        if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return interaction.reply(`**${interaction.user} O cargo mute não está configurado no servidor.**`);

        const membro = interaction.options.getUser('user');
        let tempo = interaction.options.getNumber("tempo");

        if (!membro || !tempo || isNaN(tempo) || tempo === "0") return interaction.reply({ content: `${interaction.user}`, embeds: [embed_1] });

        let tempo_ms = ms(`${tempo} minutes`);

        let embed_2 = new Discord.EmbedBuilder()
        .setColor(config.embed)
        .setDescription(`**O usuário ${membro} foi mutado com sucesso durante \`${tempo} minutos\`.**`);

        let embed_unmute = new Discord.EmbedBuilder()
        .setColor(config.embed)
        .setDescription(`**O usuário ${membro} foi desmutado.**`);

        channel.send({ embeds: [embed_2] })
        interaction.reply({ embeds: [embed_2] }).then(msg => {


            client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {

                msg.edit({ content: `**Ops! Algo deu errado.**`, embeds: [] });

            });
                

            setTimeout( () => {
                channel.send({ embeds: [embed_unmute] });
                let m = interaction.channel.send({ embeds: [embed_unmute] });

                client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.remove(cargo_mute_no_servidor.id).catch(err => {

                m.edit({ content: `**Ops! Algo deu errado.**`, embeds: [] });
    
                })
                

            }, tempo_ms);
    });


  } 
}