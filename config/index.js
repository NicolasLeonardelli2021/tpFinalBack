//require("dotenv").config();
import dotenv from 'dotenv'
//import 'dotenv'
let config = {
    //port: process.env.PORT
    port: dotenv.process.env.PORT
}
export default config
//module.exports = {config}