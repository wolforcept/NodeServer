import React from 'react';
import './style.css';

function AppLink({ title, href, image }: { title: string, href: string, image: string }) {

    return (
        <a href={href}>
            <div className="AppLink" style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain"
            }}>
                <h4>{title}</h4>
            </div>
        </a>
    );
}

export default AppLink;
