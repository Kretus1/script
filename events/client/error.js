module.exports = error => {
	message.channel.send("⚠️ เกิดข้อผิดพลาดภายใน Client: " + error);
	console.error(error);
};