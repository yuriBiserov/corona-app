const worldwideForm = document.getElementById("worldwide_form");
const worldwideInput = document.getElementById("user_input");
const worldwideDataBlock = document.getElementById("data_block");

worldwideForm.addEventListener('submit', (e) => {

    e.preventDefault();

    fetchData();
})

async function fetchData()
{

    try{
        if(!worldwideInput.value){
            worldwideDataBlock.innerHTML = "please enter country"
        } else {
            let res = await fetch('http://localhost:3000/worldwide?country='+worldwideInput.value);
            if(!res.ok){
                worldwideDataBlock.innerHTML = "שגיאת התחברות לשרת";
            } else {
                let data = await res.json();
                worldwideDataBlock.innerHTML = data.name+ "<br />" +
                                               "population: "+ data.population+ "<br />" +
                                               "updated: "+data.updated+ "<br />" +
                                               "confirmed: "+data.confirmed+ "<br />" +
                                               "new confirmed: "+data.newConfirmed+ "<br />" +
                                               "active sick: "+data.activeSick+ "<br />" +
                                               "deaths: "+data.deaths+ "<br />" +
                                               "new deaths: "+data.newDeaths;

                console.log(data)
            }
        }
    } catch(err){
        worldwideDataBlock.innerHTML = "no data for this country";
    }
}