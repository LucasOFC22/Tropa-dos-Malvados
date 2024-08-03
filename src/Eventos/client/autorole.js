const client = require('../../../index')
const Discord = require('discord.js')
const autorole = require('../../models/autorole')

// ============================================================= //

client.on("guildMemberAdd", async (member) => {

    let procurnado = await autorole.findOne({ GuildID: member.guild.id }) || 0;
    let cargo = member.guild.roles.cache.get(procurnado.Role)

    if (!cargo) return console.log(`❌ ┃ O cargo configurado no script, não existe no servidor ${member.guild.name}.`)

    try {
        member.roles.add(cargo.id)
    } catch (e) {
        console.log("Autorole:\n"+e)
    }
})