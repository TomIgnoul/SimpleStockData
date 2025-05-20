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
- Themaswitcher
- Interval- en range-slider voor intraday & historische data

# Technische vereisten

## 1. DOM manipulatie:

### Elementen selecteren

Zie: `src/main.js`, lijn 36–55

- `document.getElementById(...)`, `querySelector(...)`

### a. Elementen manipuleren

Zie:

- `src/utils/transformChartData.js`
- `src/utils/renderLineChart.js`
- `src/utils/renderBarChart.js`
- Bijvoorbeeld: dynamisch toevoegen van grafieken, aanpassen van tabellen

### b. Events koppelen aan elementen

Bijvoorbeeld:

- `themeToggle.js` voor dark/light theme toggle
- `favorites.js` voor click-events op de favorites-knop
- `sliderControls.js` voor input-events op sliders
- `chartTypeToggle.js` voor dropdown-selectie

---

## 2. Modern JavaScript

### a. Gebruik van constanten

Zie: `src/main.js`, lijn 36–55

- `const chartIcon = document.getElementById("chartIcon");`
- `...`

### b. Template literates

Zie: doorheen het volledige project

- Bijvoorbeeld: `src/utils/populateStockTable.js`, lijn 13-18

### c. Iteratie over Arrays

forEach methode wordt gebruikt om dynamisch DOM-elementen te generen op basis van de inhoud van de favorites array.
forEach methode wordt gebruikt om te itereren en functionaliteiten te koppelen aan de aanwezige items in de chartTypeToggle dropdown menu.

Zie:

-`src/ui/favorites.js`, lijn 71

-`src/ui/chartTypeToggle.js`, lijn 6

### d. Array methodes

zie:  
-`src/ui/favorites.js`, lijn 5, function updateFavoriteButtonState

-`src/ui/favorites.js`, lijn 19, function toggleFavorites

-`src/ui/favorites.js`, lijn 43, function removeFromFavorites

-`src/utils/sortTableByDate.js`, lijn 8, 24, function sortTableByVolume & sortTableByDate

### e. Arrow Functions

Gebruikt doorheen het hele project.

### f. Conditional (ternary) operator:

Zie:

- src/ui/themeToggle.js lijn 10 & 11, 21 & 22

### g. Callback functions

In het project worden callback functies gebruikt voor het uitvoeren van logica na bepaalde events.
Bijvoorbeeld bij het toevoegen/verwijderen van favorieten en het ophalen van gegevens bij het klikken op een opgeslagen ticker

- `src/main/main.js`, lijn 91, lijn 99
- `src/ui/favorites.js`, lijn 19, lijn 71

### h. Promises

- zie fetch() in `src/init/intraDay.js` en `src/init/dateRangeData.js`

### i. Async & Await

- `src/init/intraDay.js`

- `src/init/dateRangeData.js`

### j. Observer API

Er wordt gebruikt gemaakt van een Observer-API om de tabel te

zie:

- `src/ui/sliderControls.js`, lijn 110

## 3. Data & API

### a. Fetch

Wordt gebruikt om asynchroon data op te halen van een externe API.

zie:

- `src/init/intradayData.js`

- `src/init/dateRangeData.js`

### b. JSON maniupleren en weergeven

JSON-data die wordt opgehaald door Fetch() wordt omgezet via een functie transformToChart() om deze bruikbaar te maken voor de grafiek en tabellen.

- `src/utils/transformChartData.js`
- `src/utils/populateStockTable.js`

## 4. Opslag & validatie

### a. Formulier validatie

Er is momenteel geen klassieke formulier validatie. Wel wordt er user input gevalideerd in functie van de API-oproepen

- `src/utils/validateParams.js`

### b. Gebruik van LocalStorage

LocalStorage wordt gebruikt om favorites lokaal op te slaan:

- `src/ui/favorites.js`

## 5. Styling & layout

- [x] Basis HTML & CSS layout
- [x] Gebruiksvriendelijke elementen

## 6. Tooling & structuur

project is opgezet met Vite en er werd aandacht besteed
aan de folderstructuur om alles zo modulair en onderhoudsvriendelijk mogelijk te houden.


# Deployment

## ⚡ Quick Setup 
```bash
git clone https://github.com/TomIgnoul/SimpleStockData.git
cd SimpleStockData
python3 -m venv venv && source venv/bin/activate && pip install Flask
npm install
./start_api.sh    # of: WindowsStart_api.bat
npm run dev
```

## Full Setup
## Installeer Python, Venv en Flask (voor de API)
**🐧 Linux**
```bash
sudo apt install python3 python3-pip -y
```
**🍎 Mac**

Sla deze stap over als je brew al hebt geinstalleerd op je machine:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Installeer Python via Homebrew
```bash
brew install python
```
**🪟 Windows**

1. Download de installer:

- https://www.python.org/downloads/Windows/

2. Voer de installer uit

## 🟡 NodeJS + npm
**Linux:**  ```sudo apt install nodejs npm```

**Mac:** ```brew install node```  

**Windows:** Download & installeer Node.js van: https://nodejs.org/

## 🟡 Installatie virtuele omgeving & Flask

**Linux & Mac**

venv:
```bash
python3 -m venv venv
source venv/bin/activate
```
Flask:
```bash
pip install Flask
```

**Windows**

venv:
```powershell
python -m venv venv
venv\Scripts\activate
```

Flask:
```powershell
pip install Flask
```




## 🟡 Initialiseer de git repository

**Linux / Mac / Windows**

1. open de terminal / Git Bash
2. Navigeer naar de folder waar je de installatie wil uitvoeren
3. plak het volgende in de terminal: ```git clone https://github.com/TomIgnoul/SimpleStockData.git```

4. Druk op enter

## 🟡 Dependencies
Voer ```npm install``` uit in de rootmap van ```SimpleStockData``` om alle benodigde dependencies te installeren

## 🟡 Start de Applicatie
### *API Script uitvoeren:*
**Linux & Mac**

1. Maak het script (eenmalig) uitvoerbaar ```chmod +x start_api.sh```

2. Start de API met het voorziene script in de terminal:
```bash
./start_api.sh
```


**Windows**

1. Start de API met het voorziene script in de terminal:
```bash
windowsStart_api.bat
```

### *Run vite*

Open een tweede terminal en voer het volgende commando uit:
```bash
npm run dev
```

De applicatie wordt op de volgende locatie uitgevoerd:
- http://localhost:5173/
