const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "votacao",
    description: "[ 🛠️ ]Crie uma votação",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            description: "Qual canal vai ser a votação?",
            required: true
            
        },
        {
            name: "opção1",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual a primeira opção?",
            required: true
                
        },
        {
            name: "opção2",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual a segunda opção?",
            required: true
                    
        },
        
    ],


    run: async (client, interaction, args) => {

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`${emoji.x_} | Voce não tem perm`) 


        let canal = interaction.options.getChannel("canal");
        let op1  = interaction.options.getString("opção1");
        let op2  = interaction.options.getString("opção2");
        let cc = client.channels.cache.get(canal.id)

        let embed = new Discord.EmbedBuilder()
            .setTitle("Votação")
            .setDescription("Vote na opção que deseja!")
            .addFields({ name: "1️⃣ =", value: `${op1}`, inline: true})
            .addFields({ name: "2️⃣ = ", value: `${op2}`, inline: true})
            .setColor(config.embed)
   
            cc.send({content: `Votação iniciada por: ${interaction.user}`,embeds: [embed]}).then((msg) =>{
            msg.react("1️⃣")
            msg.react("2️⃣")
        }) 

    await interaction.reply({content: "Votação inciada!"})

    }
}