import { FC } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Theme from 'Theme';
import Routes from 'Routes';
import 'App.css'
import Games from 'components/Games/Games';
// const router = createBrowserRouter(Routes);

const App: FC = () => {

    return (

        <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={Theme} >
            <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={(colorScheme?: ColorScheme | undefined) => { }}>
                <Games />
                {/* <RouterProvider router={router} /> */}
            </ColorSchemeProvider>
        </MantineProvider>

    );
}

export default App;

