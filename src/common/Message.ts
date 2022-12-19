export default interface Message {
    type: 'createRoom' | 'sendToRoom' | 'getState' | 'state'
    roomcode: string
    gamename: string
    payload: any
}