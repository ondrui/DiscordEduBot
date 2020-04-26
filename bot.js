'use strict'

const botOptions = require("./options.json");
const Discord = require("discord.js");
const commands = require('./commands.js');

const client = new Discord.Client();
const prefix = "!";

const StudentsQuery = require('./StudentsQuery.js');
let query = new StudentsQuery();

client.login(botOptions.token);

client.on("message", (message) => {
  if(message.author.bot || !message.content.startsWith(prefix)) return;
  
  if(message.content.toLowerCase() == `${prefix}готов` && checkIfTeacher(message.member)) {
    return commands.checkReady(message);
  }

	if ( message.content.toLowerCase().startsWith(`${prefix}голосование`) ) {
    return commands.startVoting(message);
  }

  if ( message.content.toLowerCase().startsWith(`${prefix}помощь`) ) {
    
    if (message.member.voice.channel == null) {
      return message.reply("Вы должны находиться в голосовом канале!");
    }

    return query.addStudent(message);

  }
  
  if ( message.content.toLowerCase() == `${prefix}список`) {
    return commands.showQuery( message, query.getAll() );
  }

  if ( message.content.toLowerCase() == `${prefix}следующий` && checkIfTeacher(message.member) ) {
    return commands.helpNextStudent( message, query.getNext() );
  }

  if ( message.content.toLowerCase() == `${prefix}очистить` && checkIfTeacher(message.member) ) {
    return query.clear(message);
  }
  

});

function checkIfTeacher(member) {
	for (let role of member.roles.cache.values()) {
		if (role.name == "Преподаватели") 
			return true;
	}
	return false;
}