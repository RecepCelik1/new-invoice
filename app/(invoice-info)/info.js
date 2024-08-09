"use client";
import { useState } from "react";
import CustomDatePicker from "../components/DatePicker";
import ImageUpload from "../components/image-upload";
import InvoiceItems from "../(items)/invoice-items";
import CurrencySelect from "../components/currencySelect";

const InvoiceInfo = () => {

    const [invoiceContent, setInvoiceContent] = useState({
        invoiceNumber: '',
        purchaseOrder: '',
        logoUrl: '',
        companyDetails: '',
        billTo: '',
        currency: { value: '$', label: "USD", flagURL: "https://wise.com/web-art/assets/flags/usd.svg" },
        invoiceDate: new Date(),
        dueDate: new Date(),
    });

    const [dimensions, setDimensions] = useState({with : 150, height: 150});
    
    const handleDimensionCalculate = (dimensionValues) => {
      setDimensions(dimensionValues);
    } 

    const handleFileUploaded = (url) => {
      setInvoiceContent({...invoiceContent, logoUrl: url});
    };
    
    const handleCountrySelect = (selectedCountry) => {
      setInvoiceContent({...invoiceContent, currency: selectedCountry});
    }

    const handleDateChange = (value, field) => {
      if (field === 'invoiceDate') {
        if (value > invoiceContent.dueDate) {
          setInvoiceContent({ ...invoiceContent, invoiceDate: value, dueDate: value });
          } else {
            setInvoiceContent({ ...invoiceContent, invoiceDate: value });
          }
        } else if (field === 'dueDate') {
          if (value >= invoiceContent.invoiceDate) {
            setInvoiceContent({ ...invoiceContent, dueDate: value });
          } else {
            alert('Due date cannot be earlier than the invoice date');
          }
        }
      };

      const countries = [
        { value: '$', label: "USD", flagURL: 'https://wise.com/web-art/assets/flags/usd.svg' },
        { value: '£', label: "GBP", flagURL: 'https://wise.com/web-art/assets/flags/gbp.svg' },
        { value: '€', label: "EURO", flagURL: 'https://wise.com/web-art/assets/flags/eur.svg' },
      ];
      
    return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl space-y-8 text-black ">
        <div className="space-y-8">
            {/* Üst Bölüm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Invoice Number</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={invoiceContent.invoiceNumber}
                        onChange={(e) => setInvoiceContent({ ...invoiceContent, invoiceNumber: e.target.value })}
                    />

                    <label className="block text-gray-700 mt-4 mb-2 font-semibold">Purchase Order</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={invoiceContent.purchaseOrder}
                        onChange={(e) => setInvoiceContent({ ...invoiceContent, purchaseOrder: e.target.value })}
                    />
                </div>

                    <div>
                      <ImageUpload 
                        header={"Logo"} 
                        message="Click to select a file or drag and drop it here" 
                        format="(JPG, JPEG, PNG, less than 5MB)"
                        onFileUploaded={handleFileUploaded}    
                        onCalculateDimension={handleDimensionCalculate}
                    />
                </div>
            </div>

            {/* İkinci Bölüm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your company details"
                    value={invoiceContent.companyDetails}
                    onChange={(e) => setInvoiceContent({ ...invoiceContent, companyDetails: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Bill to"
                    value={invoiceContent.billTo}
                    onChange={(e) => setInvoiceContent({ ...invoiceContent, billTo: e.target.value })}
                />
            </div>

            {/* Üçüncü Bölüm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CurrencySelect
                    countries={countries}
                    turnSelecetedCountry={handleCountrySelect}
                />                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomDatePicker
                    selectedDate={invoiceContent.invoiceDate}
                    onDateChange={(date) => handleDateChange(date, 'invoiceDate')}
                />
                <CustomDatePicker
                    selectedDate={invoiceContent.dueDate}
                    onDateChange={(date) => handleDateChange(date, 'dueDate')}
                />

                </div>
            </div>
        </div>
        <InvoiceItems info={{invoiceContent, dimensions}}/>
    </div>

    );
}

export default InvoiceInfo;
