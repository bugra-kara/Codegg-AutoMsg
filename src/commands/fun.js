const { rollDice } = require('../../src/utils/dicefn');
module.exports = {
    run: async(client, message) => {
        message.reply("rolled a " + rollDice());
    },
    aliases: ['funuser'],
    description: "fun botu"
}