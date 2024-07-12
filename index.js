const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' }); // Adjust URL if needed

// Example data to insert
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

// Function to insert data into Elasticsearch
async function insertData(indexName, data) {
    try {
        const { body } = await client.index({
            index: indexName,
            body: data
        });
        console.log('Data inserted into Elasticsearch:', body);
    } catch (error) {
        console.error('Error inserting data into Elasticsearch:', error);
    }
}

// Function to search data in Elasticsearch
async function searchData(indexName) {
    try {
        const { body } = await client.search({
            index: indexName,
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        console.log('Retrieved data from Elasticsearch:', body.hits.hits); // Ensure hits array is accessible
    } catch (error) {
        console.error('Error searching Elasticsearch:', error);
    }
}

// Replace 'your_index' with your Elasticsearch index name
const indexName = 'your_index';

// Insert data into Elasticsearch
insertData(indexName, data)
    .then(() => {
        // Search and retrieve data from Elasticsearch
        searchData(indexName);
    })
    .catch(error => {
        console.error('Error inserting or searching data in Elasticsearch:', error);
    });
