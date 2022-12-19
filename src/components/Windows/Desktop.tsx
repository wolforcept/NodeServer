import { FC, ReactElement, useState } from 'react';
import Window, { WindowInitProps } from 'components/Windows/Window'

interface WindowsProps {
    children: any;
}

export const DesktopFunctions = {
    bringToFront: (_: any) => { },
    openApp: (_: WindowInitProps, __: () => ReactElement) => { },
    closeApp: (_: number) => { },
}

const Desktop: FC<WindowsProps> = function ({ children }) {

    const [size, setSize] = useState(undefined as ({ w: number, h: number } | undefined));
    const [nextId, setNextId] = useState(0);
    const [windows, setWindows] = useState([] as Array<ReactElement>);

    DesktopFunctions.openApp = (initProps, makeComponent) => {
        setWindows([...windows, <Window initProps={initProps} key={nextId} id={nextId} >{makeComponent()}</Window>]);
        setNextId(nextId + 1)
    }

    DesktopFunctions.closeApp = (id: number) => {
        setWindows(windows.filter(x => x.props.id !== id));
    }

    return (
        <div className='windowsContainer' ref={(node) => { if (node && size === undefined) setSize({ w: node.offsetHeight, h: node.offsetHeight }) }}>
            {children}
            {windows}
            <div className='windowsTaskbar'></div>
        </div>
    )
}

export default Desktop;
