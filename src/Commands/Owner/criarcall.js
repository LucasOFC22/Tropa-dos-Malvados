const Discord = require("discord.js")
const config = require("../../config/config.json")

module.exports = {
    name: "criarcall",
    description: "[ Restrito ]",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            description: "[ Restrito ] Seleciona o canal que deseja enviar a mensagem.",
            required: true
        },
           
    
    ],

run: async (client, interaction) => {
        let canal = interaction.options.getChannel("canal");
        if(interaction.user.id !== '1116750535345836055') {
            interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`) 

        }

        let embed= new Discord.EmbedBuilder()
            .setTitle(`Criacão de Call Privada`)
            .setColor(config.embed)
            .setDescription(`**Para criar uma call, clique no botão a baixo**\n\`Obs:\` Delete sua call no botão **DELETAR**, assim que desconectar da call.`)
        
            let botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("criarcall")
                .setLabel("CRIAR")
                .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                .setCustomId("deletecall")
                .setLabel("DELETAR")
                .setStyle(Discord.ButtonStyle.Danger),
            );
            interaction.reply({ content: `💚 | Seu setup de criacao de call privada foi enviada para ${canal}!` , ephemeral: true })
            canal.send({ embeds: [embed], components: [botao], ephemeral: true }).then( () => {
            });
    }
}