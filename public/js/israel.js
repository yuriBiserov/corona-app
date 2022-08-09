const israelForm = document.getElementById("israel_form");
const israelCityInput = document.getElementById("user_input");
const israelDataBlock = document.getElementById("data_block");

israelForm.addEventListener('submit', (e) => {

    e.preventDefault();

    fetchData();
})

async function fetchData()
{
    try{
        if(israelCityInput.value){
            let res = await fetch('http://localhost:3000/israel?city='+israelCityInput.value);
            if(!res.ok){
                israelDataBlock.innerHTML = "שגיאת התחברות לשרת";
            } else {
                let data = await res.json();
                israelDataBlock.innerHTML = data.name + "<br />" +
                                            "חולים: "+data.activeSick + "<br />" + 
                                            "צבע: "+data.color + "<br />" +
                                            "מחוסנים במנה ראשונה: "+data.firstDose + "<br />" +
                                            "מחוסנים במנה שנייה: "+data.secondDose + "<br />" +
                                            "מחוסנים במנה שלישית: "+data.thirdDose + "<br />";
            }
        }else{
                let res = await fetch('http://localhost:3000/israel?city='+israelCityInput.value);
                if(!res.ok){
                    israelDataBlock.innerHTML = "שגיאת התחברות לשרת";
                } else {
                    let data = await res.json();
                    israelDataBlock.innerHTML = "נתונים ארציים" + "<br />" + 
                                                data.date  + "<br />" +
                                                "סהכ מאומתים: "+data.confirmed  + "<br />" +
                                                "חולים חדשים: "+data.newSick  + "<br />" +
                                                "סהכ מחוסנים: "+data.totalVaccinated  + "<br />" +
                                                "אחוז מחוסנים: "+data.vacciPopuPerc  + "<br />" +
                                                "מחוסנים במנה שנייה: "+data.totalVacc2nd  + "<br />" +
                                                "מחוסנים במנה שלישית: "+data.totalVacc3rd  + "<br />";
                }
            
        }   
    } catch(err){
        israelDataBlock.innerHTML = "no data for this city";
    }
}