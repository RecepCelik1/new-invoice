"use client";
import { useState } from "react";
import Select from "react-select";
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
        currency: { value: '$', label: "USD" },
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

      const options = [
          { value: '$', label: "USD" },
          { value: '£', label: "GBP" },
          { value: '€', label: "EURO" },
      ];
      
    const customStyles = { //=> for dropdown menu customize
        option: (provided, state) => ({
          ...provided, 
          color: state.isSelected ? 'white' : 'black',
          background: state.isSelected ? '#0285c7' : state.isFocused ? '#38bdf8' : 'white',
          fontSize : '12px',
        }),
        control: (provided) => ({
            ...provided,
            width: '100%',
            minHeight: "32.5px",
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "16px",
          }),
          
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '8px',
            overflowY: 'auto',
            
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            fontSize: '12px', 
            backgroundColor: state.isFocused ? '#e6f7ff' : 'white', // 
            borderRadius: '8px',
            
        }),
          dropdownIndicator: (provided, state) => ({
            alignItems: 'items-center',
            justifyContent: 'center',
            marginRight : "5px",
            marginTop : "1px"
          }),
      };

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
                      invoiceContent={invoiceContent}
                      setInvoiceContent={setInvoiceContent}
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
