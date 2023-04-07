import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

/**
 * A default functional component provided by React to initialize the render process
 * @returns {JSX.Element} A JSX element that represents the rendered component
 */
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;
