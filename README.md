# Projet Météo - Affichage des Prévisions Horaires

## Description

Ce projet permet d'afficher les prévisions météorologiques horaires à l'aide d'une API météo. Les données récupérées comprennent la température, le type de temps (soleil, nuage, pluie, neige, orage) et les précipitations. Chaque prévision est illustrée avec une icône représentative.

## Fonctionnalités

- Récupération des données météo via une API.
- Affichage des prévisions horaires sur une période de 24 heures.
- Attribution d'une icône correspondant à chaque condition météorologique.
- Interface simple avec défilement horizontal des prévisions.

## Technologies Utilisées

- **HTML/CSS** : Structure et mise en page de l'interface.
- **JavaScript** : Récupération et traitement des données de l'API.
- **API Météo** : Source des données météorologiques.

## Installation

1. Clonez le projet :
   ```sh
   git clone https://github.com/votre-utilisateur/projet-meteo.git
   ```
2. Ouvrez le fichier `index.html` dans un navigateur.
3. Assurez-vous que l'API est bien accessible et que vous avez la bonne clé d'API (si nécessaire).

## Utilisation

- L'application affiche automatiquement les prévisions météo pour les prochaines 24 heures.
- Faites défiler horizontalement pour voir toutes les heures.

## Exemple de Code

Voici un extrait du script qui gère l'affichage des pictogrammes météo :

```js
for (let j = 0; j < 24; j++) {
  let hourlyPicto = "";
  let weatherCode = data.hourly.weather_code[j];

  if (weatherCode == 0) hourlyPicto = "assets/img/soleil-mini.png";
  else if (weatherCode >= 1 && weatherCode <= 2)
    hourlyPicto = "assets/img/nuage-mini.png";
  else if (weatherCode == 3) hourlyPicto = "assets/img/nuage.png";
  else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode))
    hourlyPicto = "assets/img/averse-mini.png";
  else if ([71, 73, 75, 85, 86].includes(weatherCode))
    hourlyPicto = "assets/img/neige-mini.png";
  else if ([95, 96, 99].includes(weatherCode))
    hourlyPicto = "assets/img/orage-mini.png";

  let hour = document.createElement("div");
  hour.classList.add("hour");
  hour.innerHTML = `
        ${data.hourly.time[j].split("T")[1]}<br>
        <img src="${hourlyPicto}" alt="picto" class="mini-picto"><br>          
        ${data.hourly.temperature_2m[j]}°C<br>
        ${data.hourly.precipitation[j]} mm
    `;
  document.querySelector(".hourly-temp").appendChild(hour);
}
```

## Améliorations Possibles

- Ajouter un champ de recherche pour afficher la météo d'autres villes.
- Intégrer une carte météo interactive.
- Améliorer le design et l'ergonomie de l'affichage.

## Auteur

Projet réalisé par Oswald P.

## Licence

Ce projet est sous licence MIT.
