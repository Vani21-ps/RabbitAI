const swaggerJsdoc = require("swagger-jsdoc")

const options = {
 definition: {
  openapi: "3.0.0",
  info: {
   title: "Sales Insight Automator API",
   version: "1.0.0",
   description: "Upload sales data and receive AI generated insights"
  },
  servers: [
   {
    url: "http://localhost:3001"
   }
  ]
 },
 apis: ["./routes/*.js"]
}

const specs = swaggerJsdoc(options)

module.exports = specs