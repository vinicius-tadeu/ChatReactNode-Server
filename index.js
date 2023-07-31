const { Socket } = require('socket.io')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'https://chat-react-node-server.vercel.app:3001'}})

const PORT = 3001


io.on('connection', socket => {
    console.log('Usuário Conectado!', socket.id);

    socket.on('disconnect', reason =>{
        console.log('Usuário desconectado!', socket.id)
    })

    socket.on('set_username', username =>{
        socket.data.username = username
        console.log(socket.data.username);
    })
    socket.on('message', text =>{
        const data = new Date()
        const horas = data.getHours()
        const minutos = data.getMinutes()
        const segundos = data.getSeconds()
        var hhmmmss = [horas, minutos, segundos]
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username,
            data: hhmmmss.join(':')
        })
    })
})

server.listen(PORT, ()=> console.log('Server running...'))