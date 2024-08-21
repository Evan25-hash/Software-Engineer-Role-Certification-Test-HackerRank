//REST API: Products in Range

'use strict';

const fs = require('fs');
const https = require('https');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});
process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});
function readLine() {
    return inputString[currentLine++];
}

async function fetchPage(category, pageNumber) {
    const url = `https://jsonmock.hackerrank.com/api/inventory?category=${category}&page=${pageNumber}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

async function countProductsInRange(category, minPrice, maxPrice) {
    let totalCount = 0;
    let currentPage = 1;
    while (true) {
        const response = await fetchPage(category, currentPage);
        const totalPages = response.total_pages;
        const data = response.data;
        for (const item of data) {
            const itemCategory = item.category;
            const itemPrice = item.price;
            if (itemCategory === category && itemPrice >= minPrice && itemPrice <= maxPrice) {
                totalCount += 1;
            }
        }
        if (currentPage === totalPages) {
            break;
        }
        currentPage += 1;
    }
    return totalCount;
}
async function main() 
{
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const category = readLine().trim();
    const minPrice = parseInt(readLine().trim());
    const maxPrice = parseInt(readLine().trim());
    const result = await countProductsInRange(category, minPrice, maxPrice);
    ws.write(result.toString());
    ws.end();
}
