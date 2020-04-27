function checkReady(message) {
    message.react('👍')
        .catch(console.error);
    message.react('👎')
        .catch(console.error);
}

function startVoting(message) {
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

function createQueryCell(message) {
  const studentName = message.member.displayName;
  let commentary = message.content.split(" ");
  commentary.shift();
  commentary = commentary.join(" ");
  
  if (commentary == "") {
    commentary = "Без комментария";
  }
  let previousChannel;
  if (message.member.voice.channel = null) {
    previousChannel = getMainVoiceChannel(message);
  } else {
    previousChannel = message.member.voice.channel;
  }

  const queryCell = {
    student :message.member,
    studentName : studentName,
    commentary : commentary,
    previousChannel : previousChannel,
  }

  return queryCell;
}

function showQuery(message, studentsQuery) {
  let reply = "\n Текущая очередь: \n";
  studentsQuery.forEach((querryCell, number) => {
    let info = `${number + 1}: ${querryCell.studentName} (${querryCell.commentary}) ${querryCell.timestamp}; \n`;
    reply += info;
  });
  message.reply(reply)
    .catch(console.error);
}

function helpNextStudent(message, queryCell) {
  let helpChannel = message.member.voice.channel;
  for (member of helpChannel.members.values()) {
    if (checkIfTeacher(member)) continue;
    member.voice.setChannel( getMainVoiceChannel(message) );
  }
  if (queryCell == null) {
    return message.reply("Очередь пуста")
              .catch(console.error);
  }
  let student = queryCell.student;
  student.voice.setChannel(helpChannel, 'Подошла ваша очередь');
}

module.exports.checkReady = checkReady;
module.exports.startVoting = startVoting;
module.exports.createQueryCell = createQueryCell;
module.exports.showQuery = showQuery;
module.exports.helpNextStudent = helpNextStudent;

function getMainVoiceChannel(message) {
  for (const channel of message.guild.channels.cache.values()) {
    if (channel.type == "voice" && channel.name == "Основной") {
      return channel;
    }
  }
  return console.error("Отсутствует основной канал");
}

function checkIfTeacher(member) {
	for (let role of member.roles.cache.values()) {
		if (role.name == "Преподаватели") 
			return true;
	}
	return false;
}