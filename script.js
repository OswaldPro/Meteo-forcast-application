const url = "https://api.open-meteo.com/v1/forecast?latitude=50.2983&longitude=3.7937&daily=sunrise,sunset,temperature_2m_min,temperature_2m_max,precipitation_sum,wind_direction_10m_dominant,wind_speed_10m_max&hourly=temperature_2m,wind_speed_10m,temperature_20m,precipitation,cloud_cover&models=meteofrance_seamless&current=temperature_2m,precipitation,wind_speed_10m,cloud_cover,apparent_temperature,weather_code,wind_direction_10m,rain,snowfall&minutely_15=temperature_2m,precipitation&timezone=Europe%2FBerlin&start_date=2025-03-25&end_date=2025-04-01";


fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); // Vérifier les données dans la console

        // Changement du bg en fonction du temps 
        
        let bg = document.querySelector("body");
        //Soleil
        if (data.current.weather_code == 0) {
          bg.style.backgroundImage = "url('assets/img/sun.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          // Nuages
        } else if (data.current.weather_code >= 1 && data.current.weather_code <= 3) {
          bg.style.backgroundImage = "url('assets/img/suncloud.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          // Pluie
        } else if (data.current.weather_code >= 51 && data.current.weather_code <= 67 || data.current.weather_code == 80 || data.current.weather_code == 81 || data.current.weather_code == 82)  {
          bg.style.backgroundImage = "url('assets/img/rain.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          // Neige
        } else if (data.current.weather_code >= 71 && data.current.weather_code <= 77 || data.current.weather_code == 85 || data.current.weather_code == 86 ) {
          bg.style.backgroundImage = "url('assets/img/snow.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          // Orage
        } else if (data.current.weather_code >= 95 && data.current.weather_code <= 99) {
          bg.style.backgroundImage = "url('assets/img/thunder.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
        }

        // Date et heure du jour
        document.querySelector(".time").innerText = `${new Date().toLocaleString()}`;

        // Météo du jour
        document.querySelector(".today").innerHTML = `
            Temp: ${data.current.temperature_2m}°C<br>
            Précipitations : ${data.daily.precipitation_sum[0]} mm<br>
            Nuages : ${data.current.cloud_cover} %
        `;

        // Vent du jour
        document.querySelector(".wind").innerHTML = `
            ${data.current.wind_speed_10m} km/h<br>
            Direction : ${data.current.wind_direction_10m}°
        `;

        // Lever et coucher du soleil
        document.querySelector(".daytime").innerText = `Lever : ${data.daily.sunrise[0].split("T")[1]}`;
        document.querySelector(".nighttime").innerText = `Coucher : ${data.daily.sunset[0].split("T")[1]}`;

        // Température et précipitations heure par heure 
        for (let j=0; j<24; j++) {
          let hour = document.createElement("div");
          hour.classList.add("hour");

          hour.innerHTML = `${data.hourly.time[j].split("T")[1]}<br>${data.hourly.temperature_2m[j]}°C<br>${data.hourly.precipitation[j]} mm`;          

          document.querySelector(".hourly-temp").appendChild(hour);
          document.querySelector('.hourly-temp').scrollLeft = 0;
        }
        // Prévisions sur la semaine
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        for (let i = 0; i < days.length; i++) {
          let day = data.daily.time[i]

          document.querySelector(`.${days[i]}`).innerHTML = `
              ${day}<br>
              Max: ${data.daily.temperature_2m_max[i]}°C<br>
              Min: ${data.daily.temperature_2m_min[i]}°C<br>
              ${data.daily.precipitation_sum[i]} mm
          `;
      }
    })
    .catch(function(error) {
        console.error("Erreur :", error);
        document.querySelector(".today").innerText = "❌ Erreur de chargement des données.";
    });

