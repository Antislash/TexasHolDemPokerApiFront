# TexasHolDem Poker — Frontend

Interface React/TypeScript pour l'API TexasHolDem Poker.

## Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- npm

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd TexasHolDemPokerApiFront

# Installer les dépendances
npm install
```

## Configuration

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=https://localhost:7130
VITE_API_URL_ALT=https://localhost:44367
```

Adapter les URLs selon l'adresse de l'API en local.

## Lancer le projet

```bash
npm run dev
```

L'application est accessible sur `https://localhost:5173` (HTTPS activé via le plugin `@vitejs/plugin-basic-ssl`).

> Le certificat SSL étant auto-signé, accepter l'exception de sécurité dans le navigateur au premier lancement.
