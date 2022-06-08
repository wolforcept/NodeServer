import React from 'react';
import './style.css';

function AppLink({ title, href }: { title: string, href: string }) {

    return (
        <a href={href}>
            <div className="AppLink">
                <h4>{title}</h4>
            </div>
        </a>
    );
}

export default AppLink;
