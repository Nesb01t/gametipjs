import { GameTipPosition, ScreenPosition } from "./position";

export class GameTip {
  private _position: GameTipPosition;
  private _tipElem: HTMLDivElement | null;
  private _offset: ScreenPosition = { x: 20, y: 5 };

  constructor() {
    this._position = new GameTipPosition();
    this._tipElem = null;
  }

  follow() {
    this._position.followMouse();
    this._position.setPositionExecutor((pos: ScreenPosition) => {
      this.setTipPosition(pos);
    });
  }

  unfollow() {
    this._position.unfollowMouse();
  }

  initTip() {
    this._tipElem = document.createElement("div");
    this._tipElem.style.position = "absolute";

    /**
     * default styles
     */
    this._tipElem.style.transition =
      "width 0.4s, height 0.4s, backgroundColor 0.4s";

    document.body.appendChild(this._tipElem);

    this.setTipPosition(this._position.getPosition());
  }

  setTipPosition(pos: ScreenPosition) {
    if (!this._tipElem) {
      throw new Error("Tip element not initialized");
    }

    const { x, y } = pos;
    const { x: offsetX, y: offsetY } = this._offset;
    this._tipElem.style.left = `${x + offsetX}px`;
    this._tipElem.style.top = `${y + offsetY}px`;
  }

  setStyle(styleObj: Partial<CSSStyleDeclaration>) {
    if (!this._tipElem) {
      throw new Error("Tip element not initialized");
    }

    Object.assign(this._tipElem.style, styleObj);
  }
}
