# ListifyAI

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express.js-4-black)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%2FLocal-47A248)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/AI-Gemini-blue)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg)](#-contributing)

A simple **MERN To-Do app** integrated with **Gemini AI**.  
Create tasks the usual way *or* generate smart task lists with AI.

---

## ✨ Features

- ✅ Create, update, complete, and delete to-dos
- 🧠 **AI-assisted** task generation via Gemini (prompt → suggested tasks)
- 🔄 Real-time feel with responsive UI
- 🗃️ MongoDB persistence (local or Atlas)
- 🔐 Environment-based configuration
- 🧪 Optional tests & linting setup

---

## 🧰 Tech Stack

- **Frontend:** React, Vite/CRA (JS), Fetch/Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas or local)
- **AI:** Gemini API (via `GEMINI_API_KEY`)

---


## ⚡ Quick Start

### Prerequisites
- Node.js **18+**
- npm or yarn
- MongoDB (local or Atlas)
- Gemini API Key

### Installation

```bash
# 1) Clone
git clone https://github.com/AkashBharangar/ListifyAI.git
cd ListifyAI

# 2) Install deps
cd backend && npm install
cd ../frontend && npm install
