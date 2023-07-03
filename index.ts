// import * as express from "express"
// import * as cors from "cors"
// const app=express()
// app.use(cors())
// app.use(express.json())
// const server=app.listen(3000,()=>{
//     console.log("server running at 3000....")
// })
// app.get("/api",(req,res)=>{
//     res.send("Welcome to Clinic Management System")
// })


import * as express from "express";
import { connection } from "./connection/connection";
import { Clinic } from "./entities/clinics";
import * as cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server=app.listen(3000, () => {
    console.log("server running at 3000....")
});

app.get("/api",(req, res)=>{
    res.send("Welcome to Clinic Management System")
})
connection.then(
    async connection => {
        console.log("connected")
        const clinicsRepository = connection.getRepository(Clinic);
        app.get("/api/clinics", async (req, res) => {
            const users=await clinicsRepository.find()
            res.send(users)
        })
        app.post("/api/clinics", async (req, res) => {
            
            console.log("body",req.body)
            const clinic = await clinicsRepository.create(req.body)
            const results = await clinicsRepository.save(clinic);
            
      res.json({
        message: "success",
        payload: results
      });
    })
      app.get("/api/users/:id", async(req,res)=>{
        console.log("called")
          console.log(req.params.id)
          const clinic = await clinicsRepository.findOne({where: { id: req.params.id }})
          res.json({
              message:"success",
              payload: clinic
          })
      })
      app.delete("/api/clinics/:id", async(req,res) => {
        const user = await clinicsRepository.delete(req.params.id)
        res.json({
            message:"success",
        })
    })
    app.put("/api/clinics/:id", async(req,res)=>{
        const clinic = await clinicsRepository.findOne(req.params.id)
        clinicsRepository.merge(clinic, req.body);
        const result = await clinicsRepository.save(clinic);
        res.json({
            message:"success",
            payload:result
        })
  
    })
        
    }
).catch(error=>{
    console.log(error)
})