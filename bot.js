

const botOptions = require("./options.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(botOptions.token);

client.on("message", (message) => {
	if(message.author.bot) return;
	if(message.content == "!готов") {
		if (checkIfTeacher(message.member)) {
			message.react('👍')
							.catch(console.error);
		}
	}
});

function checkIfTeacher(member) {
	for (let role of member.roles.cache.values()) {
		if (role.name == "Преподаватели") 
			return true;
	}
	return false;
}