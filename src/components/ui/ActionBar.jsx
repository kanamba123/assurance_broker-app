import React from 'react';
import { exportToExcel } from '../export-utils/compagnies/exportToExcel';
import { exportToCSV } from '../export-utils/compagnies/exportToCSV';
import { exportToPDF } from '../export-utils/compagnies/exportToPDF';
import { printData } from '../export-utils/compagnies/printData';

const ActionBar = ({ data = [], searchQuery, onSearchChange, title = 'Rapport' }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div className="flex flex-wrap gap-2">
        <button className="border border-gray-500 px-3 py-2 bg-gray-100 text-sm hover:border-black" onClick={() => exportToExcel(data,  title)}>Excel</button>
        <button className="border border-gray-500 px-3 py-2 bg-gray-100 text-sm hover:border-black" onClick={() => exportToCSV(data,  title)}>CSV</button>
        <button className="border border-gray-500 px-3 py-2 bg-gray-100 text-sm hover:border-black" onClick={() => exportToPDF(data,  title)}>PDF</button>
        <button className="border border-gray-500 px-3 py-2 bg-gray-100 text-sm hover:border-black" onClick={() => printData(data,  title)}>Imprimer</button>
      </div>

      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <label htmlFor="search" className="font-semibold text-sm">Rechercher :</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-2 py-2 rounded text-sm"
        />
      </div>
    </div>
  );
};

export default ActionBar;
