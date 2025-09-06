import { Directive } from '@angular/core';
import { GameSession } from './game-session';

@Directive()
export class GameSessionHistory {

  private readonly _gameSessionList: GameSession[] = [];

  constructor() {
    const sessionHistory = localStorage.getItem('sessionHistory');
    if (sessionHistory === null) {
      localStorage.setItem('sessionHistory', JSON.stringify([]));
    } else {
      this._gameSessionList = JSON.parse(sessionHistory);
    }
  }

  save(session: GameSession): void {
    this._gameSessionList.push(session);
    localStorage.setItem('gameSession', JSON.stringify(this._gameSessionList));
  }
}
