window.addEventListener('DOMContentLoaded', (event) => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsUu6CqmZQGDfh6HYjV5NQAiadQocaCVVufwXXTux1_nuw3y5UrhHai5wLoGEt-HHMwJtbIsrpy3yL/pub?gid=0&single=true&output=csv'; // Replace this with your CSV file link
    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const csvData = parseCSV(csvText);
            displayTable(csvData);
        })
        .catch(error => console.error('Error fetching or parsing CSV:', error));
});

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

function displayTable(data) {
    const container = document.getElementById('table-container');
    let table = '<table><thead><tr>';
    // Create headers
    for (const header in data[0]) {
        table += `<th>${header}</th>`;
    }
    table += '</tr></thead><tbody>';
    // Create rows
    data.forEach(row => {
        table += '<tr>';
        for (const cell in row) {
            table += `<td>${row[cell]}</td>`;
        }
        table += '</tr>';
    });
    table += '</tbody></table>';
    container.innerHTML = table;
}
