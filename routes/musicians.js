const express = require("express");
const router = express.Router();

const { Musician } = require("../models/index");
const app = require("../src/app");
const {check, validationResult} = require("express-validator")
router.use(express.json())

// const checklength = (req, res, next) => {
//     try {
//       const symbol = "~!@#$%^&*()-_=+{}[]<>,.?/:;|"; // use symbol.includes(letter) as a test
//       const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
//       //const { password } = req.body;
//       const nameLength = Musician.name.isLength(req.body, {min:2, max: 20})
  
//       let hasSymbol = false;
//       let hasUppercase = false;
//       for (let i = 0; i < req.body.length; i++) {
//         if (symbol.includes(req.body[i])) {
//           hasSymbol = true;
//         } else if (uppercaseLetters.includes(req.body[i])) {
//           hasUppercase = true;
//         }
//       }
  
//       if (hasSymbol && hasUppercase) {
//         next();
//       } else {
//         throw new Error(
//           "Name must be between 2-20 characters"
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   };
  



  //

router.get("/", async(req,res)=>{
    let musicians =  await Musician.findAll();
    res.json(musicians)
  })
  
router.get("/:id", async(req,res)=>{
    let musicians =  await Musician.findAll();
    res.json(musicians[req.params.id-1])
})

router.post("/", [
    check("name").not().isEmpty().trim(), 
    check("instrument").not().isEmpty().trim(),
    check("name").isLength("name", {min:2, max: 20}),


], async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.json({error:errors.array()})
    }
 else if(!errors.isLength(req.body, {min:2, max: 20})){
         res.json({error:errors.array()})
    }
    else{
    let musicians =  await Musician.findAll();
    const addMu = await Musician.create(req.body);
    musicians.push(addMu)
    res.json(musicians)
    }
    
})

router.put("/:id", async(req,res)=>{
    let musicians =  await Musician.findAll();
    const updated = await Musician.update(req.body, {where:{id:req.params.id}});   
    res.json(musicians)
})

router.delete("/:id", async(req,res)=>{
    const deleteMu = await Musician.destroy({where: {id : req.params.id}});
    res.json(200)
})
  
  module.exports = {router}