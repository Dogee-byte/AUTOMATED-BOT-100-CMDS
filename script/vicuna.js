module.exports.config = {
  name: 'vicuna',
  version: '1.1.1',
  hasPermssion: 0,
  role: 0,
  credits: "cliff",
  author: '',
  description: 'An AI powered by openai',
  usePrefix: false,
  hasPrefix: false,
  aliases: ["llava","Vicuna"],
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

      const cliff = await new Promise(resolve => { api.sendMessage('🔍 Searching Please Wait....', event.threadID, (err, info1) => {
      resolve(info1);
     }, event.messageID);
    });

      const response = await axios.get(`https://for-devs.onrender.com/api/llava?query=${encodeURIComponent(user)}&imageUrl=&apikey=api1&uid=${uid}`);

      const responseData = response.data.result;
      const baby = `𝗖𝗵𝗮𝘁 𝘄𝗶𝘁𝗵 𝗹𝗹𝗮𝘃𝗮 (𝘃𝗶𝘀𝗶𝗼𝗻)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${responseData}`;
      api.editMessage(baby, cliff.messageID);
  } catch (err) {
      console.error(err);
      return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};