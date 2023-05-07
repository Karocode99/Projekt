import CreateOrder from "./CreateOrder";

class PriceCalculator {

    calculate(position, amount) {
        if (amount == 0) {
            return {
                price: 0,
                threshold: null
            };
        }

        var tresholdLength = position.discount.length;
        var minDiscount = null;
        for (var i = 0; i < tresholdLength; i++) {
            if (amount >= position.discount[i].minAmount
                && (null == minDiscount || minDiscount.minAmount < position.discount[i].minAmount)) {
                minDiscount = position.discount[i];
            }
        }

        if (null == minDiscount) {
            throw new Error("Not found discount for amount " + amount);
        }

        let resAmount = amount * minDiscount.price

        return {
            price: Math.round(resAmount * 100) / 100,
            threshold: minDiscount
        }
    }

}


export default PriceCalculator;
