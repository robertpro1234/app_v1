// npm init -y
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
// ws://localhost:3000
// http://localhost:3000
// Ctrl + c ==>> Exit Run NodeJS App

const app = require('express')();
const http = require('http').Server(app);
const { Server } = require('socket.io');
const cors = require('cors');

// Enable CORS for all origins
app.use(cors());

// Configure Socket.IO with CORS
const io = new Server(http, {
  cors: {
    origin: "https://app-v1-dyv6.onrender.com/", // Allow all origins ==>> https://app-v1-dyv6.onrender.com/
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
let time_count = 3000;
let count = 0;

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

http.listen(PORT, function(){
	console.log(`Server running on port ${PORT}`);
})

setInterval(function() {

	io.emit('msg_to_client','to client, Innocent Test msg ==>> '+ count);
	count++;
},time_count)
