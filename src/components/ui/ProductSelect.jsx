import React, { useState, useMemo, useRef, useEffect } from 'react';
import Select from 'react-select';
import { components } from 'react-select';

// Custom option component to include checkbox
const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null} // Prevent checkbox from being clickable directly
                className="me-2"
            />
            <label>{props.label}</label>
        </components.Option>
    );
};

const ProductSelect = ({ products, selectedProducts, setSelectedProducts }) => {
    const containerRef = useRef(null);

    // Memoize options to prevent unnecessary re-renders
    const options = useMemo(() => products.map(product => ({
        value: product._id,
        label: `${product.productName} - $${product.price.toFixed(2)}`
    })), [products]);

    const handleChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectedProducts(prevSelected => {
            const newSelected = {};
            selectedIds.forEach(id => {
                newSelected[id] = { quantity: 1 };
            });
            return newSelected;
        });
    };

    // Calculate the maximum label length to set width
    const calculateWidth = () => {
        const tempElement = document.createElement('div');
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.style.whiteSpace = 'nowrap';
        tempElement.style.fontSize = '16px'; // Match Select's font size
        document.body.appendChild(tempElement);

        const maxWidth = options.reduce((maxWidth, option) => {
            tempElement.textContent = option.label;
            return Math.max(maxWidth, tempElement.clientWidth);
        }, 0);

        document.body.removeChild(tempElement);

        return maxWidth + 50; // Add padding
    };

    const [selectWidth, setSelectWidth] = useState(calculateWidth());

    useEffect(() => {
        setSelectWidth(calculateWidth());
    }, [options]);

    const containerStyle = {
        width: `${selectWidth}px`,
        maxWidth: '100%' // Prevent it from exceeding container width
    };

    return (
        <div ref={containerRef} style={containerStyle}>
            <Select
                isMulti
                options={options}
                value={options.filter(option => selectedProducts[option.value])}
                onChange={handleChange}
                components={{ Option: CustomOption }}
                placeholder="Select Products"
                closeMenuOnSelect={false}
            />
        </div>
    );
};

export default ProductSelect;
