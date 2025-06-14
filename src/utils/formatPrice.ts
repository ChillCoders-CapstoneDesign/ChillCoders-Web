export const formatPrice = (price: string, unit: string) => {
    const numeric = parseInt(price.replace(/[^0-9]/g, ''), 10).toLocaleString();

    switch (unit) {
        case '원':
            return `${numeric} 원`;
        case '$':
            return `$${numeric} USD`;
        case '€':
            return `€${numeric} EUR`;
        case '¥':
            return `¥${numeric} JPY`;
        default:
            return `${numeric} ${unit}`;
    }
};