const client = require("../../../index")
const Discord = require('discord.js');
const config = require("../../config/config.json")

// ============================================================= //

client.on("guildMemberAdd", async (member) => {
    let channel = client.channels.cache.get("1066503608125890570");
    let lucas_contador = member.guild.memberCount;
    let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL()})
      .setDescription(`🧡 | Seja bem-vindo a Central!\n\nOlá, ${member.user} Espero que goste do nosso servidor! Tenha um otimo RP!\n\nLeia as <#1066503614073417838> para não ser banido!\nAtualmente temos ${lucas_contador}° Membros!`)
      .setColor(config.embed)
      .setThumbnail(member.user.avatarURL({ dynamic: true }));
  
    channel.send({ embeds: [embed] });
  });