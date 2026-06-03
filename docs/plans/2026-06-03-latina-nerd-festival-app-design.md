# Latina Nerd Festival — Web App (design)

Data: 2026-06-03

## Obiettivo
Web app mobile-first per il Latina Nerd Festival (evento di 2 giorni). Design minimal,
stile "Senior Apple Designer". Back-end Sanity. Nessun test, implementazione veloce e diretta.

## Stack
- **SvelteKit** (Svelte 5) + TypeScript
- **TailwindCSS v4** per lo styling minimal
- **Sanity** come CMS/back-end (studio nello stesso repo, cartella `studio/`)
- **@sanity/client** per read (pubblico) e write (via endpoint server con token)
- **qr-scanner** (Nimiq) per la scansione QR via camera (WebRTC getUserMedia)

## Decisioni prese col cliente
- Tutto su Sanity (anche il progresso utente), niente Supabase.
- Identità anonima: `uuid` (crypto.randomUUID) salvato in localStorage SOLO per identificare il device.
  Il progresso vero vive su Sanity nel documento `userProgress`.
- Homepage da zero con contenuti placeholder (Sanity-driven).
- QR = deeplink URL.

## Struttura
```
src/routes/
  +page.svelte              # Homepage minimal
  app/+layout.svelte        # Shell + bottom tab nav translucida (Apple-style)
  app/+page.svelte          # redirect → /app/programma
  app/programma/            # Cronoprogramma 2 giorni, scroll verticale, auto-scroll al giorno corrente
  app/scan/                 # Scanner QR via camera
  app/missioni/             # Lista achievement (locked/unlocked)
  app/m/[slug]/             # Target deeplink: sblocca la missione + animazione
  api/unlock/+server.ts     # Endpoint server: write progresso su Sanity (token server-only)
src/lib/
  sanity.ts                 # client + query GROQ
  user.ts                   # uuid anonimo in localStorage
  components/
studio/                     # Sanity Studio
```

## Schema Sanity
- `festival` (singleton): name, tagline, dates {start,end}, location, description, heroImage
- `event` (programma): title, description, day (date), startTime, endTime, stage/location, speaker
- `mission`: title, slug, description, achievementTitle, achievementDescription, emoji/icon, points
- `userProgress`: anonId (string, unique), unlocked (array di reference a mission), updatedAt

## Flusso QR / missioni
1. Il QR codifica `https://<host>/app/m/<mission-slug>`.
2. Scanner legge il QR → se l'URL combacia con host+`/app/m/`, estrae lo slug e naviga lì
   (funziona anche aprendo il deeplink dalla camera nativa del telefono).
3. `/app/m/[slug]`: carica la missione da Sanity, garantisce un `anonId`, fa POST a `/api/unlock`.
4. `/api/unlock` valida lo slug, trova/crea `userProgress`, appende la missione se non già presente
   (setIfMissing + insert idempotente), usa `SANITY_WRITE_TOKEN` (server-only).
5. UI mostra "Achievement sbloccato!" con animazione, link a /app/missioni.

## Design language (minimal Apple)
- Sfondo near-white / dark a contrasto, tipografia grande (system font stack SF-like), molta aria.
- Card arrenondite, ombre soffuse, bottom-nav translucida (backdrop-blur).
- Mobile-first, transizioni leggere, accent color singolo del festival.

## Env
- `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` (read)
- `SANITY_WRITE_TOKEN` (server-only, write)

## Out of scope (YAGNI)
- Login/auth reale, classifiche condivise, push notification, test automatici.
