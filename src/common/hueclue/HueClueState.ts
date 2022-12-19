import Player from "common/Player";

export default interface HueClueState {
    players: Player[]
    clues: string[]
    scores: number[]
}