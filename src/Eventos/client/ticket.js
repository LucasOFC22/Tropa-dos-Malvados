
const client = require("../../../index")
const Discord = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const config = require("../../config/config.json")
const emoji = require("../../config/emoji.json")
const ticketData = require('../../models/ticket');
const LogTicket = require('../../models/logs-ticket');
const rank = require('../../models/rank-avaliacoes');

const embedStaff = new Discord.EmbedBuilder()
    .setAuthor({ name: `Tropa Dos Malvados | Staff`, iconURL: config.Logo, url: "https://discord.gg/DUkHQPQVC6" })
    .setDescription("Base")
    .setColor(config.embed)

const embedBase = new Discord.EmbedBuilder()
    .setColor(config.embed)

    
const embedExit = new Discord.EmbedBuilder()
.setColor(config.embed)

    const buttonLink = new Discord.ActionRowBuilder();
    const rowChannel = new Discord.ActionRowBuilder();

    let FecharTicket = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setLabel(` - Fechar Ticket`)
        .setEmoji(emoji.lixeira)
        .setCustomId('fechar')
        .setStyle(Discord.ButtonStyle.Danger),
        new Discord.ButtonBuilder()
      .setLabel(` - Sair Ticket`)
      .setEmoji(emoji.staff)
      .setCustomId('sairticket')
      .setStyle(Discord.ButtonStyle.Danger),
      new Discord.ButtonBuilder()
      .setLabel(` - Assumir Ticket`)
      .setEmoji(emoji.notificacao)
      .setCustomId('assumirticket')
      .setStyle(Discord.ButtonStyle.Primary),
      new Discord.ButtonBuilder()
      .setLabel(` - Botões staff`)
      .setEmoji(emoji.staff)
      .setCustomId('botoesstaff')
      .setStyle(Discord.ButtonStyle.Primary),
    )

    let buttonsStaff = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
      .setLabel(` - Adicionar Membro`)
      .setEmoji("➕")
      .setCustomId('addmem')
      .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
      .setLabel(` - Remover Membro`)
      .setEmoji("➖")
      .setCustomId('removemem')
      .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
      .setLabel(` - Renomear Ticket`)
      .setEmoji("🔧")
      .setCustomId('renomearticket')
      .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
      .setLabel(` - Notificar Membro`)
      .setEmoji(emoji.notificacao)
      .setCustomId('notticket')
      .setStyle(Discord.ButtonStyle.Secondary),
    )

    const embedTicketAberto = new Discord.EmbedBuilder()
    .setDescription(`Tropa Dos Malvados | Você ja tem um ticket aberto`)
    .setColor(config.embed)

    const embedNotificado = new Discord.EmbedBuilder()
    .setColor(config.embed)

    const embedDm = new Discord.EmbedBuilder()
    .setColor(config.embed)

    const embedDmReabrir = new Discord.EmbedBuilder()
    .setColor(config.embed)

const rowExited = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId('fechar')
            .setEmoji(emoji.lixeira)
            .setLabel('- Fechar Ticket')
            .setStyle(Discord.ButtonStyle.Danger),
        new Discord.ButtonBuilder()
            .setCustomId('reabrirticket')
            .setLabel('- Reabrir Ticket')
            .setStyle(Discord.ButtonStyle.Secondary),
    );

const rowExit = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId('buttonsExit')
            .setLabel('Sair do Canal')
            .setStyle(Discord.ButtonStyle.Secondary)
    );

client.on("interactionCreate", async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'criarticket') {
      let embed = new Discord.EmbedBuilder()
      .setTitle(`Selecione o tipo de ticket que você deseja criar selecionado no **MENU** a baixo.`)
      .setColor(config.embed)
      .setFooter({ text: `Aguarde até que o sistema registre as suas informações.` })

  let rowTicket = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('select2')
                .setPlaceholder('Selecionar a categoria!')
                .addOptions(
                    {
                        label: ' - Duvidas',
                        description: 'Clique aqui para tirar qualquer Dúvidas ou Perguntas.',
                        emoji: '🙋‍♀️',
                        value: 'duv',
                    },
                    {
                        label: ' - Denuncia',
                        description: 'Clique aqui caso queria fazer uma denuncia.',
                        emoji: '🩸',
                        value: 'denuncia',
                    },
                    
                ),
                
           )
           interaction.reply({ embeds: [embed], components: [rowTicket], ephemeral: true }).then(m => {
            setTimeout(() => {
              interaction.deleteReply()
            }, 10000) 
          })
                  }
                }
  if (interaction.isStringSelectMenu()) {
    let choice = interaction.values[0]
    const member = interaction.member
    const guild = interaction.guild
    if (choice == 'duv') {
      let verify = await ticketData.findOne({ GuildID: interaction.guild.id, User: interaction.user.id })
      if (verify) {
        let bb = verify.Channel;
        interaction.reply({ content: `❌ | ${interaction.user} você já possui um ticket aberto <#${bb}>.`, ephemeral: true })
      } else if (verify === null) {
        
        guild.channels.create({
          name: `👺┇duv-${interaction.user.username}`,
          type: 0,
          parent: `1269128876706238606`,
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
            },
            {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
            },
            {
              id: "1269130831671332904",
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
            },
          ]

        }).then((duv) => {
          interaction.reply({ content: `**💾 - Criando Ticket...**`, ephemeral: true }).then(() => {
            setTimeout(() => {
              let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setLabel(` - Ticket`)
                  .setEmoji(`🎫`)
                  .setStyle(5)
                  .setURL(`https://discord.com/channels/${interaction.guild.id}/${duv.id}`) 
              )
              const emb_criacao = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`Clique nos botões abaixo ir direto pro canal do ticket!`)
                .setTimestamp(new Date())
                .setFooter({ text: `System Ticket | Tropa Dos Malvados` })
              interaction.editReply({ embeds: [emb_criacao], components: [direciandoaocanal], content: null, ephemeral: true, })
            }, 670)
          }).catch((e) => {
            return interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, }) && console.log(e);
          });

          let embed_suporte = new Discord.EmbedBuilder()
            .setColor(config.embed)
            .setTitle("**Suporte**")
            .setDescription(`> Olá ${interaction.user}, **esse é seu ticket** \n\n > Em instantes algum atendente irá te atender, **lembrando que pode demorar um pouco.** \n\n > Enquanto isso, **vá descrevendo sua necessidade, dúvida ou o que deseja adquirir.** \n\n > Quanto **mais características** você colocar no seu pedido, **mais eficiente e rápido** será nosso atendimento.`)
            .setTimestamp()
            .setThumbnail(config.Logo)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) });
            
          ticketData.create({
            GuildID: interaction.guild.id,
            User: interaction.user.id,
            Channel: duv.id
          })

          duv.send({ embeds: [embed_suporte], components: [FecharTicket] })
        })
      }

    } else if (choice == 'denuncia') {
      let verify = await ticketData.findOne({ GuildID: interaction.guild.id, User: interaction.user.id })
      if (verify) {
        let bb = verify.Channel;
        interaction.reply({ content: `❌ | ${interaction.user} você já possui um ticket aberto <#${bb}>.`, ephemeral: true })
      } else if (verify === null) {
        guild.channels.create({
          name: `🩸┇Denuncia-${interaction.user.username}`,
          type: 0,
          parent: `1269128876706238606`, 
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
            },
            {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
            },
            {
              id: "1269130831671332904",
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
            },
          ]

        }).then((denuncia) => {
          interaction.reply({ content: `**💾 - Criando Ticket...**`, ephemeral: true }).then(() => {
            setTimeout(() => {
              let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setLabel(` - Ticket`)
                  .setEmoji(`🎫`)
                  .setStyle(5)
                  .setURL(`https://discord.com/channels/${interaction.guild.id}/${denuncia.id}`)
              )
              const emb_criacao = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`Clique nos botões abaixo ir direto pro canal do ticket!`)
                .setTimestamp(new Date())
                .setFooter({ text: `System Ticket | Tropa Dos Malvados`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
              interaction.editReply({ embeds: [emb_criacao], components: [direciandoaocanal], content: null, ephemeral: true, })
            }, 670)
          }).catch((e) => {
            return interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, }) && console.log(e);
          });

          let embed_denuncia = new Discord.EmbedBuilder()
            .setColor(config.embed)
            .setDescription(`*Fale, o que você precisa?*`)
            .setThumbnail(config.Logo)
            .addFields(
              {
                name: '\`\`\`Denúncias - Modelo:\`\`\`',
                value: `*Seu nome:*\n*Nome do Envolvido:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n*Provas:*\n`,
                inline: false,
              },
            )

          ticketData.create({
            GuildID: interaction.guild.id,
            User: interaction.user.id,
            Channel: denuncia.id
          })
          denuncia.send({ embeds: [embed_denuncia], components: [FecharTicket] })
        })
      }
    } 
  } else if (interaction.isButton) {
    if (interaction.customId === "botoesstaff") {
      if (!interaction.member.roles.cache.some(role => [
        "1269109333770240185",
        "1269129495768600668",
        "1269129419063169127",
      ].includes(role.id))) {
        embedBase.setDescription(`${process.env.emojiUncheckTicket} | ${interaction.member}, Somente a Staff Pode Abrir o Painel`)
        interaction.reply({ embeds: [embedBase], ephemeral: true })
      } else {
      embedStaff.setDescription("<@" + interaction.member + ">" + ", Seja bem vindo ao menu **STAFF**, para executar alguma funcão basta clicar em um **BOTÃO** de sua preferência");
      interaction.reply({ embeds: [embedStaff], components: [buttonsStaff], ephemeral: true })
      }
  } else if (interaction.customId === "sairticket") {
      const data23 = await ticketData.findOne({
        GuildID: interaction.guild.id,
        Channel: interaction.channel.id
      });
      let cliente = data23.User
      interaction.channel.permissionOverwrites.delete(cliente)
          embedExit.setColor(config.embed)
          embedExit.setAuthor({ name: `Tropa Dos Malvados`, iconURL: config.Logo })
          embedExit.setDescription(`> O ticket do usuário ${interaction.user} está para ser fechado. Agora você só precisa confirmar o fechamento dele. \n\n > **Clique no botão abaixo para fazer essa confirmação.**`)
          interaction.channel.send({ embeds: [embedExit], components: [rowExited] })
          interaction.channel.members.forEach((m) => {
              interaction.channel.permissionOverwrites.delete(m.id)
          })
    } else if (interaction.customId === "addmem") {
      if (!interaction.member.roles.cache.some(role => [
        "1269109333770240185",
        "1269129495768600668",
        "1269129419063169127",
      ].includes(role.id))) {
        embedBase.setDescription(`${process.env.emojiUncheckTicket} | ${interaction.member}, Somente a Staff Pode Abrir o Painel`)
        interaction.reply({ embeds: [embedBase], ephemeral: true })
      } else {
      let embed_mem = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`${interaction.user} informe o ID do MEMBRO`)
            interaction.reply({ embeds: [embed_mem], ephemeral: true }).then(() => {
                let coletor = interaction.channel.createMessageCollector({
                    filter: (i) => i.author.id == interaction.user.id,
                    max: 1,
                });

                coletor.on("collect", async (novomembro) => {
                  const idMencionado = novomembro.content
                  novomembro.delete();
                  interaction.channel.permissionOverwrites.edit(idMencionado, {
                    ViewChannel: true,
                    SendMessages: true
                  })
                  let embed_mem2 = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`${interaction.user} o membro mencionado foi adicionado ao ticket!`);
                  interaction.editReply({ embeds: [embed_mem2] })
                })
                coletor.on('end', (novomembro) => {
                  if (coletor.size === 0) {
                    console.log('O usuário não forneceu um novo nome da sala dentro do tempo limite.');
                  }
              })
              })
            }
    } else if (interaction.customId === "removemem") {
      if (!interaction.member.roles.cache.some(role => [
        "1269109333770240185",
        "1269129495768600668",
        "1269129419063169127",
      ].includes(role.id))) {
        embedBase.setDescription(`${process.env.emojiUncheckTicket} | ${interaction.member}, Somente a Staff Pode Abrir o Painel`)
        interaction.reply({ embeds: [embedBase], ephemeral: true })
      } else {
      let embed_mem = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`${interaction.user} informe o ID do MEMBRO`)
            interaction.reply({ embeds: [embed_mem], ephemeral: true }).then(() => {
                let coletor = interaction.channel.createMessageCollector({
                    filter: (i) => i.author.id == interaction.user.id,
                    max: 1,
                });

                coletor.on("collect", async (novomembro) => {
                      const idMencionado = novomembro.content
                  interaction.channel.permissionOverwrites.edit(idMencionado, {
                    ViewChannel: false,
                    SendMessages: false
                  })
                  let embed_mem2 = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`${interaction.user} o membro mencionado foi removido deste ticket!`);
                  interaction.editReply({ embeds: [embed_mem2] })
                })
                coletor.on('end', (novomembro) => {
                    if (coletor.size === 0) {
                      console.log('O usuário não forneceu um novo nome da sala dentro do tempo limite.');
                    }
                })
              })
              }
            }
            else if (interaction.customId === "reabrirticket") {
              if (!interaction.member.roles.cache.some(role => [
                "1269109333770240185",
                "1269129495768600668",
                "1269129419063169127",
              ].includes(role.id))) {
                embedBase.setDescription(`${process.env.emojiUncheckTicket} | ${interaction.member}, Somente a Staff Pode Abrir o Painel`)
                interaction.reply({ embeds: [embedBase], ephemeral: true })
              } else {
                const data23 = await ticketData.findOne({
                  GuildID: interaction.guild.id,
                  Channel: interaction.channel.id
                });
                let cliente = data23.User
                const member = await client.users.fetch(cliente);
                embedBase.setDescription(` | ${interaction.member}, Reabriu o ticket de ${member}`)
                interaction.channel.permissionOverwrites.edit(member, { ViewChannel: true })
                interaction.channel.send({ embeds: [embedBase] })
                embedDmReabrir.setDescription(` | ${member}, Seu ticket foi reaberto por ${interaction.member}`)
                let channel = `https://discord.com/channels/${config.guild}/${interaction.channel.id}`
                rowChannel.setComponents(
                            new Discord.ButtonBuilder()
                                .setLabel('Ticket')
                                .setStyle(5)
                                .setURL(channel)
                        )
                        member.send({ embeds: [embedDmReabrir], components: [rowChannel] }).catch(() => { })
                      }
                    } else if (interaction.customId === "assumirticket") {
              if (!interaction.member.roles.cache.some(role => [
                "1269109333770240185",
                "1269129495768600668",
                "1269129419063169127",
              ].includes(role.id))) {
                embedBase.setDescription(`${process.env.emojiUncheckTicket} | ${interaction.member}, Somente a Staff Pode Abrir o Painel`)
                interaction.reply({ embeds: [embedBase], ephemeral: true })
              } else {
              const data23 = await ticketData.findOne({
                GuildID: interaction.guild.id,
                Channel: interaction.channel.id
              });
              let cliente = data23.User
              let staffxz = data23.Staff || null;
              if (staffxz) {
                interaction.reply({ content: `**O staff <@${staffxz}> já assumiu o ticket de <@${cliente}>**`, ephemeral: true })
        } else if (staffxz === null) {
              await ticketData.findOneAndUpdate({
                GuildID: interaction.guild.id,
                Channel: interaction.channel.id,
                Staff: interaction.user.id
              });
              let embed_assumir = new Discord.EmbedBuilder()
                .setColor(config.embed)
                .setDescription(`> Ticket __***Assumiu***__ por ${interaction.user}`);
                  interaction.channel.send({ embeds: [embed_assumir] })
                  interaction.reply({ content: `**Você assumiu o ticket de <@${cliente}>**`, ephemeral: true })
                  const user = await client.users.fetch(cliente);
                  let channel = `https://discord.com/channels/${config.guild}/${interaction.channel.id}`
                  rowChannel.setComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('Ticket')
                        .setStyle(5)
                        .setEmoji(emoji.notificacao)
                        .setURL(channel)
                )
                  embedBase.setDescription(`${user}, seu __***Ticket***__ foi __***Assumido***__\n\n__***Assumido por:***__ ${interaction.user}\n\nClique no __***botão***__ abaixo para ir para o ticket`)
                  embedBase.setColor(config.embed)
                  user.send({ embeds: [embedBase], components: [rowChannel] })
            }
          }
            } else if (interaction.customId === "notticket") { 
              if (!interaction.member.roles.cache.some(role => [
                "1269109333770240185",
                "1269129495768600668",
                "1269129419063169127",
              ].includes(role.id))) {
                embedBase.setDescription(` | Você não pode notificar este membero`)
                interaction.reply({ embeds: [embedBase], ephemeral: true })
              } else {
                interaction.deferUpdate()
                        let channel = `https://discord.com/channels/${config.guild}/${interaction.channel.id}`
                        const data23 = await ticketData.findOne({
                          GuildID: interaction.guild.id,
                          Channel: interaction.channel.id
                        });
                        let cliente = data23.User
                        const user = await client.users.fetch(cliente);
                        rowChannel.setComponents(
                            new Discord.ButtonBuilder()
                                .setLabel('Ir para sala')
                                .setStyle(5)
                                .setURL(channel)
                        )
                        embedBase.setDescription(` Hey ${user}, ${interaction.member}está esperando sua resposta na sala do seu **TICKET** em aberto, apareça o quanto antes para darmos continuidade no seu atendimento.`)
                        embedBase.setColor(config.embed)
                        embedNotificado.setDescription(` ${user} recebeu o **POKE** com sucesso em sua **DM**.`)
                        user.send({ embeds: [embedBase], components: [rowChannel] })
                        interaction.channel.send({ embeds: [embedNotificado] })
                        }
        }
        else if (interaction.customId === "renomearticket") { 
          if (!interaction.member.roles.cache.some(role => [
            "1269109333770240185",
            "1269129495768600668",
            "1269129419063169127",
          ].includes(role.id))) {
            embedBase.setDescription(` | Você não pode renomear este ticket`)
            interaction.reply({ embeds: [embedBase], ephemeral: true })
          } else {
            embedBase.setDescription(` | ${interaction.member}, informe o novo **NOME** da **SALA**`)
            embedBase.setColor(config.embed)
            interaction.reply({ embeds: [embedBase], ephemeral: true })
              const filter = (message) => message.author.id === interaction.user.id;
              const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });
          
              collector.on('collect', async (message) => {
                const newName = message.content;
                interaction.channel.setName(newName)
                  .then(() => {
                    embedBase.setDescription(` | ${interaction.user} Renomeu o nome da sala para: ${newName}`);
                    interaction.channel.send({ embeds: [embedBase] });
                  })
                  .catch((error) => {
                    console.error('Erro ao renomear o canal:', error);
                  });
              });
          
              collector.on('end', (collected) => {
                if (collected.size === 0) {
                  console.log('O usuário não forneceu um novo nome da sala dentro do tempo limite.');
                }
              });
            }
          } else if (interaction.customId === "fechar") {
            if (!interaction.member.roles.cache.some(role => [
              "1269109333770240185",
              "1269129495768600668",
              "1269129419063169127",
            ].includes(role.id))) {
              embedBase.setDescription(` | ${interaction.member}, Somente a staff pode __***Fechar tickets***__, mas você pode sair do ticket`)
              interaction.reply({ embeds: [embedBase], ephemeral: true })
            } else {

    interaction.reply({
      ephemeral: false,
      embeds: [
        new Discord.EmbedBuilder()
          .setColor(config.embed)
          .setDescription(`Sucesso, ticket fechando em: \`3\` segundos`)
          .setTimestamp()
          .setFooter({ text: `System Ticket | Tropa Dos Malvados` })
      ]
    }).then((aviso) => {
      setTimeout(() => {
        interaction.editReply({
          ephemeral: true,
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embed)
              .setDescription(`Sucesso, ticket fechando em: \`2\` segundos`)
              .setFooter({ text: `System Ticket | Tropa Dos Malvados` })
          ]
        }, 1000).then((aviso1) => {
          setTimeout(() => {
            interaction.editReply({
              ephemeral: true,
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor(config.embed)
                  .setDescription(`Sucesso, ticket fechando em: \`1\` segundos`)
                  .setFooter({ text: `System Ticket | Tropa Dos Malvados` })
              ]
            })
          }, 1000);
        })
          .then(() => {
            setTimeout(async () => {
              const cliente = interaction.guild.members.cache.get(
                interaction.channel.topic.slice(0, 100)
              );
              let channel = interaction.channel;
              const attachment = await discordTranscripts.createTranscript(channel, {
                fileName: `${channel.name}.html`,
              });

              interaction.channel.delete();
              const channelDeleted = interaction.channel.name;

              let embedLog = new Discord.EmbedBuilder()

                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}` })
                .setColor(config.embed)
                .setTitle(`${channelDeleted}`)
                .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                .addFields(
                  {
                    name: `🆔 - ID de quem fechou:`,
                    value: `\`\`\`${interaction.user.id}\`\`\``,
                    inline: true,
                  },
                  {
                    name: `🆔 - ID de quem abriu:`,
                    value: `\`\`\`${cliente.id}\`\`\``,
                    inline: true,
                  },
                  {
                    name: `💬 - Quem fechou:`,
                    value: `${interaction.user}`,
                    inline: false,
                  },
                  {
                    name: `💬 - Quem abriu:`,
                    value: `${cliente.user}`,
                    inline: false,
                  },
                  {
                    name: `🎫 - Ticket:`,
                    value: `${channelDeleted}`,
                    inline: true,
                  },
                )
                .setTimestamp()
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)


              const data99 = await ticketData.findOne({
                GuildID: interaction.guild.id
              });
              let botao_log = new Discord.ActionRowBuilder()
              .addComponents(
                new Discord.ButtonBuilder()
                  .setLabel(`Transcript`)
                  .setStyle("5")
                  .setEmoji(`🧾`)
                  .setURL(`https://cdn.discordapp.com/attachments/1109994016583471165/${attachment.id}/${attachment.name}`)
              )

              let embedLogUser = new Discord.EmbedBuilder()
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}` })
                .setColor(config.embed)
                .setTitle(`Ticket Fechado!`)
                .setDescription(`*Ticket fechado, informações:*`)
                .addFields(
                  {
                    name: `💬 - Quem fechou:`,
                    value: `${interaction.user}`,
                    inline: false,
                  },
                  {
                    name: `💬 - Quem abriu:`,
                    value: `${cliente.user}`,
                    inline: false,
                  },
                )
                .setTimestamp()
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

              let verify = await LogTicket.findOne({ GuildID: interaction.guild.id })
              let canal_log = verify.Channel;

              let channellll = await interaction.guild.channels.cache.get("1269132747658760273")
              let teste = await interaction.guild.channels.cache.get(`${canal_log}`).send({ components: [botao_log], files: [attachment], embeds: [embedLog] })
              const attachment2 = teste.attachments.first()
              cliente.user.send({ embeds: [embedLogUser] })
              const embedLogs = new Discord.EmbedBuilder()
              .setAuthor({ name: `Tropa Dos Malvados | Ticket`, iconURL: config.Logo, url: "https://discord.gg/gStcEfN69K" })
              .addFields(
                { name: 'Autor:', value: `<@${cliente.id}>`, inline: true },
                { name: 'Fechou:', value: `<@${interaction.user.id}>`, inline: true },
                { name: 'Logs:', value: `[Abrir](${attachment2.url})`, inline: true },
                )
                .setColor(config.embed)
            buttonLink.setComponents(
                new Discord.ButtonBuilder()
                    .setStyle(5)
                    .setLabel('Logs')
                    .setURL(attachment2.url)
            )
             await interaction.guild.channels.cache.get(`${canal_log}`).send({ embeds: [embedLogs], components: [buttonLink] })
             teste.delete()

             const data34 = await ticketData.findOne({
              GuildID: interaction.guild.id,
              User: cliente.id
            });
            let staff = data34.Staff
            await ticketData.findOneAndDelete({
              GuildID: interaction.guild.id,
              User: cliente.id
            });

            if (staff === null) {
              return;
            } else if (staff) {

              const rowavaliacao = new Discord.ActionRowBuilder()
                                               .addComponents(
                                                 new Discord.ButtonBuilder()
                                                   .setCustomId('1')
                                                   .setEmoji(emoji.estrela)
                                                   .setLabel('1')
                                                   .setStyle(1),
                                               )
                                               .addComponents(
                                                 new Discord.ButtonBuilder()
                                                   .setCustomId('2')
                                                   .setEmoji(emoji.estrela)
                                                   .setLabel('2')
                                                   .setStyle(1),
                                               )
                                               .addComponents(
                                                 new Discord.ButtonBuilder()
                                                   .setCustomId('3')
                                                   .setEmoji(emoji.estrela)
                                                   .setLabel('3')
                                                   .setStyle(1),
                                               )
                                               .addComponents(
                                                 new Discord.ButtonBuilder()
                                                   .setCustomId('4')
                                                   .setEmoji(emoji.estrela)
                                                   .setLabel('4')
                                                   .setStyle(1),
                                               )
                                               .addComponents(
                                                 new Discord.ButtonBuilder()
                                                   .setCustomId('5')
                                                   .setEmoji(emoji.estrela)
                                                   .setLabel('5')
                                                   .setStyle(1),
                                               );

                                             let avaliacao = "Nenhuma avaliação enviada..."
                                             const embed2 = new Discord.EmbedBuilder()
                                              .setTitle(`${emoji.coroalaranja} | Avaliação Staff`)
                                              .addFields({ name:`${emoji.info} Informações:`, value: `Escolha uma nota para o atendimento`, inline: false })
                                              .addFields({ name:`${emoji.staff} Staff:`, value: `<@${staff}>`, inline: false })
                                              .addFields({ name:`${emoji.estrela} Estrelas:`, value: `Aguardando...`, inline: false })
                                              .setColor(config.embed)
                                              let embed = await cliente.user.send({ embeds: [embed2], components: [rowavaliacao] })
                                              const interacaoavaliar = await embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
                                             interacaoavaliar.on("collect", async (interaction) => {
                                               if (interaction.user.id != interaction.user.id) {
                                                 return;
                                               }
                                               interaction.deferUpdate()
                                               embed.reply("❤️ | Obrigado pela avaliação!").then((msg) => {
                                               setTimeout(() => {
                                                msg.delete();
                                              }, 15000);
                                            })
                                               if (interaction.isButton()) {
                                                let verify = await rank.findOne({ GuildID: config.guild, Discord: staff }) || null;
                                                let tt = verify ? verify.Avaliacoes || 0 : null;
                                                if (verify) {
                                                  const customIdNumber = Number(interaction.customId);
                                                  if (!isNaN(customIdNumber)) {
                                                  await rank.findOneAndUpdate({ 
                                                    GuildID: config.guild,
                                                    Discord: staff,
                                                  }, {
                                                    Avaliacoes: (Number(tt) + customIdNumber)
                                                  })
                                                }
                                        } else if (verify === null) {
                                            await rank.create({ 
                                              GuildID: config.guild,
                                              Discord: staff,
                                              Avaliacoes: Number(interaction.customId)
                                            })
                                          }
                                                var textoest = "";
                                                 let estrelas = interaction.customId.replace(`${emoji.estrela}`, "")
                                                 for (let i = 0; i < estrelas; i++) {
                                                  textoest += "<:Estrela:1114345343782502420>";
                                                }
                                                
                                                     let avaliacao = `${textoest} (${estrelas})`
                                                     const embednew = new Discord.EmbedBuilder()
                                                       .setTitle(`${emoji.coroalaranja} | Avaliação Staff`)
                                                       .addFields({ name:`${emoji.info} Usuário:`, value: `${cliente.user}`, inline: false })
                                                       .addFields({ name:`${emoji.staff} Staff:`, value: `<@${staff}>`, inline: false })
                                                       .addFields({ name:`${emoji.estrela} Estrelas:`, value: `${avaliacao}`, inline: false })
                                                       .setColor(config.embed)
                                                        channellll.send({ embeds: [embednew] })
                                                        embed.delete()
                                              
                                     }
                          })
                        }
            }, 1000);
          })
      })
    })
  }}
}
})