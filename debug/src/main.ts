import "./style.css";
import { GameTip } from "../../libs/game-tip.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const tip = new GameTip();
tip.initTip();
tip.follow();

tip.setStyle({
  background: "linear-gradient(135deg, #e66465, #9198e5)",
  width: `240px`,
  height: `140px`,
  opacity: "0.5",
  borderRadius: "6px",
  filter: `drop-shadow(0 0 5px black)`,
  zIndex: "10",
});
