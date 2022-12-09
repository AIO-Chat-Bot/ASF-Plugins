const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs')
const fetch = require('node-fetch');
const c_owns = require('../config/c_owns.json')
const t_owns = require('../translations/t_owns.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("owns")
    .setDescription("Checks if user has a game")
    .addStringOption(option =>
        option.setName('name')
          .setDescription('Name of the bot')
          .setRequired(true))
    .addStringOption(option =>
        option.setName('game')
          .setDescription('Game id or name')
          .setRequired(true)),
  run: async (interaction) => {

                fetch("http://"+c_owns.ipport+"/Api/Command?password="+c_owns.password, {
                        method: "post",
                        body: '{"Command": "owns '+interaction.options.get('name').value+' '+interaction.options.get('game').value+'"}',
                        headers: {"Content-Type": "application/json"}
                }).then(res => res.json())
                .then(body => {
                  console.log(body)
                        if (body.Success){
                          if(body.Result.includes('Not owned yet')) {
                            interaction.reply({ content: t_owns.game+' '+interaction.options.get('game').value+', '+t_owns.nown, ephemeral: true });
                          } else {
                            interaction.reply({ content: t_owns.game+' '+interaction.options.get('game').value+', '+t_owns.own, ephemeral: true });
                          }
                        } else {
				                  interaction.reply({ content: "Error: " + body, ephemeral: true });
                        }
                })
  },
};
