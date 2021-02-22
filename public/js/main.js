const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name'); 
const temp_real_value = document.getElementById('temp_real_value');
const data_hide = document.getElementsByClassName('data_hide');
const temp_status = document.getElementById('temp_status');

const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please Enter City Name Before Search`;
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=fbb8a2eaa8b02ebc196c8034e83659ba`
            const response = await fetch(url);
            const data = await response.json();
           const arrData = [data];
           var sheet = document.createElement('style');
           sheet.innerHTML = ".data_hide{visibility : visible}";
           document.body.appendChild(sheet);

           city_name.innerText =`${arrData[0].name},${arrData[0].sys.country}`;
           temp_real_value.innerText = arrData[0].main.temp; 
           const tempMood = arrData[0].weather[0].main;
        //    condition to check sunney or cloudy
        if(tempMood === "Clear"){
            temp_status.innerHTML = "<i class = 'fas fa-sun' style = 'color : #eccc68;'></i>";
        }
        else if(tempMood === "Clouds"){
            temp_status.innerHTML = "<i class = 'fas fa-cloud' style = 'color : #f1f2f6;'></i>";
        }
        else if(tempMood === "Rain"){
            temp_status.innerHTML = "<i class = 'fas fa-cloud-rain' style = 'color : #a4b0be;'></i>";
        }
        else{
            temp_status.innerHTML = "<i class = 'fas fa-cloud' style = 'color : #f1f2f6;'></i>";
        }

        }catch{
            var sheet = document.createElement('style');
            sheet.innerHTML = ".data_hide{visibility : hidden}";
            document.body.appendChild(sheet);
            city_name.innerText = `Entered City Not Exists`; 
        }
    }

}

submitBtn.addEventListener('click',getInfo)