// npm init -y
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
// ws://localhost:3000
// http://localhost:3000
// Ctrl + c ==>> Exit Run NodeJS App

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/hello', (req, res) => {
  res.json({ msg: 'Hello from server' });
});


io.on('connection', function(socket){
	console.log('Connected');

	socket.on('msg_from_client', function(from,msg){
		console.log('Message is '+from, msg);
	})
	socket.on('disconnect', function(msg){
		count = 0;
		console.log('Disconnected');
	})
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
})
let count = 0;
setInterval(function() {

	io.emit('msg_to_client','to client, Innocent Test msg ==>> '+ count);
	count++;
},3000)

