const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const convert = function (tipe, name) {
    const inputPath = path.join(__dirname, 'uploads', name);
    const outputPath = path.join(__dirname, 'public', 'uploads', `${name}.pdf`);

    const doc = new jsPDF();
    const arquive = fs.readFileSync(inputPath);

    if (tipe === 'image/pdf' || tipe === 'application/pdf') {
        fs.writeFileSync(outputPath, arquive);
    } else {
        doc.addImage(arquive, 0, 0);
        doc.save(outputPath);
    }

    // Apaga o arquivo original
    try {
        fs.unlinkSync(inputPath);
        console.log(`Imagem ${name} removida com sucesso`);
    } catch (err) {
        console.error(`Erro ao apagar ${name}:`, err);
    }
};

module.exports = convert;
