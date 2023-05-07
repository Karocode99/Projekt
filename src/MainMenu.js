import React from "react";
import './MainMenu.css';
import {Link} from "react-router-dom";
import {Icon, Menu} from 'semantic-ui-react'


class MainMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            activeItem: "home"
        };
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        return <Menu pointing>
            <Menu.Item
                as={Link}
                name='home'
                active={activeItem === 'home'}
                to="/"
                onClick={this.handleItemClick}
            >
                <Icon name='home'/>
            </Menu.Item>
            <Menu.Item
                // position="right"
                as={Link}
                name='offerList'
                active={activeItem === 'offerList'}
                content="Oferty"
                to="/offerlist"
                onClick={this.handleItemClick}
            />
            <Menu.Item
                // position="right"
                as={Link}
                name='contact'
                active={activeItem === 'contact'}
                content="Kontakt"
                to="/contact"
                onClick={this.handleItemClick}
            />
        </Menu>
    }


}

export default MainMenu;