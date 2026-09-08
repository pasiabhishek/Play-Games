# 🎮 Play Games by Pasi Abhishek

A collection of simple, fun, browser-based games — built with plain HTML, CSS, and JavaScript. No frameworks, no build step: just open and play.

🔗 **[Live Demo](#)** *(add your GitHub Pages / hosting link here)*

## Games

### 🏃 Master Runner
A pixel-art endless runner set in a sleepy village. Dodge obstacles racing toward you by jumping over them — how far can you run?

- Choose between a **City Runner** or **Forest Runner** character
- Controls: `tap` / `click` / `space` / `↑` to jump
- Score increases the longer you survive

> More games coming soon — check back for updates! 👀

## Tech Stack

- **HTML5 & CSS3** – structure and styling
- **Vanilla JavaScript** – game logic, no external game engine
- **[Bootstrap 5](https://getbootstrap.com/)** – landing page layout and styling

## Project Structure

```
Play-Games/
├── index.html              # Landing page listing all games
└── Master Runner/
    ├── index.html           # Game entry point
    ├── style.css            # Game styles & animations
    ├── script.js            # Game logic
    └── images/              # Sprites, backgrounds, and audio
```

## Getting Started

Since this is a static site with no dependencies, you can run it locally in a couple of ways:

**Option 1: Just open it**
```bash
git clone https://github.com/<your-username>/Play-Games.git
cd Play-Games
open index.html   # or double-click the file
```

**Option 2: Serve it locally** (recommended, avoids browser file-access restrictions)
```bash
git clone https://github.com/<your-username>/Play-Games.git
cd Play-Games
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## How to Play

1. Open the landing page and click **Play Now** on a game.
2. On the start screen, hit **Change** to pick your runner, or **Play** to jump straight in.
3. Jump over obstacles using `tap`, `click`, `space`, or `↑`.
4. Survive as long as you can to rack up a high score!

## Contributing

Contributions are welcome! If you'd like to add a new game, improve existing gameplay, or fix a bug:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-game`)
3. Commit your changes
4. Open a pull request

## License

This project is open source. Feel free to use and modify it — consider adding a `LICENSE` file (e.g. MIT) to make the terms explicit.

## Author

**Pasi Abhishek**
