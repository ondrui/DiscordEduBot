class StudentsQuery {
  constructor() {
    this.query = [];
  }

  addStudent(message) {
    const studentName = message.member.displayName;
    
    let commentary = message.content.split(" ");
    commentary.shift();
    commentary = commentary.join(" ");
    if (commentary == "") {
      commentary = "Без комментария";
    }

    let previousChannel;
    if (message.member.voice.channel == null) {
      previousChannel = getMainVoiceChannel(message);
    } else {
      previousChannel = message.member.voice.channel;
    }

    let timestamp = new Date();
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let seconds = timestamp.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    const queryCell = {
      student :message.member,
      studentName : studentName,
      commentary : commentary,
      previousChannel : previousChannel,
      timestamp : `${hours}:${minutes}:${seconds}`,
    }

    this.query.push(queryCell);

    const reply = "Вы добавлены в очередь, ваш номер: " + (this.getAll().length);
    message.reply(reply)
      .catch(console.error);
  }

  getAll() {
    return this.query;
  }

  clear(message) {
    this.query = [];
    message.reply("Очередь очищенна")
      .catch(console.error);
  }

  getNext() {
    return this.query.shift();
  }
}

module.exports = StudentsQuery;