import React, { useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';

// Composant personnalisé pour l'option du menu déroulant avec une case à cocher
const CustomOption = (props) => {
    const { data, innerRef, innerProps, isSelected } = props;

    return (
        <components.Option {...props} innerRef={innerRef} innerProps={innerProps}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    style={{ marginRight: 10 }}
                />
                <label>{data.label}</label>
            </div>
        </components.Option>
    );
};

// Composant principal
const SelectPersonalize = ({ 
    items = [], 
    setSelectedClient,
    borderStyle = '1px solid #ced4da', // Valeur par défaut pour la bordure
    placeholder = 'Sélectionner' // Valeur par défaut pour le placeholder
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Convertir la liste des items en options pour le Select
    const options = items.map(item => ({
        value: item.value,
        label: item.label
    }));

    // Gérer le changement de sélection
    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
        setSelectedClient(selected ? selected.map(option => option.value) : []);
    };

    // Styles personnalisés pour le composant Select
    const selectStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '8px', // Bordure arrondie
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Ombre légère
            border: borderStyle, // Utilisation du style de bordure personnalisé
            '&:hover': {
                border: '1px solid #80bdff', // Bordure bleue au survol
                boxShadow: '0 0 0 1px rgba(38, 143, 255, 0.25)', // Ombre au survol
            },
            width: '100%',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            marginTop: 0, // Menu directement sous le contrôle
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6c757d', // Couleur du texte du placeholder
        }),
    };

    return (
        <div >
            <Select
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                components={{ Option: CustomOption }}
                placeholder={placeholder}
                styles={selectStyles}
                menuPlacement="bottom"
            />
        </div>
    );
};

export default SelectPersonalize;
