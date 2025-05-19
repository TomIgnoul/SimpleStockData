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

# Technische vereisten

## 1. DOM manipulatie:

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

## 2. Modern JavaScript

### Gebruik van constanten

Zie: `src/main.js`, lijn 36–55

- `const chartIcon = document.getElementById("chartIcon");`
- `...`

### Template literates

Zie: doorheen het volledige project

- Bijvoorbeeld: `src/utils/populateStockTable.js`, lijn 13-18

### Iteratie over Arrays

forEach methode wordt gebruikt om dynamisch DOM-elementen te generen op basis van de inhoud van de favorites array.
forEach methode wordt gebruikt om te itereren en functionaliteiten te koppelen aan de aanwezige items in de chartTypeToggle dropdown menu.

Zie:

-`src/ui/favorites.js`, lijn 71

-`src/ui/chartTypeToggle.js`, lijn 6

### Array methodes

zie:  
-`src/ui/favorites.js`, lijn 5, function updateFavoriteButtonState

-`src/ui/favorites.js`, lijn 19, function toggleFavorites

-`src/ui/favorites.js`, lijn 43, function removeFromFavorites

-`src/utils/sortTableByDate.js`, lijn 8, 24, function sortTableByVolume & sortTableByDate

### Arrow Functions

Gebruikt doorheen het hele project.

### Conditional (ternary) operator:

Zie:

- src/ui/themeToggle.js lijn 10 & 11, 21 & 22

### Callback functions

In het project worden callback functies gebruikt voor het uitvoeren van logica na bepaalde events.
Bijvoorbeeld bij het toevoegen/verwijderen van favorieten en het ophalen van gegevens bij het klikken op een opgeslagen ticker

- `src/main/main.js`, lijn 91, lijn 99
- `src/ui/favorites.js`, lijn 19, lijn 71

### Promises

- zie fetch() in `src/init/intraDay.js` en `src/init/dateRangeData.js`

### Async & Await

- `src/init/intraDay.js`

- `src/init/dateRangeData.js`

### Observer API

## 3. Data & API

### Fetch

Wordt gebruikt om asynchroon data op te halen van een externe API.

zie:

- `src/init/intradayData.js`

- `src/init/dateRangeData.js`

### JSON maniupleren en weergeven

JSON-data die wordt opgehaald door Fetch() wordt omgezet via een functie transformToChart() om deze bruikbaar te maken voor de grafiek en tabellen.

- `src/utils/transformChartData.js`
- `src/utils/populateStockTable.js`

## 4. Opslag & validatie

### Formulier validatie

Er is momenteel geen klassiek formulier validatie. Wel wordt er input gevalideerd input gevalideerd in functie van de API-oproepen

- `src/utils/validateParams.js`

### Gebruik van LocalStorage

LocalStorage wordt gebruikt om favorites lokaal op te slaan:

- `src/ui/favorites.js`

## 5. Styling & layout

- [x] Basis HTML & CSS layout
- [x] Gebruiksvriendelijke elementen

## 6. Tooling & structuur

project is opgezet met Vite en er werd aandacht besteed
aan de folderstructuur om alles zo modulair en onderhoudsvriendelijk mogelijk te houden.
