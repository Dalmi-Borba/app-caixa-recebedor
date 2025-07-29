const {jsPDF} = require('jspdf');
const fs = require('fs');
const path = require('path');

const convert = function(tipe, name){
    const doc = new jsPDF();
 
    let arquive = fs.readFileSync(path.join(__dirname + '/uploads/' + name));

     if(tipe === 'image/pdf'){
          fs.writeFileSync(`./public/uploads/${name}.pdf`, arquive, {encoding: 'base64'})
     }else if (tipe === 'application/pdf') {
          fs.writeFileSync(`./public/uploads/${name}.pdf`, arquive, {encoding: 'base64'})
     } else {
          doc.addImage(arquive, 0, 0);
          doc.save(`./public/uploads/${name}.pdf`);
     }  
};

module.exports = convert;