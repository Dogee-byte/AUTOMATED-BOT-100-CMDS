module.exports.config = {
  name: 'polyglot',
  version: '1.1.1',
  hasPermssion: 0,
  role: 0,
  credits: "cliff",
  author: '',
  description: 'An AI powered by openai',
  usePrefix: false,
  hasPrefix: false,
  commandCategory: 'AI',
  usage: '[prompt]',
  cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const uid = event.senderID;

  let user = args.join(' ');

  try {
      if (!user) {
          return api.sendMessage('Please provide a question first!', event.threadID, event.messageID);
      }

      const cliff = await new Promise(resolve => { api.sendMessage('(𝗣𝗼𝗹𝘆𝗴𝗹𝗼𝘁 𝗕𝗼𝘁)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n🔍 Searching Please Wait....', event.threadID, (err, info1) => {
      resolve(info1);
     }, event.messageID);
    });

      const response = await axios.get(`https://nethwieai.neth.workers.dev/ai?model=@cf/fblgit/una-cybertron-7b-v2-bf16&system=&user=${encodeURIComponent(user)}`);

      const responseData = response.data.msg;
      const baby = `(𝗣𝗼𝗹𝘆𝗴𝗹𝗼𝘁 𝗕𝗼𝘁)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${responseData}`;
      api.editMessage(baby, cliff.messageID);
  } catch (err) {
      console.error(err);
      return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};