const { Client } = require('@elastic/elasticsearch');

// Elasticsearch client instance
const client = new Client({ node: 'http://localhost:9200' }); // Adjust URL/port as per your Elasticsearch configuration

// Data to be inserted
const data = {
    "Afterload": 156,
    "Aortic-Pressure": 97,
    "Atrial-Pressure": 53,
    "Brain-Natriuretic-Peptide": 79,
    "Cardiac-Index": 62,
    "Central-Venous-Pressure": 62,
    "Creatine-Kinase-MB": 90,
    "Ejection-Fraction": 67,
    "Electrocardiogram": 61,
    "Heart-Rhythm": 80,
    "Heart-Sounds": 58,
    "Mean-Arterial-Pressure": 53,
    "Myoglobin": 94,
    "P-wave": 69,
    "PR-interval": 73,
    "Preload": 74,
    "Pulmonary-Artery-Pressure": 71,
    "Pulmonary-Vascular-Resistance": 96,
    "Pulse-Oximetry": 100,
    "QRS-complex": 89,
    "QT-interval": 85,
    "ST-segment": 69,
    "Systemic-Vascular-Resistance": 80,
    "T-wave": 65,
    "Troponin-Levels": 53,
    "Ventricular-Pressure": 50,
    "amplitude": 74,
    "heart-rate": 32,
    "interval": 51,
    "rhythm": 43
};

async function insertData() {
    try {
        const response = await client.index({
            index: 'your_index', // Replace with your index name
            body: data
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

insertData();
