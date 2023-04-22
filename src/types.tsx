export interface BabylonMeshProps {
    spin: number;
    pos?: [number, number, number];
}

export interface GameData {
    gameStage: GameLoop | undefined;
    winningNumber: number | undefined;
    winners: Winner[];
}

export enum GameLoop {
    PLACE_BET = "PLACE BETS",
    NO_MORE_BETS = "NO MORE BETS",
    SPIN_WHEEL = "SPIN WHEEL",
    WINNER = "WINNER",
    EMPTY_BOARD = "EMPTY BOARD",
}

export interface Winner {
    id: string;
    win: number;
}