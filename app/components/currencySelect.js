import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { fetchFlags } from '../lib/fetch-flags'; // Fetch fonksiyonunu import ediyoruz
import Image from 'next/image';

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
        cursor: 'pointer',
        backgroundColor: props.isFocused ? '#f0f0f0' : 'white',
        borderRadius: '8px',
        height: '50px',
        fontSize: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Image
        src={data.flagURL}
        alt={`${data.label} flag`}
        width={24}
        height={24}
        style={{ marginRight: '10px', borderRadius: '50%' }}
      />
      {data.label}
    </div>
  );
};

const customSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
        <Image
          src={props.data.flagURL}
          alt={`${props.data.label} flag`}
          width={24}
          height={24}
          style={{ marginRight: '10px', borderRadius: '50%' }}
        />
        <span style={{ lineHeight: '50px', verticalAlign: 'middle' }}>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    boxSizing: 'border-box',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const CurrencySelect = ({ countries, turnSelecetedCountry }) => {
  const [options, setOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ value: '$', label: "USD", flagURL: "https://wise.com/web-art/assets/flags/usd.svg" })
  
  useEffect(() => {
    const loadFlags = async () => {
      const fetchedFlags = await fetchFlags(countries);
      setOptions(fetchedFlags); 
    };

    loadFlags();
  }, [countries]);

  return (
    <Select
      className="w-full"
      options={options}
      value={selectedCountry}
      onChange={(selectedOption) => {turnSelecetedCountry(selectedOption); setSelectedCountry(selectedOption)}}
      isSearchable
      placeholder="Select an option"
      components={{ Option: customOption, SingleValue: customSingleValue }}
      styles={customStyles}
    />
  );
};

export default CurrencySelect;
