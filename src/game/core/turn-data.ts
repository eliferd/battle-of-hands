import { Directive } from '@angular/core';
import { PickableType } from '../core/types';

@Directive()
export class TurnData {
  private _playerChoice: PickableType;
  private _botChoice!: PickableType;
  private _hasPlayerWon = false;

  constructor(playerChoice: PickableType) {
    this._playerChoice = playerChoice;
  }

  get playerChoice(): PickableType {
    return this._playerChoice;
  }

  get botChoice(): PickableType {
    return this._botChoice;
  }

  set botChoice(value: PickableType) {
    this._botChoice = value;
  }

  get isDraw(): boolean {
    return this.playerChoice === this.botChoice;
  }

  get hasPlayerWon(): boolean {
    return this._hasPlayerWon;
  }

  set hasPlayerWon(value: boolean) {
    this._hasPlayerWon = value;
  }
}
