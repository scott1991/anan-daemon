const TwitchClient = require('twitch').default;
const ChatClient = require('twitch-chat-client').default;

(async () => {
	const clientId = '0k4j07seiph3z5eszmfecaxddidcx1';
	const accessToken = process.argv[2] ;
	const twitchClient = await TwitchClient.withCredentials(clientId, accessToken);

	const chatClient = await ChatClient.forTwitchClient(twitchClient);

	await chatClient.connect();
	console.log("connected!");
	await chatClient.waitForRegistration();

	let userNames = ['gueigotv','9qoq'];
	userNames.forEach((userName) =>{
		await chatClient.join(userName);
	});

	console.log("joined!");


	chatClient.onSub((channel, user) => {
		console.log("onSub.. (channel, user)",channel, user);
		chatClient.say(channel, `感謝 @${user} 成為可撥黃龜 camper4 `);
	});

	chatClient.onResub((channel, user, subInfo) => {
		console.log("onResub.. (channel, user, subInfo)",channel, user, subInfo);
		// if ( subInfo.months == 3 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為白龜! camper1 `);
		// }
		chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月!! PrideGive `);
	});

	chatClient.onSubGift((channel, user, subInfo) => {
		console.log("onSubGift.. (channel, user, subInfo)",channel, user, subInfo)
		chatClient.say(channel, `感謝 ${subInfo.gifterDisplayName} 乾爹送給可撥的 ${user} 訂閱!!`);
	});

	chatClient.onChatClear((channel) => {
		chatClient.say(channel, `幹 酒神清三小`);
	})

	let AnMap = {};
	userNames.forEach((userName) =>{
		AnMap[userName]={};
	});

	let specialUser = 'mozumozuco'
	let specialMsg = '老婆安安~ <3 camperAYAYA';

	chatClient.onPrivmsg(async (channel, user, message, msg) => {
		if (message.indexOf('安安') != -1) {
			if ( user == specialUser ){
				chatClient.say(channel, `@${msg.userInfo.displayName} ` + specialMsg);
			}
			else if ( AnMap[channel.substring(1)][user] == 1 ){
				chatClient.say(channel, `@${msg.userInfo.displayName} 打過招呼了! camperAngry  `);
				AnMap[user] ++ ;
			}else if ( !(AnMap[channel.substring(1)][user]) ){
				chatClient.say(channel, `@${msg.userInfo.displayName} 安安~ camperAYAYA `);
				AnMap[user] = 1 ;
			}else{
				// noop
			}

		}
	})

	chatClient.onJoin((channel, user) => {
		chatClient.say(channel, `Hi~ 歡迎 @${user} 來偷看 qoq9Face2  `);
	})

	chatClient.onHosted((channel, byChannel, auto, viewers) => {
		if ( viewers == 1 ){
			chatClient.say(channel, `@${byChannel} ... ${viewers}人也Host, 亂什麼小! camperAngry  `);
		} else{
			chatClient.say(channel, `感謝 @${byChannel} Host ${viewers}人 `);
		}

	})



})();
