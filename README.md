# ♟️ Multiplayer Chess Game

A real-time multiplayer chess game built with **Node.js**, **Express.js**, **Socket.IO**, **Chess.js**, and **EJS**.

Players can join as White or Black, while additional users can watch the game in spectator mode. The game synchronizes moves instantly across all connected clients and includes check/checkmate detection.

---

## 🚀 Features

- 🎮 Real-time multiplayer gameplay using Socket.IO
- ♟️ Interactive drag-and-drop chess pieces
- 👥 Automatic player assignment (White / Black)
- 👀 Spectator mode for additional users
- 🔄 Live board synchronization across clients
- 🔍 Legal move highlighting
- ⚔️ Capture move highlighting
- 🔁 Board auto-flip for Black player
- 📌 Last move highlighting
- 🚨 Check detection with king highlighting
- 🏆 Checkmate detection and game-over screen
- 📱 Responsive design for desktop and mobile devices

---

## 🛠️ Technologies Used

- **Node.js** – Backend runtime
- **Express.js** – Web server
- **Socket.IO** – Real-time communication
- **Chess.js** – Chess rules and move validation
- **EJS** – Server-side rendering
- **HTML, CSS, JavaScript** – Frontend

---

## 📂 Project Structure

```text
.
├── public
│   ├── css
│   │   └── chessGame.css
│   └── js
│       └── chessGame.js
├── views
│   └── index.ejs
├── app.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm start
```

or

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🎯 How to Play

1. Open the application in two browser tabs/devices.
2. The first user becomes **White**.
3. The second user becomes **Black**.
4. Any additional users join as **Spectators**.
5. Players take turns making legal chess moves.
6. The game announces check and checkmate automatically.

---

## 🔮 Future Improvements

- Draw detection (stalemate, threefold repetition, insufficient material)
- Game restart button
- Player timer / chess clock
- Move history panel
- PGN export
- User authentication
- Online matchmaking
- Game rooms with unique IDs

---

## 📸 Screenshots

<h3>Game Board</h3>
<img src="/public/screenshot/ss.png" width="700">



---

## 👨‍💻 Author

**Yash Baraiya**

GitHub: https://github.com/yashBaraiya-tech