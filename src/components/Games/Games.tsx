import Desktop from 'components/Windows/Desktop';
import DesktopIcon from 'components/Windows/DesktopIcon';
import HueClue from 'components/HueClue/HueClue';

function Games() {

    return (
        <Desktop>
            {/* <DesktopIcon imgSrc='https://wolforcept.github.io/images/icon128.png' x={1} y={1}
                initProps={{ title: 'Hue Clue', w: 1200, h: 800 }} makeComponent={() => <HueClue />} /> */}
            <DesktopIcon imgSrc='https://wolforcept.github.io/images/icon128.png' x={1} y={1}
                initProps={{ title: 'Hue Clue', w: undefined, h: undefined }} makeComponent={() => <HueClue />} />
        </Desktop>
    )
}

export default Games;
