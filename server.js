const express = require('express')
const {Server} =  require('socket.io');
const http = require('http')
const path = require('path')

const app = express();
const server = http.createServer(app);
const io =new Server(server);

app.use(express.static(path.resolve("./public")))

io.on('connection',(socket)=>{
    console.log("A new user has connected",socket.id)
    socket.on("user-message",(message)=>{
        console.log(message)
        io.emit("message",message);
    })
});

app.get('/',(req,res)=>{
    return res.sendFile("/index.html")
})

server.listen(9000,()=> console.log(`server started at port: 9000`))