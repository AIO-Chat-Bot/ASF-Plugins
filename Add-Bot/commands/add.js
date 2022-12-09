const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs')
const c_add = require('../config/c_add.json')
const t_add = require('../config/t_add.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("[FOR NOW NOT SUPPORTING STEAM GUARD] Add steam account to panel")
    .addStringOption(option =>
        option.setName('login')
          .setDescription('Here enter your login')
          .setRequired(true))
    .addStringOption(option =>
        option.setName('password')
            .setDescription('Here enter your password')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('name')
            .setDescription('Here enter a name of your bot you want')
            .setRequired(true)),
  run: async (interaction) => {

const customer = {
  Enabled: true,
  RemoteCommunication: 2,
  SteamLogin: interaction.options.get('login').value,
  SteamPassword: interaction.options.get('password').value,
  GamesPlayedWhileIdle: [
    730
  ]
}
const jsonString = JSON.stringify(customer)
fs.writeFile(c_add.dir+''+interaction.options.get('name').value+'.json', jsonString, err => {
    if (err) {
        interaction.reply({ content: t_add.Error, ephemeral: true });
    } else {
const now = new Date();
        interaction.reply({ content: t_add.Added, ephemeral: true });
    }
})

  },
};
