import React from 'react';

const FormatTotal = ({ amount, locale = 'vi-VN', currency = 'VND' }:any) => {
    const formattedAmount = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);

    return <span>{formattedAmount}</span>;
};

export default FormatTotal;