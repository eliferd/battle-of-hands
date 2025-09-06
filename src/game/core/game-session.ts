import { Directive } from '@angular/core';
import { TurnData } from '../core/turn-data';
import { PickableType } from '../core/types';

@Directive()
export class GameSession {
  private _hasWon = false;
  private _hasStarted = false;
  private _turnDataList: TurnData[] = [];
  private readonly _turnMax;

  constructor(turnMax?: number) {
    const gameSessionSave = localStorage.getItem('gameSession');
    if (gameSessionSave !== null) {
      const {_hasWon, _hasStarted, _turnDataList, _turnMax} = JSON.parse(gameSessionSave);
      this._hasWon = _hasWon;
      this._hasStarted = _hasStarted;
      this._turnDataList = _turnDataList;
      this._turnMax = _turnMax;
    } else {
      this._turnMax = turnMax || 3;
    }
  }

  private updateBotChoice(turnData: TurnData): void {
    const botPossibleChoiceList = [PickableType.ROCK, PickableType.PAPER, PickableType.SCISSORS];
    turnData.botChoice = botPossibleChoiceList[Math.floor(Math.random() * (botPossibleChoiceList.length))];
  }

  private updatePlayerChoice(turnData: TurnData): void {
    switch (turnData.playerChoice) {
      case PickableType.PAPER:
        turnData.hasPlayerWon = turnData.botChoice === PickableType.ROCK;

        break;
      case PickableType.ROCK:
        turnData.hasPlayerWon = turnData.botChoice === PickableType.SCISSORS;
        break;
      case PickableType.SCISSORS:
        turnData.hasPlayerWon = turnData.botChoice === PickableType.PAPER;
        break;
    }
  }

  updateTurn(turnData: TurnData): void {
    this.updateBotChoice(turnData);
    this.updatePlayerChoice(turnData);

    if (!turnData.isDraw && this._turnDataList.length < this._turnMax) {
      this._turnDataList.push(turnData);
    }

    if (this._turnDataList.length === this._turnMax) {
      const wonRoundCount = this._turnDataList.filter(td => td.hasPlayerWon).length;
      this._hasWon = wonRoundCount > 0 && (wonRoundCount / this._turnMax) > 0.5;
      this._hasStarted = false;
    }
  }

  isEnded(): boolean {
    return this._turnDataList.length === this._turnMax && !this._hasStarted;
  }

  save(): void {
    localStorage.setItem('gameSession', JSON.stringify(this));
  }
}
