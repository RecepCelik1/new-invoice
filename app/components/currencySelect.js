import React from 'react';
import Select from 'react-select';
import Flag from 'react-country-flag';

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <Flag
        countryCode={data.flagCode} // Bayrak kodunu kullanıyoruz
        style={{ width: '24px', height: '16px', marginRight: '10px'}}
      />
      {data.label}
    </div>
  );
};

const options = [
  { value: '$', label: "USD", flagCode: 'US' },
  { value: '£', label: "GBP", flagCode: 'GB' },
  { value: '€', label: "EURO", flagCode: 'EU' },
];

/* const customStyles = { //=> for dropdown menu customize
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
  }; */

const CurrencySelect = ({ invoiceContent, setInvoiceContent }) => (
  <Select
    className="w-full"
    options={options}
    value={invoiceContent.currency}
    onChange={(selectedOption) => setInvoiceContent({...invoiceContent, currency: selectedOption})}
    isSearchable
    placeholder="Select an option"
    components={{ Option: customOption }}
  />
);

export default CurrencySelect;
