import http from 'k6/http';
import { sleep } from 'k6';

let successfulInsertCount = 0;
let failedInsertCount = 0;


export let options = {
    vus: 200,
    duration: '1s',
};
// Function to generate random data
function generateRandomData() {
    return {
        "Afterload": getRandomNumber(50, 150),
        "Aortic-Pressure": getRandomNumber(70, 110),
        "Atrial-Pressure": getRandomNumber(40, 60),
        "Brain-Natriuretic-Peptide": getRandomNumber(60, 90),
        "Cardiac-Index": getRandomNumber(50, 70),
        "Central-Venous-Pressure": getRandomNumber(50, 70),
        "Creatine-Kinase-MB": getRandomNumber(80, 100),
        "Ejection-Fraction": getRandomNumber(60, 70),
        "Electrocardiogram": getRandomNumber(50, 70),
        "Heart-Rhythm": getRandomNumber(70, 90),
        "Heart-Sounds": getRandomNumber(50, 70),
        "Mean-Arterial-Pressure": getRandomNumber(40, 60),
        "Myoglobin": getRandomNumber(80, 100),
        "P-wave": getRandomNumber(60, 80),
        "PR-interval": getRandomNumber(65, 75),
        "Preload": getRandomNumber(70, 80),
        "Pulmonary-Artery-Pressure": getRandomNumber(60, 80),
        "Pulmonary-Vascular-Resistance": getRandomNumber(90, 100),
        "Pulse-Oximetry": getRandomNumber(95, 100),
        "QRS-complex": getRandomNumber(85, 95),
        "QT-interval": getRandomNumber(80, 90),
        "ST-segment": getRandomNumber(60, 80),
        "Systemic-Vascular-Resistance": getRandomNumber(70, 90),
        "T-wave": getRandomNumber(60, 70),
        "Troponin-Levels": getRandomNumber(50, 60),
        "Ventricular-Pressure": getRandomNumber(40, 60),
        "amplitude": getRandomNumber(70, 80),
        "heart-rate": getRandomNumber(30, 40),
        "interval": getRandomNumber(50, 60),
        "rhythm": getRandomNumber(40, 50)
    };
}

// Function to generate random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function () {
    const url = 'http://localhost:3000/insertData'; // Replace with your actual server URL
    const headers = { 'Content-Type': 'application/json' };
    const data = generateRandomData();

    // Send POST request to insert data
    const res = http.post(url, JSON.stringify(data), { headers });

    // Check if insertion was successful or failed
    if (res.status === 200) {
        successfulInsertCount++;
    } else {
        failedInsertCount++;
    }

    // Adjust sleep time as needed between requests
    // For high load testing, you might want to remove sleep entirely or use a very short sleep duration
    sleep(0.1); // Sleep for 100 milliseconds between each request
}

// Print percentage of successful and failed insertions after the test finishes
export function handleSummary(data) {
    console.log(`Successful insertions: ${successfulInsertCount}`);
    console.log(`Failed insertions: ${failedInsertCount}`);
    
    const totalInsertions = successfulInsertCount + failedInsertCount;
    if (totalInsertions > 0) {
        const successPercent = (successfulInsertCount / totalInsertions) * 100;
        const failPercent = (failedInsertCount / totalInsertions) * 100;

        console.log(`Success percentage: ${successPercent.toFixed(2)}%`);
        console.log(`Fail percentage: ${failPercent.toFixed(2)}%`);
    } else {
        console.log("No insertions were attempted during the test.");
    }
}