import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'

import './OfferList.css';


class OfferList extends Component {

    constructor(props) {
        super(props);
    }

    list = [
        {"id": 1, "name": "Turbo oferta", "created": "2023-04-11"},
        {"id": 2, "name": "Turbo oferta 2", "created": "2023-04-11"},
        {"id": 3, "name": "Turbo oferta 3", "created": "2023-04-11"},
    ];

    onRowClick(offer) {
        this.props.history.push("/createorder/" + offer.id);
    }

    render() {
        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nazwa</Table.HeaderCell>
                    <Table.HeaderCell>Data dodania</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {this.list.map(function (offer) {
                return (
                    <Table.Row
                        className="offerRow"
                        key={offer.id}
                        onClick={() => this.onRowClick(offer)}>
                        <Table.Cell>{offer.name}</Table.Cell>
                        <Table.Cell>{offer.created}</Table.Cell>
                    </Table.Row>
                )

            }, this)}
        </Table>
    }

}

export default OfferList;
