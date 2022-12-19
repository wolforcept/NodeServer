import { Button, Card, Space, TextInput, Title } from "@mantine/core";
import { FC, useState } from "react";
import Socket from "./Socket";

interface ConnectorProps {
    socket: Socket;
    onConnect: (() => void)
}

const Connector: FC<ConnectorProps> = ({ socket, onConnect }) => {

    const [username, setUsername] = useState<string>('');
    const [code, setCode] = useState(Math.random().toString().substring(2, 20));

    function submit() {
        socket.message(m => console.log(m));
        socket.connect(code, onConnect)
    }

    return (
        <div className="fill">
            <Card w={400} m='auto'>
                <Title align="center">Hue Clue</Title>
                <Space h="md" />
                <img src="asd" alt="test"></img>
                <Space h="md" />
                <TextInput
                    placeholder="username"
                    label="Username"
                    radius="md"
                    size="md"
                    value={username} onChange={e => setUsername(e.currentTarget.value)}
                /><Space h="md" />
                <TextInput
                    placeholder="game code"
                    label="Game Code"
                    radius="md"
                    size="md"
                    value={code} onChange={e => setCode(e.currentTarget.value)}
                />
                <Space h="xs" />
                <Button w={'100%'} variant="default" onClick={submit}>Enter</Button>
            </Card>
        </div>
    )
}

export default Connector;
