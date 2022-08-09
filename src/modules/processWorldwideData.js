const fs = require('fs');
const chalk = require('chalk');
const gotWrapper = require("./gotWrapper.js");
const countriesFile = "./data/ISO3166-1.json";
let countryCodes;

let countryData;



const urlWorldWide = "https://corona-api.com/countries/";

async function getCountryCode(country)
{
    try {
        if (countryCodes===undefined)
        {
            // TODO - change to promise readFile()
            countryCodes = await JSON.parse(fs.readFileSync(countriesFile))
        }
        let index = countryCodes.findIndex((item) => item.englishShortName.toLowerCase().includes(country.toLowerCase()));
        if (index > -1)
        {
            return countryCodes[index].alpha2Code;
        }
    } catch(err) {
        return chalk.red.bgWhite("Something went wrong. Cannot process country code. \n") + err;
    }
}

async function getCountryData(country)
{
    try {
        let countryData = await gotWrapper.makeRequest(urlWorldWide+country); 
    
        let latestData = countryData.data.timeline[0];

       return countryData = {
            name:          countryData.data.name,
            population:    countryData.data.population.toLocaleString('en-US'),
            updated:       reverse(latestData.date),  /////
            confirmed:     latestData.confirmed.toLocaleString('en-US'),
            newConfirmed:  latestData.new_confirmed.toLocaleString('en-US'),
            activeSick:    latestData.active.toLocaleString('en-US'),
            deaths:        latestData.deaths.toLocaleString('en-US'),
            newDeaths:     latestData.new_deaths.toLocaleString('en-US'),
       }
            //  "       Country: " + countryData.data.name + "\n" + 
            //   "   Population: " + countryData.data.population + "\n" +
            //   "      Updated: " + latestData.date + "\n" +
            //   "    Confirmed: " + latestData.confirmed + "\n" + 
            //   "New Confirmed: " + latestData.new_confirmed + "\n" +
            //   "  Active sick: " + latestData.active + "\n" +
            //   "       Deaths: " + latestData.deaths + "\n" +
            //   "   New Deaths: " + latestData.new_deaths + "\n"
    } catch (err)
    {
        return chalk.red.bgWhite("Something went wrong. Cannot process country data. \n") + err;
    }
}
function reverse(s){
    return s.split("-").reverse().join('/');
}

module.exports = {
    getCountryCode: getCountryCode,
    getCountryData: getCountryData
}