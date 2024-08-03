const Discord = require('discord.js');

module.exports = {
    name: 'verificacao',
    description: 'verificacao membros',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`) 

        let embed = new Discord.EmbedBuilder()
        .setColor(`#FF0000`)
        .setTitle(`Verificação`)
        .setDescription(`> Clique no **botão** abaixo para realizar sua verificacao\n> Não clique por teste, não será possível clicar 2x!`)
        .setFooter({ text: `Verification System | Tropa Dos Malvados` })
       
        const botao = new Discord.ActionRowBuilder()
    .addComponents([
        new Discord.ButtonBuilder()
        .setCustomId('verificacao')
        .setLabel('Iniciar')
        .setEmoji('<a:Verify:955208590170415155>')
        .setStyle(Discord.ButtonStyle.Success)
    ])
        interaction.channel.send({ embeds: [embed], components: [botao] })
        interaction.reply({ content: `Mensagem enviada com sucesso!`, ephemeral: true})
    },
};
