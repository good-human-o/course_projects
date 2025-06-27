import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer 
    .prompt([
    {
        type: 'input',
        message: 'Enter the URL you want to generate a QR code for:',
        name: 'url'
    }
    ])
    .then(answers => {
    const url = answers.url;
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile('url.txt', url, (err) => {
        if (err) throw err;
        console.log('QR code saved as qr_img.png and URL saved as url.txt');
    });
    console.log('QR code created successfully!');
    console.log('URL:', url);

    })
    .catch(error => {
    if (error.isTtyError) {
        console.log('Please run the script in a terminal or command prompt.');
    } else {
        console.error('Failed to create QR code:', error.message);
    }
    });
