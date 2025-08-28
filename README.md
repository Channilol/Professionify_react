# Professionify React - AI Text Formatter

Un tool AI moderno che formatta e riscrive il tuo testo in pochi secondi utilizzando l'intelligenza artificiale di Claude (Anthropic). Trasforma qualsiasi testo in base al destinatario, stile e lunghezza desiderata.

## 📸 Preview
![Demo App Flutter](https://i.ibb.co/NdKy4sXS/Professionify-Gif.gif)

## 🚀 Caratteristiche

- **Formattazione AI intelligente**: Utilizza Claude AI per riscrivere testi mantenendo il significato originale
- **Parametri personalizzabili**: Scegli stile, destinatario e lunghezza del testo
- **Interfaccia moderna**: Design responsive con tema chiaro/scuro
- **Copia rapida**: Copia il risultato negli appunti con un click
- **Server Express integrato**: Backend dedicato per le chiamate API

## 🛠️ Tecnologie Utilizzate

- **Frontend**: React 19, Redux Toolkit, React Router
- **Backend**: Express.js, Node.js
- **AI**: Anthropic Claude API (claude-3-5-haiku)
- **Styling**: CSS custom con supporto per temi
- **Icons**: React Icons

## 📋 Prerequisiti

- Node.js (versione 16 o superiore)
- NPM o Yarn
- API Key di Anthropic Claude

## ⚙️ Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd professionify-react
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   
   Crea un file `.env` nella root del progetto:
   ```env
   ANTHROPIC_API_KEY=your_claude_api_key_here
   ```

4. **Avvia il server backend**
   ```bash
   node server.js
   ```
   Il server sarà disponibile su `http://localhost:3001`

5. **Avvia l'applicazione React**
   ```bash
   npm start
   ```
   L'app sarà disponibile su `http://localhost:3000`

## 🎯 Come Usare

1. **Seleziona i parametri**:
   - **Stile**: professional email, casual message, formal letter, social media post
   - **Destinatario**: Specifica a chi è diretto il messaggio
   - **Lunghezza**: short (3-4 righe), standard (6-7 righe), long (8-9 righe)

2. **Inserisci il testo**: Scrivi o incolla il testo da formattare nell'area di input

3. **Genera**: Clicca su "Generate text" per ottenere la versione AI-formattata

4. **Copia**: Usa il pulsante copia per copiare il risultato negli appunti

## 📁 Struttura del Progetto

```
professionify-react/
├── public/                 # File statici
├── src/
│   ├── Components/         # Componenti React
│   │   ├── Dashboard/      # Componente principale
│   │   ├── Header/         # Header con tema toggle
│   │   ├── Hero/           # Sezione hero
│   │   ├── Dropdowns/      # Menu di selezione parametri
│   │   ├── TextArea/       # Area input/output testo
│   │   └── ThemeSwitch/    # Switch tema chiaro/scuro
│   ├── redux/              # Store e reducers Redux
│   ├── services/           # Servizi API
│   └── assets/             # Risorse statiche
├── server.js               # Server Express backend
└── package.json
```

## 🔧 Funzionalità Tecniche

### Backend (server.js)
- Server Express con supporto CORS
- Proxy per API Anthropic Claude
- Auto-restart con kill automatico della porta
- Gestione errori e logging

### Frontend
- **Redux**: Gestione stato per parametri di formattazione
- **React Router**: Navigazione (attualmente single-page)
- **Responsive Design**: Adattabile a mobile e desktop
- **Theme System**: Supporto tema chiaro/scuro con persistenza

### Servizio AI (textFormatterService.js)
- Integrazione Claude API
- Prompt engineering ottimizzato
- Gestione errori robusta
- Supporto per diversi stili e lunghezze

## 📚 Script Disponibili

- `npm start`: Avvia l'app in modalità sviluppo
- `npm test`: Esegue i test
- `npm run build`: Build per produzione
- `npm run eject`: Eject configurazione Create React App

## 🌟 Esempi di Utilizzo

**Input**: "Ciao, volevo sapere se domani possiamo fare la riunione"

**Parametri**: 
- Stile: professional email
- Destinatario: manager
- Lunghezza: standard

**Output**: "Gentile Manager, spero che questo messaggio La trovi bene. Desideravo cortesemente confermare la disponibilità per la riunione prevista domani. La prego di farmi sapere se l'orario concordato è ancora valido per Lei. Rimango a disposizione per qualsiasi eventuale modifica dell'agenda. Cordiali saluti."

## 🤝 Contribuire

1. Fork del progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 📞 Supporto

Per problemi o domande, apri una issue su GitHub o contatta il team di sviluppo.

---

*Sviluppato con ❤️ utilizzando React e Claude AI*
