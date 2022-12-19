import Message from "common/Message";

const port = process.env.PORT || 3001;

export default class Socket {

    private gamename: string;
    private socket?: WebSocket;
    private onMessage: null | ((m: any) => void) = null;

    constructor(gamename: string) {
        this.gamename = gamename
    }

    // async test() {
    //     const path = '/rooms';
    //     console.log('testing connection to ' + path)
    //     const response = await fetch(path);
    //     console.log(response)
    // }

    connect(roomcode: string, onConnect: ((event: any) => void)): Socket {

        console.log("[Socket] Connecting...")
        this.socket = new WebSocket(`ws://localhost:${port}/`);
        this.socket.onerror = (ev: Event) => {
            console.log('could not connect to game ' + this.gamename)
        }
        this.socket.onopen = (e) => {
            console.log("[Socket] Connected!")
            this.send({ type: 'createRoom', gamename: this.gamename, roomcode, payload: { test: false } })
            onConnect(e);
        };
        this.socket.onmessage = (m) => {
            console.log("[Socket] " + m)
            if (this.onMessage)
                this.onMessage(m);
        }
        return this;
    }

    message(onMessage: ((m: any) => void)): Socket {
        this.onMessage = onMessage;
        // if (this.socket)
        //     this.socket.onmessage = (m) => {
        //         console.log("[Socket] " + m)
        //         onMessage(m);
        //     }
        return this;
    }

    send(object: Message) {
        if (this.socket)
            this.socket.send(JSON.stringify(object));
    }

}