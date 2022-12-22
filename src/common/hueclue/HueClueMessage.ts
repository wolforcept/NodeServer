export default interface HueClueMessage {
    type: 'clue' | 'colorClick'
    payload: string
}