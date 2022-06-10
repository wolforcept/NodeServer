import React from 'react';
import AppLink from './AppLink';
import './style.css';
import imageConcept from './images/concept.svg'

function AppIndex() {

    return (
        <div className="AppIndex">
            <header className="App-header">
                <h1>Wolforce Projects</h1>
            </header>
            <div className=''>
                <AppLink title="Concept" href="concept" image={imageConcept} />
            </div>
        </div>
    );
}

export default AppIndex;
