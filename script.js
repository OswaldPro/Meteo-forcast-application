const url = "https://api.open-meteo.com/v1/forecast?latitude=50.2983&longitude=3.7937&daily=weather_code,sunrise,sunset,temperature_2m_min,temperature_2m_max,precipitation_sum,wind_direction_10m_dominant,wind_speed_10m_max&hourly=temperature_2m,weather_code,wind_speed_10m,temperature_20m,precipitation,cloud_cover&models=meteofrance_seamless&current=temperature_2m,precipitation,wind_speed_10m,cloud_cover,apparent_temperature,weather_code,wind_direction_10m,rain,snowfall&minutely_15=temperature_2m,precipitation&timezone=Europe%2FBerlin&start_date=2025-03-25&end_date=2025-04-01";


fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); // Vérifier les données dans la console

        // Changement du bg en fonction du temps  (mieux en css quand même) + picto + mini picto
        
        let bg = document.querySelector("body");
        let pictoSrc = ""

        //Soleil
        if (data.current.weather_code == 0 || data.hourly.weather_code == 0 || data.daily.weather_code == 0) {
          bg.style.backgroundImage = "url('assets/img/sun.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/soleil.png";

          // Nuages
        } else if (data.current.weather_code >= 1 && data.current.weather_code <= 2 || data.hourly.weather_code >= 1 && data.hourly.weather_code <= 2 || data.daily.weather_code >= 1 && data.daily.weather_code <= 2) {
          bg.style.backgroundImage = "url('assets/img/suncloud.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/couvert.png";

          //Nuages+++
        }else if (data.current.weather_code == 3 || data.hourly.weather_code == 3 || data.daily.weather_code == 3) {
          bg.style.backgroundImage = "url('assets/img/cloud.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/nuage.png";

          // Pluie
        } else if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(data.current.weather_code) || [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(data.hourly.weather_code) || [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(data.daily.weather_code)) {
          bg.style.backgroundImage = "url('assets/img/rain.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/averse.png";

          // Neige
        } else if ([71,73,55,77,85,86].includes(data.current.weather_code) || [71,73,55,77,85,86].includes(data.hourly.weather_code) || [71,73,55,77,85,86].includes(data.daily.weather_code)) {
          bg.style.backgroundImage = "url('assets/img/snow.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/neige.png";

          // Orage
        } else if ([95,96,99].includes(data.current.weather_code)) {
          bg.style.backgroundImage = "url('assets/img/thunder.jpg')";
          bg.style.backgroundRepeat = "no-repeat";
          bg.style.backgroundSize = "cover";
          pictoSrc = "assets/img/orage.png";
        }

        // Date et heure du jour
        document.querySelector(".time").innerText = `${new Date().toLocaleString()}`;

        // Météo du jour
        document.querySelector(".today").innerHTML = `
        <img src="${pictoSrc}" alt="picto" class="picto"><br>
        Température: ${data.current.temperature_2m}°C<br>
        Précipitations : ${data.daily.precipitation_sum[0]} mm<br>
        Couverture nuageuse : ${data.current.cloud_cover} %
        `;

        // Vent du jour
        document.querySelector(".wind").innerHTML = `
        <img src="/assets/img/compass.png" alt=""><br>
        <img class= "boussole" src="/assets/img/compass-arrow.png" alt="">
        ${data.current.wind_speed_10m} km/h<br>
        `;

        // Rotation boussole 
        let arrow = document.querySelector(".boussole");
        arrow.style.transform = `rotate(${data.current.wind_direction_10m}deg)`;

        // Lever et coucher du soleil
        document.querySelector(".daytime").innerHTML = `
        <img src="/assets/img/jour.png" alt="">
        <p>${data.daily.sunrise[0].split("T")[1]}</p>`;

        document.querySelector(".nighttime").innerHTML = `
        <img src="/assets/img/nuit.png" alt="">
        <p>${data.daily.sunset[0].split("T")[1]}</p>`;

        // Température et précipitations heure par heure  
        
        for (let j=0; j<24; j++) {

          let hourlyPicto = "";
          // Récupération du code météo de l'heure en cours
          let weatherCode = data.hourly.weather_code[j];

          // Soleil
          if (weatherCode == 0) {
              hourlyPicto = "assets/img/soleil-mini.png";
          } 
          // Nuages
          else if (weatherCode >= 1 && weatherCode <= 2) {
              hourlyPicto = "assets/img/nuage-mini.png";
          } 
          // Nuages+++
          else if (weatherCode == 3) {
              hourlyPicto = "assets/img/nuage.png";
          } 
          // Pluie
          else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
              hourlyPicto = "assets/img/averse-mini.png";
          } 
          // Neige
          else if ([71, 73, 55, 77, 85, 86].includes(weatherCode)) {
              hourlyPicto = "assets/img/neige-mini.png";
          } 
          // Orage
          else if ([95, 96, 99].includes(weatherCode)) {
              hourlyPicto = "assets/img/orage-mini.png";
          }

          // Création de la div pour chaque heure + ajout des données
          let hour = document.createElement("div");
          hour.classList.add("hour");

          hour.innerHTML = `
              ${data.hourly.time[j].split("T")[1]}<br>
              <img src="${hourlyPicto}" alt="picto" class="mini-picto"><br>          
              ${data.hourly.temperature_2m[j]}°C<br>
              ${data.hourly.precipitation[j]} mm
          `;          

          document.querySelector(".hourly-temp").appendChild(hour);
          document.querySelector('.hourly-temp').scrollLeft = 0;
        }
        // Prévisions sur la semaine : on met les noms des div dans un tableau pour les parcourir
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        for (let i = 0; i < days.length; i++) {

          let dailyPicto = "";
          // Récupération du code météo de l'heure en cours
          let weatherCode = data.daily.weather_code[i];

          // Soleil
          if (weatherCode == 0) {
              dailyPicto = "assets/img/soleil-mini.png";
          } 
          // Nuages
          else if (weatherCode >= 1 && weatherCode <= 2) {
              dailyPicto = "assets/img/nuage-mini.png";
          } 
          // Nuages+++
          else if (weatherCode == 3) {
              dailyPicto = "assets/img/nuage.png";
          } 
          // Pluie
          else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
              dailyPicto = "assets/img/averse-mini.png";
          } 
          // Neige
          else if ([71, 73, 55, 77, 85, 86].includes(weatherCode)) {
              dailyPicto = "assets/img/neige-mini.png";
          } 
          // Orage
          else if ([95, 96, 99].includes(weatherCode)) {
              dailyPicto = "assets/img/orage-mini.png";
          }


          let day = data.daily.time[i]

          document.querySelector(`.${days[i]}`).innerHTML = `
              ${day}<br>
              <img src="${dailyPicto}" alt="picto" class="mini-picto"><br>
              ${data.daily.temperature_2m_min[i]}°C<br>
              ${data.daily.temperature_2m_max[i]}°C<br>
              ${data.daily.precipitation_sum[i]} mm
          `;
      }
    })
    .catch(function(error) {
        console.error("Erreur :", error);
        document.querySelector(".today").innerText = "Erreur de chargement des données.";
    });

