import { Container, createStyles, Footer, Text } from '@mantine/core';
import Connector from 'components/Connector/Connector';
import Socket from 'components/Connector/Socket';
import { ReactElement, useState } from 'react';
import HueClueState from "common/hueclue/HueClueState";
import Message from 'common/Message';

const NUMBERS = 25;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
const useStyles = createStyles((theme) => ({
    cell: {
        width: 32,
        height: 32,
        margin: 4,
        textAlign: 'center',
        fontWeight: 'bold',
    }
}))

function HueClue() {
    const { classes } = useStyles();

    const [isConnected, setIsConnected] = useState(false)
    const [socket] = useState(new Socket('hueclue').message(onMessage))
    const [state, setState] = useState(null as (null | HueClueState))

    const connector = <Connector socket={socket} onConnect={() => setIsConnected(true)}></Connector>;
    if (!isConnected)
        return connector;

    function onMessage(m: Message) {
        if (m.type === 'state') {
            setState(JSON.parse(m.payload) as HueClueState)
        }
    }

    function sendInput() {

    }

    function createColorTable(): Array<ReactElement> {
        const rows: Array<ReactElement> = [];
        const nrs: Array<ReactElement> = [];

        let i = 0;

        nrs.push(<td key={i++} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}></td>)
        for (let r = 0; r < NUMBERS; r++)
            nrs.push(<td key={i++} className={classes.cell} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>{r + 1}</td>)
        rows.push(<tr key={i++}>{nrs}</tr>)

        const nC = LETTERS.length - 1;
        const nR = NUMBERS - 1;
        const cC = 255 / nC;
        const cR = 255 / nR;

        for (let c = 0; c < LETTERS.length; c++) {

            const nrs: Array<ReactElement> = [];

            nrs.push(<td key={i++} className={classes.cell} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>{LETTERS[c]}</td>)
            const green = c * cC;
            for (let r = 0; r < NUMBERS; r++) {
                const red = r * cR;
                const blue = (nR - r) * cR;

                const _centerness1 = (1 - Math.abs((c - nC / 2) * 2 / nC));
                const _centerness2 = (1 - Math.abs((r - nR / 2) * 2 / nR));
                const centerness = _centerness1 * _centerness2 * 128;

                nrs.push(<td key={i++} className={classes.cell} style={{ backgroundColor: `rgba(${red + centerness}, ${green + centerness}, ${blue + centerness})` }}></td>)
            }

            rows.push(<tr key={i++}>{nrs}</tr>)

        }
        return rows;
    }

    return (
        <>
            <table style={{ float: 'left' }}>
                <tbody>
                    {createColorTable()}
                </tbody>
            </table>
            <div style={{ float: 'left', width: 300, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Container style={{ textAlign: 'center' }}>
                    <h3>Clues:</h3>
                    {state && state.clues.length > 0 ? state.clues.map(x => <Text>x</Text>) : <Text>No clues yet.</Text>}
                    <h3>Score:</h3>
                    {state && state.scores.length > 0 ? state.scores.map(x => <Text>x</Text>) : <Text></Text>}
                </Container>
                <Footer height='36px' >
                    <Container>
                        <Text>Current Clue Giver: </Text>
                    </Container>
                </Footer>
            </div>
        </>
    )
}

export default HueClue;