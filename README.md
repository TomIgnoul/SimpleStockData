
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
