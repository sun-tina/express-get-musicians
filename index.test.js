// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test('musician end point check return', async() => {
        //response to endpoint accessed via supertest package
        const request = require ("supertest");
        //request to /musicians endpoint .get
        const response = await request(app).get("/musicians");
        //response sends a json string -> convert back to json object to access values (JSON.parse())
        const responseData = JSON.parse(response.text);
        //HTTP status code of 200 = successful GET request - access via response.statusCode
        expect(response.statusCode).toBe(200);
        console.log(JSON.stringify(responseData,null,2))
    })
    test("Testing musician req params", async () => {
        //send request to /musicians endpoint
        const response = await request(app).get("/musicians/2");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(responseData.name).toBe("Drake");
    }) 

    test("Testing musician post request", async () => {
        //send request to /musicians endpoint
        const response = await request(app)
            .post("/musicians")
            .send({ name: "Rihanna" , instrument: "Voice"})

        expect(response.statusCode).toBe(200);
      
    }) 

    test("Testing musician post validation", async () => {
        //send request to /musicians endpoint
        const response = await request(app)
            .post("/musicians")
            .send({ name: "" , instrument: ""})
            
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text)
        expect(responseData.error).toEqual( [
              {
                "type": "field",
                "value": "",
                "msg": "Invalid value",
                "path": "name",
                "location": "body"
              },
              {
                "type": "field",
                "value": "",
                "msg": "Invalid value",
                "path": "instrument",
                "location": "body"
              },{
                "type": "field",
                "value": "",
                "msg": "Invalid value",
                "path": "name",
                "location": "body"
              }
                ]);

      
    }) 

    test("Testing musician post validation length", async () => {
        //send request to /musicians endpoint
        const response = await request(app)
            .post("/musicians")
            .send({ name: "f" , instrument: "Voice"})
            
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text)
        expect(responseData.error).toEqual( [
            {
                "type": "field",
                "value": "f",
                "msg": "Invalid value",
                "path": "name",
                "location": "body"
              }
                ]);
      
    }) 

    test("Testing musician update request", async () => {
        //send request to /musicians endpoint
        const response = await request(app)
            .put("/musicians/2")
            .send({name:"Alex Turner", instrument:"Keyboard"})
        expect(response.statusCode).toBe(200);
    })     

    test("Testing musician delete request", async () => {
        //send request to /musicians endpoint
        const response = await request(app)
            .delete("/musicians/2")
        expect(response.statusCode).toBe(200);
    })
    
})
