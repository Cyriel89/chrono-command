# 🕰️ Chrono-Command

Application Fullstack de gestion d'horloges synchronisées en temps réel.
Ce projet a été réalisé pour simuler une architecture de distribution d'heure avec des contraintes techniques modernes.

## 🚀 Fonctionnalités

* **Temps Réel (Socket.IO)** : Synchronisation instantanée entre le serveur maître et toutes les horloges clientes (Broadcast).
* **Persistance (SQL)** : Sauvegarde de l'état des horloges, des alarmes et des configurations.
* **Dashboard** : Interface Angular réactive (Signals) pour piloter le parc d'horloges.
* **Conteneurisation** : Déploiement complet via Docker & Docker Compose.

## 🛠️ Stack Technique

* **Frontend** : Angular 17+ (Signals, Standalone Components), SCSS.
* **Backend** : Node.js, Express, TypeScript.
* **Communication** : Socket.IO (WebSockets), REST API.
* **Base de données** : SQLite (Dev), Prisma ORM.
* **DevOps** : Docker, Docker Compose, Nginx.

## 📦 Installation & Démarrage

Le projet est entièrement "Dockerisé". Vous n'avez besoin que de Docker pour le lancer.

1.  **Cloner le dépôt**
    ```bash
    git clone [https://github.com/TON_PSEUDO/chrono-command.git](https://github.com/TON_PSEUDO/chrono-command.git)
    cd chrono-command
    ```

2.  **Lancer l'application**
    ```bash
    docker-compose up --build
    ```

3.  **Accéder à l'application**
    * Frontend : `http://localhost:8080`
    * API : `http://localhost:3000`

## 🏗️ Architecture

* `backend/` : Serveur Node.js avec Prisma et Socket.IO.
* `frontend/` : Application Angular servie par Nginx en production.
* `docker-compose.yml` : Orchestration des services.

---
*Projet réalisé dans le cadre d'un auto-formation technique.*