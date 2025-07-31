import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';

export const exportToExcel = (data, title = 'export') => {
  const sheetData = [
    ['Nom', 'Email', 'Téléphone', 'Ville', 'Personne de contact', 'Commission (%)', 'Début contrat', 'Fin contrat'],
    ...data.map(item => [
      item.name,
      item.email,
      item.phone,
      item.city,
      item.contact_person,
      item.commission_rate,
      item.contract_start_date,
      item.contract_end_date
    ])
  ];

  const worksheet = XLSXUtils.aoa_to_sheet(sheetData);

  // Définir la largeur de colonnes
  worksheet['!cols'] = [
    { wch: 20 }, // Nom
    { wch: 30 }, // Email
    { wch: 15 }, // Téléphone
    { wch: 15 }, // Ville
    { wch: 25 }, // Personne de contact
    { wch: 15 }, // Commission
    { wch: 18 }, // Début contrat
    { wch: 18 }  // Fin contrat
  ];

  // Déclarer la table (pour Excel moderne)
  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, 'Compagnies');

  // Appliquer une table avec filtres (optionnel, mais Excel l’interprète bien)
  worksheet['!autofilter'] = {
    ref: XLSXUtils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: data.length, c: 7 }
    })
  };

  XLSXWriteFile(workbook, `${title}.xlsx`);
};
