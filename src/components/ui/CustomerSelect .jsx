import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const CustomerSelect = ({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "Sélectionner...",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div 
      ref={selectRef}
      className={`relative ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-2 border rounded-md ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between p-2 hover:bg-gray-100 ${value === option.value ? 'bg-blue-50 font-medium' : ''}`}
                >
                  <span className={value === option.value ? 'text-blue-600' : ''}>
                    {option.label}
                  </span>
                  {value === option.value && <FiCheck className="text-blue-500" />}
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">Aucun résultat trouvé</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSelect;