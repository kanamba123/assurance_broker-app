export const printData = (data, title = 'Rapport') => {
  const newWin = window.open('', '_blank');
  const html = `
    <html>
      <head><title>${title}</title></head>
      <body>
        <h3>${title}</h3>
        <table border="1" cellspacing="0" cellpadding="8">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Personne de contact</th>
              <th>Commission (%)</th>
              <th>Début contrat</th>
              <th>Fin contrat</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.city}</td>
                <td>${item.contact_person}</td>
                <td>${item.commission_rate}</td>
                <td>${item.contract_start_date}</td>
                <td>${item.contract_end_date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
  newWin.document.write(html);
  newWin.document.close();
  newWin.print();
};
