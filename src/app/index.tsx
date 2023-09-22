import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ColorModeScript, theme } from '@chakra-ui/react';

function render() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </>);
}

render();