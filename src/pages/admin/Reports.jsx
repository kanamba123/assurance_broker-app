const Reports = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rapports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select className="select select-bordered">
          <option>Sélectionner un type de rapport</option>
          {/* Options */}
        </select>
        <input type="date" className="input input-bordered" />
        <button className="btn btn-primary">Générer</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Résultats du rapport */}
      </div>
    </div>
  );
};

export default Reports;