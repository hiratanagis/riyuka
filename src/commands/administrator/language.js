const db = require('quick.db')
exports.run = (client, message, args, color, prefix, lang) => {
	const tableload = db.get(`lang.${message.guild.id}`);
	const margs = message.content.split(' ');
	const input = args.slice();

	const validation = ['english', 'indonesian'];

	const already = lang.language_already.replace('%language', `\`${input[0]}\``);
	const changed = lang.language_changed.replace('%input', `\`${input[0]}\``);

	if (!input || input.length === 0) return message.reply(lang.language_noinput);

	for (let i = 0; i < margs.length; i++) {
		if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
			if (margs[1].toLowerCase() === 'english') {
				if (tableload == 'en-US') return message.channel.send(already);

				db.set(`lang.${message.guild.id}`, 'en-US');

				return message.channel.send(changed);
			} else if (margs[1].toLowerCase() === 'indonesian') {
				if (tableload == 'id-ID') return message.channel.send(already);

				db.set(`lang.${message.guild.id}`, 'id-ID');

				return message.channel.send(changed);
			}
		}
	}
	return message.channel.send(lang.language_error);
};

exports.conf = {
    aliases: [],
    cooldown: ''
}

exports.help = {
    name: "language",
    description: "Change Language",
    usage: "language [english/indonesian]"
}
