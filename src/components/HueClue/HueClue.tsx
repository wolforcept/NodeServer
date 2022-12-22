import { ActionIcon, Container, CopyButton, Text, TextInput, Tooltip } from '@mantine/core';
import Connector from 'components/Connector/Connector';
import Socket from 'components/Connector/Socket';
import { ReactElement, useState } from 'react';
import HueClueState from "common/hueclue/HueClueState";
import HueClueMessage from "common/hueclue/HueClueMessage";
import Message from 'common/Message';
import './HueClue.scss';
import Player from 'common/Player';
import { IconZoomQuestion, IconArrowRight, IconCheck, IconCopy } from '@tabler/icons';
import AnimalImage from 'components/AnimalImage/AnimalImage';
import Canvas from 'components/Canvas/Canvas';

// const NUMBERS = 25;
const NUMBERS = 15;
// const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const CANVAS_W = 500, CANVAS_H = 500, CANVAS_R = 200;
const COLORS: Array<string[]> = (() => {
    const colors = [];
    for (var x = 0; x < CANVAS_W; x++) {
        var row: string[] = []
        for (var y = 0; y < CANVAS_H; y++) {
            const { a, d: _d } = c2p(x - CANVAS_W / 2, y - CANVAS_W / 2);
            const d = _d / CANVAS_R // normalize d
            if (d <= 1) {
                const rgb = HSVtoRGB((a + Math.PI) / (Math.PI * 2), d, 1);
                row.push(rgbToHex(rgb))
            } else {
                const alpha = .2 * (1 - ((d - 1) / .2));
                row.push(`rgba(0,0,0, ${alpha})`)
            }
        }
        colors.push(row)
    }
    return colors;
})()

function HSVtoRGB(h: number, s: number, v: number) {
    let r = 0, g = 0, b = 0;
    let i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function c2p(x: number, y: number) {
    return {
        a: Math.atan2(y, x),
        d: Math.sqrt(x * x + y * y),
    }
}

function rgbToHex({ r, g, b, a }: { r: number, g: number, b: number, a?: number }) {
    if (a)
        return "#" + (
            [r.toString(16), g.toString(16), b.toString(16), a.toString(16)]
                .map(x => (x.length === 1) ? "0" + x : x)
                .join("")
        )
    return "#" + (
        [r.toString(16), g.toString(16), b.toString(16)]
            .map(x => (x.length === 1) ? "0" + x : x)
            .join("")
    )
}

function HueClue() {

    const [isConnected, setIsConnected] = useState(false)
    const [socket] = useState(new Socket('hueclue', onMessage))
    const [state, setState] = useState(null as (null | HueClueState))
    const [players, setPlayers] = useState([] as Player[]);
    const [clue, setClue] = useState("");
    const [colorIsHeld, setColorIsHeld] = useState(false);
    const [color, setColor] = useState("");

    const connector = <Connector socket={socket} callback={() => setIsConnected(true)}></Connector>;
    if (!isConnected)
        return connector;

    function onMessage(m: Message) {

        switch (m.type) {
            case 'state':
                setState(JSON.parse(m.payload) as HueClueState)
                console.log("[HueCue] updated state")
                break;

            case 'players':
                const players = JSON.parse(m.payload) as Player[]
                console.log(players)
                if (players)
                    setPlayers(players)
                break;
        }

    }

    function onCanvasMouseDown(x: number, y: number) {
        setColorIsHeld(true)
    }

    function onCanvasMouseUp(x: number, y: number) {
        setColorIsHeld(false)
    }

    function onCanvasMouseMove(x: number, y: number) {
        if (colorIsHeld)
            setColor(COLORS[x][y])
    }

    function sendInput(type: string, payload: any) {
        socket.sendInput({ type, payload })
    }

    function createColorTable(): ReactElement {

        const w = 500, h = 500, radius = 200;
        // return <></>
        return <Canvas w={w} h={h} onMouseDown={onCanvasMouseDown} onMouseMove={onCanvasMouseMove} onMouseUp={onCanvasMouseUp} draw={
            (ctx: CanvasRenderingContext2D) => {
                for (var x = 0; x < w; x++) {
                    for (var y = 0; y < h; y++) {
                        ctx.fillStyle = COLORS[x][y];
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            }
        }></Canvas >
        // const rows: Array<ReactElement> = [];
        // const nrs: Array<ReactElement> = [];

        // let i = 0;

        // nrs.push(<td key={i++} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}></td>)
        // for (let r = 0; r < NUMBERS; r++)
        //     nrs.push(<td key={i++} className='cell' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>{r + 1}</td>)
        // rows.push(<tr key={i++}>{nrs}</tr>)

        // const nC = LETTERS.length - 1;
        // const nR = NUMBERS - 1;
        // const cC = 255 / nC;
        // const cR = 255 / nR;

        // for (let c = 0; c < LETTERS.length; c++) {

        //     const nrs: Array<ReactElement> = [];

        //     nrs.push(<td key={i++} className='cell' style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>{LETTERS[c]}</td>)
        //     const green = c * cC;
        //     for (let r = 0; r < NUMBERS; r++) {
        //         const red = r * cR;
        //         const blue = (nR - r) * cR;

        //         const _centerness1 = (1 - Math.abs((c - nC / 2) * 2 / nC));
        //         const _centerness2 = (1 - Math.abs((r - nR / 2) * 2 / nR));
        //         const centerness = _centerness1 * _centerness2 * 128;

        //         nrs.push(<td onClick={() => sendInput("clickColor", { x: c, y: r })} key={i++} className='cell' style={{ backgroundColor: `rgba(${red + centerness}, ${green + centerness}, ${blue + centerness})` }}></td>)
        //     }

        //     rows.push(<tr key={i++}>{nrs}</tr>)

        // }
        // return rows;
    }

    const scores: ReactElement[] = [];
    if (state) {
        Object.entries(state.scores).forEach(([username, score]) => {
            scores.push(<div>
                <AnimalImage animal={players.find(x => x.username === username)?.animal ?? ""} height={32} />
                <Text className='username' display='inline' key={username} >{username}: </Text>
                <Text display='inline' weight={'bold'}>{"" + score}</Text>
            </div>)
        });
    }

    function sendClue(): void {
        if (state)
            setState({ ...state, type: "vote" })
        socket.sendInput({ type: 'clue', payload: clue } as HueClueMessage)
    }

    return (
        <div className='hueclue'>
            <div className="main">

                <div className="left">
                    <div className='score'>
                        <h3>Score:</h3>
                        {scores}
                    </div>
                    <div className='yourColor' style={{ backgroundColor: color }}>
                        test
                    </div>
                </div>

                <table>
                    <tbody>
                        {createColorTable()}
                    </tbody>
                </table>

                <div className='right' >
                    <div className='top'>
                        <h3>Clues:</h3>

                        {state && state.clues.length > 0 ? state.clues.map((x, i) => <Text key={i}>{x}</Text>) : <Text>No clues yet.</Text>}


                    </div>
                    <div className='bottom'>
                        {state?.type === 'vote' &&
                            (
                                state?.cluegiver !== socket.player?.username
                                    ? <h4>Pick a location based on the clues!</h4>
                                    : <h4>Players are choosing their locations!</h4>
                            )
                        }

                        {state?.type === 'clue' &&
                            (
                                state?.cluegiver === socket.player?.username
                                    ? <Container>
                                        <h4>You are the Clue Giver:</h4>
                                        <TextInput
                                            icon={<IconZoomQuestion size={18} stroke={1.5} />}
                                            radius="md"
                                            size="md"
                                            rightSection={
                                                <ActionIcon onClick={() => sendClue()} size={32} radius="md" variant="filled">
                                                    <IconArrowRight size={18} stroke={1.5} />
                                                </ActionIcon>
                                            }
                                            placeholder="Send a clue!"
                                            rightSectionWidth={42}
                                            value={clue}
                                            onChange={(e) => { setClue(e.target.value) }}
                                        />

                                    </Container>
                                    : <>
                                        <h4>Current Clue Giver:</h4>
                                        <Text>{state ? state.cluegiver : ""}</Text>
                                    </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="footer">
                <Text className='roomcodeLabel'>Room Code: </Text>
                <Text>{socket.roomcode ?? ""}</Text>
                <CopyButton value={socket.roomcode ?? ""} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                            <ActionIcon className='copyIcon' color={copied ? 'teal' : 'gray'} onClick={copy}>
                                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </div>
        </div>
    )
}

export default HueClue;