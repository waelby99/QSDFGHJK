const express = require("express")
const sequelize  = require("./config/db")
const app = express()
const dotenv = require('dotenv');
const morgan =require('morgan');
const colors = require('colors')
require('dotenv').config();

const Eureka = require('eureka-js-client').Eureka;
//dotenv config
dotenv.config();

//middlewares 
app.use(express.json())
app.use(morgan('dev'))



const client = new Eureka({
  instance: {
    app: 'MSExpressService',  // Nom de votre service
    hostName: 'localhost',     // Nom d'hôte
    ipAddr: '127.0.0.1',       // Utiliser l'adresse IP
    port: {
        '$': 5000,             // Port sur lequel votre service écoute
        '@enabled': true
    },
    vipAddress: 'MSExpressService', // Nom VIP
    dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
    }
},
eureka: {
    host: 'localhost',         // Adresse du serveur Eureka
    port: 8761,                // Port par défaut de Eureka
    servicePath: '/eureka/apps'
}
});

client.start(error => {
  console.log('Eureka client started');
});

//routes
app.use('/users',require('./routes/userRoutes'));
app.use("/auth",require("./routes/authRoutes"))


const port= process.env.PORT || 5000



sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');

    // Start the server after the database connection is established
    app.listen(port,()=>{
        console.log(`server is running on port ${port} in Mode ${process.env.DEV_MODE} `.bgCyan.white)
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



