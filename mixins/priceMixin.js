export const priceMixin = {
    methods: {
        formatCurrency(value) {
            return `$${parseFloat(value).toFixed(2)}`;
        }
    }
};