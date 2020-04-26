

const botOptions = require("./options.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(botOptions.token);

client.on("message", (message) => {
	if(message.author.bot) return;
	if(message.content.toLowerCase() == "!готов") {
		if (checkIfTeacher(message.member)) {
			message.react('👍')
							.catch(console.error);
			message.react('👎')
							.catch(console.error);
		}
	}
	if ( message.content.toLowerCase().startsWith("!голосование") ) {
		console.log("Начинаю голосование!")
		const channel = message.channel;
		let optionsArray = message.content.split(" ");
		for(let i = 1; i < optionsArray.length; i++) {
			channel.send("Голососуем за " + optionsArray[i])
				.then(message => {
					message.react('👍')
						.catch(console.error);
				});
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