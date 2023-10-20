import express from 'express'
import {getNotes, getNote, CreateNote, CreateDatabase} from './database.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.status(200).render("index.ejs")
})
app.use(express.static("public"))

app.post("/",(req,res)=>{
    let data = {
        name: "",
        registration: "",
        email: "",
        password: ""
    }
    data = req.body;

    console.log(data)

    db(data)
    res.status(200).render("new.ejs",data)
})
// creating database and inserting data;
async function db(data){
    //creating database 
    await CreateDatabase("websiteee");
    //creating table 
    const result = await CreateNote(`${data.name}`,`${data.registration}`, `${data.email}` , `${data.password}`);
    
    console.log(result);
}


app.listen(port,()=>{
console.log("starts");
})