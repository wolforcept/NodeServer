export default interface Message {
    type: 'createRoom' | 'sendToRoom' | 'getState' | 'state' | 'input'
    roomcode: string
    gamename: string
    payload: any
}