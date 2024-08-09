"use client"

import React, { useState } from 'react';
import Total from '../(total)/total';

const InvoiceItems = ({info}) => {
    const [items, setItems] = useState([{ description: '', cost: 0, quantity: 0, amount: 0 }]);

    const addItem = () => {
        setItems([...items, { description: '', cost: 0, quantity: 0, amount: 0 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const moveItemUp = (index) => {
        if (index === 0) return;
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        setItems(newItems);
    };

    const handleInputChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        if (field === 'cost' || field === 'quantity') {
            const cost = parseFloat(newItems[index].cost) || 0;
            const quantity = parseFloat(newItems[index].quantity) || 0;
            newItems[index].amount = cost * quantity;
        }
        setItems(newItems);
    };
    const subTotal = items.reduce((acc, item) => acc + parseFloat(item.amount) || 0, 0);

    const formatNumberWithCommas = (number) => {
        number = parseFloat(number);
        isNaN(number) ? number = 0 : number = number + 0;
        number = number.toFixed(2);
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="mt-8 space-y-4">
            {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Item Description"
                        value={item.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Unit Cost"
                        value={item.cost}
                        onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                    />
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                        placeholder="Amount"
                        value={item.amount}
                        readOnly
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={() => moveItemUp(index)}
                            className="text-blue-500 hover:text-blue-700 transition duration-300"
                        >
                            ↑
                        </button>
                        <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 transition duration-300"
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
            <button
                onClick={addItem}
                className="bg-sky-600 text-white p-2 rounded-lg shadow-md hover:bg-sky-700 transition duration-300"
            >
                + Add Item
            </button>
            <div className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <label className="block text-gray-700">Subtotal: </label>
                    <span className="font-bold">{info.invoiceContent.currency.value}{formatNumberWithCommas(subTotal)}</span>
            </div>
            <Total info={info} items={{items, subTotal}}/>
        </div>
    );
};

export default InvoiceItems;
