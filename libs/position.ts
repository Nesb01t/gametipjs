export interface ScreenPosition {
  x: number;
  y: number;
}

export const DEFAULT_POSITION: ScreenPosition = {
  x: 0,
  y: 0,
};
export class GameTipPosition {
  /**
   * position
   */
  private _position: ScreenPosition;
  private _executor: (...args: any[]) => any;

  constructor(pos?: ScreenPosition) {
    this._position = pos ?? DEFAULT_POSITION;
    this._executor = () => {};
  }

  setPositionExecutor(cb: (...args: any[]) => any) {
    this._executor = cb;
  }

  getPositionExecutor() {
    return this._executor;
  }

  setPosition(pos: ScreenPosition) {
    this._position = pos;
    this.getPositionExecutor()(pos);
  }

  getPosition() {
    return this._position;
  }

  /**
   * follow mouse
   */
  private _following: boolean = false;
  followMouse() {
    if (this._following) {
      throw new Error("Already following mouse");
    }

    document.addEventListener("mousemove", (evt) => {
      const pos: ScreenPosition = {
        x: evt.clientX,
        y: evt.clientY,
      };
      this.getPositionExecutor()(pos);
    });
    this._following = true;
  }

  unfollowMouse() {
    if (!this._following) {
      throw new Error("Not following mouse");
    }

    document.removeEventListener("mousemove", (evt) => {
      const pos: ScreenPosition = {
        x: evt.clientX,
        y: evt.clientY,
      };
      this.getPositionExecutor()(pos);
    });
    this._following = false;
  }
}
