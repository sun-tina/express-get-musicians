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
    
    
})
