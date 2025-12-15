const countryModel = require("../models/countryModel")

const createCountry = async(req,res) =>{
    const data =req.body
    console.log(data)
    const createCountry = await countryModel.createCountry(data)
    res.json(createCountry)
}
const listCountry = async(req,res) =>{
    const listCountry = await countryModel.listCountry()
    res.json(listCountry)
}
module.exports = {
    createCountry,
    listCountry
}