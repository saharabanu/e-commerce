const app = require("./app")
const { serverPort } = require("./secret")




app.listen(serverPort, () => {
  console.log(`E-commerce-server is listening on port ${serverPort}`)
})


