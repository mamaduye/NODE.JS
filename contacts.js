const fs = require('fs');
const chalk =require('chalk');
const validator =require('validator');
// Readline
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const tulisPertanyaan = (pertanyaan) =>{
//     return new Promise((resolve, reject) =>{
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact =  (nama, email, noHP) =>{
    const contact = { nama, email, noHP };
    // const file = fs.readFileSync('data/contacts.json', 'utf8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();

    // Cek duplikat kontak
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar,gunakan nama lain!'));
        return false;
    }

    // cek email
    if(email){
        if (!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    // cek kontak
        if (!validator.isMobilePhone(noHP,'id-ID')){
            console.log(chalk.red.inverse.bold('Nomor tidak valid!!'));
            return false;
        }
    


    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('Terima kasih sudah memasukkan data.'));
    
    // rl.close();
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar kontak :'));
    contacts.forEach((contact, i) => {
       console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`)      
    });
};

const detailContact = (nama) => {
   const contacts = loadContact();

   const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if(!contact){
    console.log(chalk.red.inverse.bold(` ${nama} tidak ditemukkan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
 
  console.log(contact.noHP);
  if (contact.email){
    console.log(contact.email);
  }
  
  // const newContacts = contacts.filter(
  //   (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  // );

  // fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

  // console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));


  if(!contacts.length === newContacts.length){
    console.log(chalk.red.inverse.bold(` ${nama} tidak ditemukkan!`));
    return false;
  }
  
  return newContacts;
};

module.exports = { simpanContact, listContact, detailContact, deleteContact }; 