import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    const url = 'http://localhost:3000/searchData'; // Replace with your actual API endpoint
    const headers = { 'Content-Type': 'application/json' };

    // Send GET request
    const res = http.get(url, { headers });

    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);

    sleep(1); // Adjust sleep time as needed between requests
}
