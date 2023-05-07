import React, {Component} from 'react';
import {Table, Input} from 'semantic-ui-react'
import './CreateOrder.css';
import CreateOrderPosition from "./CreateOrderPosition";
import PriceCalculator from "./PriceCalculator";


class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.offerId = this.props.match.params.id;
        this.priceCalculator = new PriceCalculator();
        this.state = {
            offer: [
                {
                    "productId": 1,
                    "name": "2KC",
                    "comments": "tabletki zmniejszające uczucie kaca",
                    "bloz": "666",
                    "capacity": "2x20mg",
                    "discount": [{"percent": 30, "minAmount": 0, "price": 12.5}],
                    "orderedAmount": 0,
                    "calculatedPrice": 0
                },
                {
                    "productId": 2,
                    "name": "Ibuprofen",
                    "comments": "tabletki przeciwbólowe",
                    "bloz": "666111",
                    "capacity": "1000g",
                    "discount": [{"percent": 15, "minAmount": 6, "price": 18.23}],
                    "orderedAmount": 0,
                    "calculatedPrice": 0
                },
                {
                    "productId": 3,
                    "name": "SuperLek",
                    "comments": "lek na zło",
                    "bloz": "664411",
                    "capacity": "10g",
                    "discount": [
                        {"percent": 10, "minAmount": 5, "price": 10},
                        {"percent": 20, "minAmount": 10, "price": 5},
                        {"percent": 30, "minAmount": 15, "price": 1},
                    ],
                    "orderedAmount": 0,
                    "calculatedPrice": 0
                }
            ],
            amounts: {},
            prices: {},
            errors: {},
            totalAmount: 0,
            totalPrice: 0,
            activeDiscount: {}
        };
    }

    onPositionAmountChange(amount, position, key) {
        let p = this.state.prices,
            e = this.state.errors,
            a = this.state.amounts,
            ad = this.state.activeDiscount,
            calculate = null,
            totAmo = 0,
            totPri = 0;

        try {
            calculate = this.priceCalculator.calculate(position, amount);
            ad[key] = calculate.threshold.minAmount;
            p[key] = calculate.price;
            e[key] = null;
            a[key] = amount;
        } catch (ex) {
            console.warn(ex.message);
            p[key] = null;
            a[key] = null;
            ad[key] = null;
            e[key] = true;
        }

        Object.keys(p).map((e) => totPri += p[e]);
        Object.keys(a).map((e) => totAmo += a[e]);

        console.info(ad);

        this.setState({
            prices: p,
            errors: e,
            amounts: a,
            totalAmount: totAmo,
            totalPrice: totPri,
            activeDiscount: ad
        });
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nazwa</Table.HeaderCell>
                        <Table.HeaderCell>Ilość w magazynie</Table.HeaderCell>
                        <Table.HeaderCell>Uwagi</Table.HeaderCell>
                        <Table.HeaderCell>Pojemność</Table.HeaderCell>
                        <Table.HeaderCell>Rabat</Table.HeaderCell>

                        <Table.HeaderCell width={1}>Zamawiana Ilość</Table.HeaderCell>
                        <Table.HeaderCell>Wartość</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.state.offer.map(function (offerPosition, key) {
                    return (
                        <CreateOrderPosition
                            position={offerPosition}
                            onAmountChange={(amount, position) => this.onPositionAmountChange(amount, position, key)}
                            price={this.state.prices[key]}
                            error={this.state.errors[key]}
                            activeDiscount={this.state.activeDiscount[key]}
                        />
                    )

                }, this)}
                <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell><b>Suma:</b></Table.Cell>
                    <Table.Cell><b>{this.state.totalAmount}</b></Table.Cell>
                    <Table.Cell><b>{this.state.totalPrice}</b></Table.Cell>
                </Table.Row>

            </Table>
        );

    }
}

export default CreateOrder;
