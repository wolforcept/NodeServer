import Message from "common/Message";
import Player from "common/Player";

const port = process.env.PORT || 3001;
const verbose = false;

export default class Socket {

    public player: Player | null = null;

    roomcode: null | string = null;
    private socket?: WebSocket;

    constructor(
        private gamename: string,
        private onMessage: ((m: Message) => void),
    ) { }

    connect(username: string, animal: string, roomcode: string, callback: () => void) {

        if (!roomcode)
            throw new Error("invalid roomcode");
        if (!animal)
            throw new Error("invalid animal");
        if (!username)
            throw new Error("invalid username");

        this.player = { username, animal }
        this.roomcode = roomcode;

        console.log("[Socket] Connecting...")
        this.socket = new WebSocket(`ws://localhost:${port}/`);
        this.socket.onerror = (ev: Event) => {
            console.log('[Socket] Could not connect to game ' + this.gamename)
        }
        this.socket.onopen = (e) => {
            console.log("[Socket] Connected!")
            console.log("[Socket] Joining room...")
            this.send({ type: 'joinRoom', gamename: this.gamename, roomcode: roomcode, sender: username, payload: { animal } })
        };
        this.socket.onmessage = (e: MessageEvent) => {
            if (verbose) console.log("[Socket] message received")
            const m = JSON.parse(e.data) as Message;
            if (verbose) console.log(m)

            switch (m.type) {
                case 'joinedRoom': {
                    console.log("[Socket] Joined room!");
                    callback();
                } break;

                default: this.onMessage(m)
            }

            return false;
        }
    }

    send(object: Message) {
        if (this.socket)
            this.socket.send(JSON.stringify(object));
    }

    sendInput(payload: any) {
        if (this.roomcode && this.player)
            this.send({ gamename: this.gamename, roomcode: this.roomcode, type: "input", payload: JSON.stringify(payload), sender: this.player.username })
    }

}