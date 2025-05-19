# Simple Stock Data

Deze web applicatie is gemaakt om stockprijzen van bepaalde tickers weer te geven in een visueel aantrekkelijk en gebruiksvriendelijke manier.

De gebruiker kan in de zoekbalk de gewenste ticker ingeven en zoeken. Als deze gevonden wordt door de API, zal die weergegeven worden in de grafiek. De output van deze zoekactie kan in de grafiek op twee manieren worden getoond. Via een dropdownmenu kan er gekozen worden tussen een lijngrafiek of een staafdiagram.

Deze tickers kunnen gefilterd worden op dagelijkse prijsschommelingen of prijsschommelingen over een langere periode, met behulp van radiobuttons. Via een slider kan de gebruiker binnen elke periode de tijdsrelutie aanpassen.

Om de aangename gebruikerservaring te bevorderen kunnen favoriete tickers worden opgeslagen. Deze worden onderaan weergegeven zodat de gebruiker vlot kan schakelen tussen verschillende tickers.

De gegevens uit de grafiek worden ook weergegeven in een tabel. De gebruiker heeft op deze manier meer inzicht op wat zich afspeelt per datapunt of staaf in de grafiek. In deze table kan worden gesorteerd op datum en op volume.

## Features

- Zoeken op aandelen-ticker
- Toevoegen/verwijderen van favorieten (localStorage)
- Keuze tussen lijngrafiek of staafgrafiek
- Donkere modus ondersteuning
- Interval- en range-slider voor intraday & historische data

## Documentation

[Documentation](https://linktodocumentation)

### Elementen selecteren

Zie: `src/main.js`, lijn 36–55

- `document.getElementById(...)`, `querySelector(...)`

### Elementen manipuleren

Zie:

- `src/utils/transformChartData.js`
- `src/utils/renderLineChart.js`
- `src/utils/renderBarChart.js`
- Bijvoorbeeld: dynamisch toevoegen van grafieken, aanpassen van tabellen

### Events koppelen aan elementen

Bijvoorbeeld:

- `themeToggle.js` voor dark/light theme toggle
- `favorites.js` voor click-events op de favorites-knop
- `sliderControls.js` voor input-events op sliders
- `chartTypeToggle.js` voor dropdown-selectie

---

# Modern JavaScript

### Gebruik van constanten

Zie: `src/main.js`, lijn 36–55

- `const chartIcon = document.getElementById("chartIcon");`
- `...`

### Template literates

Zie: doorheen het volledige project
Bijvoorbeeld: `src/utils/populateStockTable.js`, lijn 13-18

**Iteratie over arrays:**
forEach methode wordt gebruikt om dynamisch DOM-elementen te generen op basis van de inhoud van de favorites array.
forEach methode wordt gebruikt om te itereren en functionaliteiten te koppelen aan de aanwezige items in de chartTypeToggle dropdown menu.

Zie:
-'src/ui/favorites.js', lijn 71
-'src/ui/chartTypeToggle.js', lijn 6

**Array methodes:**

zie:  
 -'src/ui/favorites.js', lijn 5, function updateFavoriteButtonState
-'src/ui/favorites.js', lijn 19, function toggleFavorites
-'src/ui/favorites.js', lijn 43, function removeFromFavorites
-'src/utils/sortTableByDate.js', lijn 8, 24, function sortTableByVolume & sortTableByDate

**Arrow functions:**
Zie doorheen het hele project.

**Conditional (ternary) operator:**
Zie: src/ui/themeToggle.js lijn 10 & 11, 21 & 22

**Callback functions:**
In het project worden callback functies gebruikt voor het uitvoeren van logica na bepaalde events.
Bijvoorbeeld bij het toevoegen/verwijderen van favorieten en het ophalen van gegevens bij het klikken op een opgeslagen ticker
Zie: src/main/main.js, lijn 91 & 99

Promises
Async & Await
Observer API (1 is voldoende)
Data & API:  
 Fetch om data op te halen
JSON manipuleren en weergeven
Opslag & validatie:  
 Formulier validatie
Gebruik van LocalStorage
Styling & layout:  
 Basis HTML layout
Basis CSS
Gebruiksvriendelijke elementen (verwijderknoppen, icoontjes,...)
Tooling & structuur:
Project is opgezet met Vite
Een correcte folderstructuur wordt aangehouden (gescheiden html, css en js files, src folder, dist folder, ...)
