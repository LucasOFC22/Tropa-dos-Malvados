const fs = require("fs")
const config = require('../config/config.json');
const chalk = require('chalk');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest');
/**
 * Variável que armazena o token da aplicação.
 * @const {string}
 */
const TOKEN = config.BotToken

/**
 * Variável que armazena o ID da aplicação.
 * @const {string}
 */
const CLIENT_ID = config.client

const rest = new REST({ version: '10' }).setToken(TOKEN);
/**
 * Função que carrega e registra os comandos da aplicação.
 * @function
 * @param {Client} client - Instância do cliente do Discord.js
 */
module.exports = async (client) => {
    const slashCommands = [];

    fs.readdirSync('./src/Commands/').forEach(async dir => {
        const files = fs.readdirSync(`./src/Commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const slashCommand = require(`../Commands/${dir}/${file}`);
            slashCommands.push({
                name: slashCommand.name,
                description: slashCommand.description,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                default_member_permissions: slashCommand.default_member_permissions
                    ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString()
                    : null,
            });

            if (slashCommand.name) {
                client.slashCommands.set(slashCommand.name, slashCommand);
            }
        }
    });

    (async () => {
        try {
            await rest.put(config.guild ? Routes.applicationGuildCommands(CLIENT_ID, config.guild) : Routes.applicationCommands(CLIENT_ID), {
                body: slashCommands,
            });
        } catch (error) {
            console.log(error);
        }
    })();

    fs.readdir(`./src/Eventos/`, (erro, pasta) =>{

        pasta.forEach(subpasta =>{
      
        fs.readdir(`./src/Eventos/${subpasta}/`, (erro, arquivos) =>{
      
        arquivos.forEach(arquivo =>{
      
                
        if(!arquivo.endsWith('.js')) return;
         
        require(`../Eventos/${subpasta}/${arquivo}`);
    });

    });

  });

});
};