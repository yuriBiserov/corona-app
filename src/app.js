const express = require('express')
const path = require('path')


//integrate corona app code exactly as it was used 
//in the corona app.
//note that as this a server side code it is not 
//going to be in the public folder.
const processWorldwideData = require("./modules/processWorldwideData.js")
const processIsraelData = require("./modules/processIsraelData.js")

const app = express()

const publicPath = path.join(__dirname, "../public")

const port = 3000
//set static files
app.use(express.static(publicPath));

//set ejs 
app.set('view engine', 'ejs')
const templatesPath = path.join(__dirname, "../views");
app.set("views", templatesPath);

//------------------------------------//

//render main page
app.get('', (req,res)=>{
  res.render('index' , {
    title: 'Homepage',
  })
})
//render israel EJS page
app.get('/israel' , async (req,res) =>{

if(req.query.city === undefined) {
  res.render('israel' , {
    title: 'Israel',
  })
} else {
  if(!req.query.city == ""){
    let city = await processIsraelData.findCity(req.query.city)
    console.log(await processIsraelData.getIsraelCityData(city))
    res.send(await processIsraelData.getIsraelCityData(city))
  }else{
    console.log(await processIsraelData.getIsraelGeneralData())
    res.send(await processIsraelData.getIsraelGeneralData())
  }
}
})
//render worldwide EJS page
app.get('/worldwide' , async (req,res) =>{
  if(!req.query.country)
  {
    res.render('worldwide' , {
      title: 'Worldwide',
    })
  }else{
    let countryCode = await processWorldwideData.getCountryCode(req.query.country)
    if (!countryCode)
    {
      res.send("לא נמצאו תוצאות");
    }else
    {
      res.send(await processWorldwideData.getCountryData(countryCode));
    }
  }
})
//render error page 
app.get('*' , (req,res) => {
  res.render('page_not_found' , {
    title: 'Page not found',
  })
})
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})