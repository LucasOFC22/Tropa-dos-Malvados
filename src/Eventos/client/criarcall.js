const client = require("../../../index");
const Discord = require('discord.js')
const config = require('../../config/config.json');

client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'criarcall') {
  
                let quantmenu = new Discord.EmbedBuilder()
                    .setColor(config.embed)
                    .setTitle("CONFIG CALL")
                    .setFooter({ text: `Criar-Call System | Tropa Dos Malvados` })
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(` • *Selecione a quantidade de membors que poderam entrar na chamada.*`)
                    .setTimestamp(new Date());
  
  
                let quantidadedeusers = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("2users")
                    .setLabel("2")
                    .setStyle("1"),
                    new Discord.ButtonBuilder()
                    .setCustomId("4users")
                    .setLabel("4")
                    .setStyle("1"),
                    new Discord.ButtonBuilder()
                    .setCustomId("6users")
                    .setLabel("6")
                    .setStyle("1"),
                    new Discord.ButtonBuilder()
                    .setCustomId("10users")
                    .setLabel("10")
                    .setStyle("1"),
                );
                interaction.reply({embeds: [quantmenu], components:[quantidadedeusers], ephemeral: true}) 
        }
        else if (interaction.customId === "deletecall") {
            let canalquevaideletar = client.channels.cache.find(c => c.name == `🔒┊${interaction.user.username}`)
            if (!canalquevaideletar) return;
            interaction.reply({content: `✅ - ${interaction.user}, sua call foi deletada!`, ephemeral: true}).then(() => {
                    canalquevaideletar.delete();
            })
        }
        else if (interaction.customId === '2users') {
            if (interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`)) {
                let call = interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`);
                interaction.reply({ content: `*Você já possui uma call criada!* ${call}.\n *clique em* **DELETE** *ela e crie uma nova com a configuração desejada!*`, ephemeral: true })
            }
            else
            {
                interaction.guild.channels.create({
                    name: `🔒┊${interaction.user.username}`,
                    type: 2, 
                    parent: '1269136427841486929',
                    userLimit: 2,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["Connect", "ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                            
                        },
                    ]
            }).then(call => interaction.reply({ content: `*Sua call foi criada!* ${call}`, ephemeral: true }))
        }
        }
        else if (interaction.customId === '4users') {
            if (interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`)) {
                let call = interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`);
                interaction.reply({ content: `*Você já possui uma call criada!* ${call}.\n *clique em* **DELETE** *ela e crie uma nova com a configuração desejada!*`, ephemeral: true })
            }
            else
            {
                interaction.guild.channels.create({
                    name: `🔒┊${interaction.user.username}`,
                    type: 2, 
                    parent: '1269136427841486929',
                    userLimit: 4,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["Connect", "ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                            
                        },
                    ]
            }).then(call => interaction.reply({ content: `*Sua call foi criada!* ${call}`, ephemeral: true }))
        }
        }
        else if (interaction.customId === '6users') {
            if (interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`)) {
                let call = interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`);
                interaction.reply({ content: `*Você já possui uma call criada!* ${call}.\n *clique em* **DELETE** *ela e crie uma nova com a configuração desejada!*`, ephemeral: true })
            }
            else
            {
                interaction.guild.channels.create({
                    name: `🔒┊${interaction.user.username}`,
                    type: 2, 
                    parent: '1269136427841486929',
                    userLimit: 6,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["Connect", "ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                            
                        },
                    ]
            }).then(call => interaction.reply({ content: `*Sua call foi criada!* ${call}`, ephemeral: true }))
        }
        }
        else if (interaction.customId === '10users') {
            if (interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`)) {
                let call = interaction.guild.channels.cache.find(call => call.name === `🔒┊${interaction.user.username}`);
                interaction.reply({ content: `*Você já possui uma call criada!* ${call}.\n *clique em* **DELETE** *ela e crie uma nova com a configuração desejada!*`, ephemeral: true })
            }
            else
            {
                interaction.guild.channels.create({
                    name: `🔒┊${interaction.user.username}`,
                    type: 2, 
                    parent: '1269136427841486929',
                    userLimit: 10,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["Connect", "ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                            
                        },
                    ]
            }).then(call => interaction.reply({ content: `*Sua call foi criada!* ${call}`, ephemeral: true }))
        }
        }
    }
  })

  client.on('voiceStateUpdate', async (oldState, newState) => {
    // Verifica se o membro saiu de um canal de voz
    if (!oldState.channel && newState.channel) return; // Entrou em um canal de voz
    if (oldState.channel && !newState.channel) { // Saiu de um canal de voz
        let canal = oldState.channel.guild.channels.cache.find(c => c.name === `🔒┊${oldState.member.user.username}`);
        if (canal) {
            // Verifica se o membro que saiu é o criador do canal
            if (canal.permissionOverwrites.cache.get(oldState.member.id)) {
                canal.delete()
                    .catch(console.error);
            }
        }
    }
});