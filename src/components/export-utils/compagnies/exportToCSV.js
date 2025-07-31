export const exportToCSV = (data, title = 'export') => {
  const csvRows = [
    ['Nom', 'Email', 'Téléphone', 'Ville', 'Personne de contact', 'Commission (%)', 'Début contrat', 'Fin contrat'],
    ...data.map((item) => [
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

  const csvContent = csvRows.map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${title}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
