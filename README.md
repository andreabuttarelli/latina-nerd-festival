# Latina Nerd Festival — Web App

Web app mobile-first per il Latina Nerd Festival. SvelteKit + TailwindCSS, back-end Sanity.

- **Homepage** (`/`) — landing minimal con date, tagline e CTA verso l'app.
- **App** (`/app`) con bottom-nav:
  - **Programma** (`/app/programma`) — cronoprogramma su 2 giorni, scroll verticale,
    si posiziona in automatico sul giorno corrente, evidenzia gli eventi "Live".
  - **Scansiona** (`/app/scan`) — scanner QR via fotocamera.
  - **Missioni** (`/app/missioni`) — achievement con stato sbloccato/bloccato e progresso.
- **Deeplink missione** (`/app/m/<slug>`) — target dei QR: sblocca l'achievement.

> L'app funziona già in locale con **contenuti di esempio** (`src/lib/fallback.ts`)
> anche senza Sanity configurato. Per i dati reali, configura Sanity (sotto).

## Sviluppo

```bash
npm install
npm run dev
```

App su http://localhost:5173.

## Configurazione Sanity

1. **Crea il progetto** (una volta):
   ```bash
   cd studio
   npm install
   npx sanity login
   npx sanity init --bare        # crea il progetto e ti dà il PROJECT_ID
   ```
2. **Variabili d'ambiente dell'app** — copia `.env.example` in `.env` e compila:
   ```
   PUBLIC_SANITY_PROJECT_ID=<project-id>
   PUBLIC_SANITY_DATASET=production
   SANITY_WRITE_TOKEN=<token con permessi di scrittura>
   ```
   Il token si crea su https://sanity.io/manage → API → Tokens (ruolo *Editor*).
   È usato **solo lato server** (`/api/unlock`), mai esposto al browser.
3. **Studio** — imposta il project id e avvia lo studio per inserire i contenuti:
   ```bash
   cd studio
   SANITY_STUDIO_PROJECT_ID=<project-id> npm run dev   # http://localhost:3333
   # deploy hosted studio:
   SANITY_STUDIO_PROJECT_ID=<project-id> npm run deploy
   ```
4. **CORS** — in https://sanity.io/manage aggiungi l'origin dell'app
   (es. `http://localhost:5173` e il dominio di produzione) tra gli allowed origins.

### Contenuti (schema)
- `festival` — dati homepage (nome, tagline, date, luogo, hero, highlights).
- `event` — eventi del programma (titolo, giorno, orari, palco, speaker).
- `mission` — missioni/achievement; lo **slug** è quello usato nel QR.
- `userProgress` — progresso per device (creato dal server, sola lettura nello studio).

## Missioni & QR

Ogni QR codifica un deeplink:

```
https://<dominio>/app/m/<slug-della-missione>
```

- Scansionato **dentro l'app** (tab Scansiona) → naviga al deeplink e sblocca.
- Scansionato con la **fotocamera nativa** del telefono → apre il deeplink e sblocca.

L'identità è anonima: al primo accesso si genera un `uuid` in localStorage (solo per
identificare il device); il progresso vero è salvato su Sanity nel documento `userProgress`.

> Nota: la fotocamera richiede **HTTPS** (o `localhost`). In produzione assicurati
> che il sito sia servito in HTTPS, altrimenti il browser blocca l'accesso alla camera.

## Build

```bash
npm run build && npm run preview
```

Deploy consigliato su Vercel/Netlify (adapter-auto rileva l'ambiente).
Imposta le stesse variabili d'ambiente nel pannello del provider.
