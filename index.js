const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Example port, change as needed

app.use(bodyParser.json());

// Initialize Elasticsearch client
const client = new Client({ node: 'http://13.215.48.128:9200' });

// Endpoint to receive data and insert into Elasticsearch via POST
app.post('/insertData', async (req, res) => {
    try {
        const data = req.body; // Assuming the data from API is sent in the request body
        const response = await client.index({
            index: 'your-index-name', // Replace with your actual index name
            body: data
        });
        await client.indices.refresh({ index: 'your-index-name' }); // Ensure the data is searchable immediately
        console.log('Data inserted into Elasticsearch:', response);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data into Elasticsearch:', error);
        res.status(500).json({ error: 'Error inserting data into Elasticsearch' });
    }
});

// Endpoint to search data in Elasticsearch via GET
app.get('/searchData', async (req, res) => {
    try {
        const response = await client.search({
            index: 'your-index-name', // Replace with your actual index name
            body: {
                query: {
                    match_all: {} // Example query, replace with your actual query
                }
            }
        });

        console.log('Data retrieved from Elasticsearch:', response);
        // Check if the response body has the expected structure
        if (!response.hits) {
            console.error('No hits found in the response:', response);
            return; // Exit the function if there are no hits to prevent further errors
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error searching Elasticsearch:', error);
        res.status(500).json({ error: 'Error searching Elasticsearch' });
    }
});

app.get('/checkData', async (req, res) => {
    try {
        // Perform a match_all query across all indices
        // Perform a count query across all indices
        const body  = await client.count({
            index: '_all', // Count across all indices
            body: {
                query: {
                    match_all: {}
                }
            }
        });

        // Send the count back as a response
        res.json({ count: body.count });
    } catch (error) {
        console.error('Error searching Elasticsearch:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
