import React, { Component } from 'react';
// import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="callout text-center" id="Header">
                <h1 id="title">{this.props.name}</h1>
            </div>
        );
    }
}

export default Header;