const fs = require('fs');

// Read JSON files
const emailNames = fs.readFileSync('email_names.json');
const emailNumbers = fs.readFileSync('email_numbers.json');

// Parse JSON data
const parsedEmailNames = JSON.parse(emailNames);
const parsedEmailNumbers = JSON.parse(emailNumbers);

// Remove duplicates from first JSON file
const uniqueEmails1 = new Set(parsedEmailNames.map(obj => obj.email));
const uniqueEmailNames = Array.from(uniqueEmails1, email => parsedEmailNames.find(obj => obj.email === email));

// Remove duplicates from second JSON file
const uniqueEmails2 = new Set(parsedEmailNumbers.map(obj => obj.email));
const uniqueEmailNumbers = Array.from(uniqueEmails2, email => parsedEmailNumbers.find(obj => obj.email === email));

// Loop through first JSON file and check for exact matches in second JSON file
const result = [];
for (const { first_name, last_name, email } of uniqueEmailNames) {
  const match = uniqueEmailNumbers.find(obj => obj.email === email);
  if (match) {
    result.push({ name: first_name + " " + last_name, email, cc_number: match.cc_number });
  }
}

console.log(result);
