import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title = 'Rapport') => {
  const doc = new jsPDF();

  doc.text(`Liste des ${title}`, 14, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Nom', 'Email', 'Téléphone', 'Ville', 'Personne de contact', 'Commission (%)', 'Début contrat', 'Fin contrat']],
    body: data.map((item) => [
      item.name,
      item.email,
      item.phone,
      item.city,
      item.contact_person,
      item.commission_rate,
      item.contract_start_date,
      item.contract_end_date
    ]),
  });

  doc.save(`${title}.pdf`);
};
