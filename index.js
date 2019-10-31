const TwitchClient = require('twitch').default;
const ChatClient = require('twitch-chat-client').default;

(async () => {
	const clientId = '0k4j07seiph3z5eszmfecaxddidcx1';
	const accessToken = 'p6w17de2r40urd5f26xc9beq687o3k';
	const twitchClient = await TwitchClient.withCredentials(clientId, accessToken);
	
	const chatClient = await ChatClient.forTwitchClient(twitchClient);
	
	await chatClient.connect();
	console.log("connected!")
	await chatClient.waitForRegistration();
	
	const userName = 'gueigotv';
	await chatClient.join(userName);
	console.log("joined!")
	
	
	chatClient.onSub((channel, user) => {
		console.log("onSub.. (channel, user)",channel, user)
		chatClient.say(channel, `感謝 @${user} 成為可撥黃龜 camper4 `);
	});

	chatClient.onResub((channel, user, subInfo) => {
		console.log("onResub.. (channel, user, subInfo)",channel, user, subInfo)
		// if ( subInfo.months == 3 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為白龜! camper1 `);
		// } else if ( subInfo.months == 6 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為綠龜! camperNezuko  `);
		// } else if ( subInfo.months == 9 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為紅龜! camper5  `);
		// } else if ( subInfo.months == 12 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為藍龜! camper2 `);
		// } else if ( subInfo.months == 24 ){
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月 成為尊爵彩龜! camperCrazy  `);
		// }else{
			// chatClient.say(channel, `感謝 @${subInfo.displayName} 續訂 ${subInfo.months} 個月!! `);
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
	chatClient.onPrivmsg(async (channel, user, message, msg) => {
		if (message.indexOf("安安") != -1) {
			if ( AnMap[user] == 1 ){
				chatClient.say(channel, `@${msg.userInfo.displayName} 打過招呼了! camperAngry  `);
				AnMap[user] ++ ;
			}else if ( !(AnMap[user]) ){
				chatClient.say(channel, `@${msg.userInfo.displayName} 安安~ camperAYAYA `);
				AnMap[user] = 1 ;
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








