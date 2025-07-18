import React, { useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';

// Composant personnalisé pour l'option du menu déroulant
const CustomOption = (props) => (
    <components.Option {...props}>
        <label>{props.data.label}</label>
    </components.Option>
);

const CustomerSelect = ({ customers = [], selectedClient, setSelectedClient }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Convertir la liste des clients en options pour le Select
    const options = customers.map(customer => ({
        value: customer._id,
        label: customer.firstName
    }));

    // Gérer le changement de sélection
    const handleChange = (option) => {
        setSelectedOption(option);
        if (option) {
            setSelectedClient(option.value); // Mettre à jour le client sélectionné dans le parent
        }
    };

    // Styles personnalisés pour le composant Select
    const selectStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '8px', // Bordure arrondie
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Ombre légère
            border: '1px solid #ced4da', // Bordure gris clair
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
        <div style={{ width: '300px', maxWidth: '100%', padding: '10px 0' }}>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                components={{ Option: CustomOption }}
                placeholder="Sélectionner un client"
                styles={selectStyles}
                menuPlacement="bottom" // Assure que le menu s'ouvre sous le champ de sélection
            />
        </div>
    );
};

export default CustomerSelect;
