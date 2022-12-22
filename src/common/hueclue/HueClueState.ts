import { AnySoaRecord } from "dns"

export default interface HueClueState {
    round: number
    type: 'clue' | 'vote'
    clues: string[]
    scores: any
    cluegiver: string
}