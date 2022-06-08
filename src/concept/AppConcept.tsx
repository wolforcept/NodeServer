import React from 'react';
import './style.css';
import html from './concept/index.html'

function AppConcept() {

    return (
        <div className="AppConcept" dangerouslySetInnerHTML={html}>
        </div>
    );
}

export default AppConcept;
