const express =require("express")
const app=express()
const cors =require("cors")
const http=require("http")
const {Server} =require("socket.io")
app.use(cors())

const server=http.createServer(app)
const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["POST,GET"]

    }
})
io.on("connection",(socket)=>{
    socket.on("join_room",(room)=>{
        socket.join(room)
        console.log(`user id${socket.id} in room id ${room} is connected`)

    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("recieve",data)

    })

    socket.on("disconnect",()=>{
        console.log(` ${socket.id} disconected `)
    })

})




server.listen(3001,()=>{
    console.log("RUNNING")
})