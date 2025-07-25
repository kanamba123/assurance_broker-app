import React from 'react';

const companies = [
    {
        name: "Relic Insurance Company",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/relic.jpeg",
    },
    {
        name: "Jubilee Insurance",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/jubilee.png",
    },
    {
        name: "Agico Assurance",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/agico.jpg",
    },
    {
        name: "Agence de Régulation et de Contrôle des Assurances",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/arca.png",
    },
    {
        name: "Association des Assureurs du Burundi",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/assur.png",
    },
    {
        name: "AVIA Assurances",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/avia.jpeg",
    },
    {
        name: "BIC Assurance Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/bic_vie.jpeg",
    },
    {
        name: "BICOR Assurance Non Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/bic.jpg",
    }, {
        name: "BIC Assurance Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/bicor_vie.jpeg",
    },
    {
        name: "BICOR Assurances Générales",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/bicor.jpg",
    },
    {
        name: "EGIC Assurance Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/egic_vie.jpeg",
    },
    {
        name: "BIC Assurance Non Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/egic_nv.jpeg",
    },
    {
        name: "SOCAR Assurance Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/socar_vie.jpeg",
    },
    {
        name: "SOCAR Assurance Générales",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/socar_g.jpg",
    },
    {
        name: "UCAR Assurance Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/ucar_vie.jpeg",
    },
    {
        name: "UCAR Assurance Non Vie",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/ucar.jpg",
    },
    {
        name: "INKINZO Assurance",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/inkinzo.jpeg",
    },
    {
        name: "Royal Insurance Company",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/ric.jpg",
    },
    {
        name: "Mutuelle de la Fonction Publique",
        iconUri: "https://bestassurbrokers.com/assets/img/back/assureurs/mfp.jpg",
    },
];

export default function InsuranceGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {companies.map((company, index) => (
                <a
                    key={index}
                    href="#"
                    className="flex items-center bg-white rounded-md p-4 shadow hover:shadow-md transition"
                >
                    <img
                        src={company.iconUri}
                        alt={`${company.name} Icon`}
                        className="w-12 h-12 mr-4 mx-6"
                    />
                    <span className="text-gray-800  font-medium">{company.name}</span>
                </a>
            ))}
        </div>
    );
}
