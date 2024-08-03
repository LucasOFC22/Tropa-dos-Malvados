const client = require("../../../index");
const Discord = require('discord.js')
const axios = require('axios')
const config = require("../../config/config.json")
const mongo = require("mongoose")
mongo.set("strictQuery", true);

client.on('ready', async () => {
    let lucas = [
        `🤖 | Bot Oficial Do Servidor Central CityVB`,
        `💻 | Meu criador: ch4ves.xit, Obrigado meu querido por me dar a vida ❤️`,
        `📨 | Todos Direitos Reservados - 2024`,
        `😊 | Fui criado para ajudar e divertir vocês!`,
      ],
      fera = 0;
    setInterval( () => client.user.setActivity(`${lucas[fera++ % lucas.length]}`, {
          type: "PLAYING"
        }), 1000 * 30);
        client.user
    .setStatus("dnd")
    console.clear();
       
    mongo.connection.on('connected', () =>{
    console.log('🍃 MongoDB on')
  })
    client.MongoConnect()
  
    console.log(`🤖 Bot on em ${client.user.tag} `)
    
  
  })
