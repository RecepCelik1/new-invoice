"use client";

import { useState } from "react";
import GeneratePdf from "../(create-pdf)/generatePdf";

const Total = ({ info, items }) => {
    const [paymentDetails, setPaymentDetails] = useState({
        notes: '',
        bankAccountDetails: '',
        tax: 0,
        discount: 0,
        shippingFee: 0,
    });

    const subTotal = items.subTotal;

    const handleInputChange = (value, field) => {
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value
        }));
    };
    
    const total = subTotal + (paymentDetails.tax*subTotal)/100 - paymentDetails.discount + paymentDetails.shippingFee;

    const formatNumberWithCommas = (number) => {
        number = parseFloat(number);
        isNaN(number) ? number = 0 : number = number + 0;
        number = number.toFixed(2);
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="mt-8 space-y-4">
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Notes / Payment Terms"
                value={paymentDetails.notes}
                onChange={(e) => handleInputChange(e.target.value, 'notes')}
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Bank Account Details"
                value={paymentDetails.bankAccountDetails}
                onChange={(e) => handleInputChange(e.target.value, 'bankAccountDetails')}
            />
            <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tax %"
                onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0, 'tax')}
            />
            <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Discount ($)"
                onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0, 'discount')}
            />
            <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Shipping Fee"
                onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0, 'shippingFee')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                <div className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <label className="block text-gray-700">Total:</label>
                    <span className="font-bold">{info.currency.value} {formatNumberWithCommas(total)}</span>
                </div>
            </div>

            <GeneratePdf info={info} items={items} total={{paymentDetails, total}}/>
        </div>
    );
};

export default Total;
