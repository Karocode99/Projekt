import React, {Component} from 'react';
import {Table, Input, List} from 'semantic-ui-react'

import './CreateOrderPosition.css';


class CreateOrderPosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: props.amount ? props.amount : 0,
        };
    }

    onAmountChange(ev, position) {
        var amount = parseInt(ev.currentTarget.value);
        this.setState({amount: amount});
        this.props.onAmountChange(amount, position);
    }

    render() {
        return <Table.Row
            negative={this.props.error}
            className="createOrderPosition"
            key={this.props.position.productId}>
            <Table.Cell>{this.props.position.name}</Table.Cell>
            <Table.Cell>{this.props.position.bloz}</Table.Cell>
            <Table.Cell>{this.props.position.comments}</Table.Cell>
            <Table.Cell>{this.props.position.capacity}</Table.Cell>
            <Table.Cell>
                <List size="mini">
                    {this.props.position.discount.map(function (discount, key) {
                        return (
                            <List.Item
                                className={this.props.activeDiscount == discount.minAmount ? "createOrderPositionDisAct" : ""}>
                                {"rabat:" + discount.percent + "% cena:" + discount.price + (discount.minAmount > 0 ? (" min. ilość: " + discount.minAmount) : "")}
                            </List.Item>
                        )
                    }, this)}
                </List>
            </Table.Cell>
            <Table.Cell>
                <Input
                    className="createOrderPositionInput"
                    type="number"
                    value={this.state.amount}
                    min="0"
                    step="1"
                    onChange={(ev) => this.onAmountChange(ev, this.props.position)}
                    width={1}
                />
            </Table.Cell>
            <Table.Cell>{this.props.price}</Table.Cell>
        </Table.Row>
    }

}

export default CreateOrderPosition;