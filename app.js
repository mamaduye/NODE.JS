

// menuliskan string ke file (synchronous)
// try {
//    fs.writeFileSync('data/test.txt','hello word secara synchronous!');
// } catch (error) {
//    console.log(error)
// }


// menuliskan string ke file (asyncehronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous', (e) => {
//    console.log(e);
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync('data/contacts.json','utf-8');
// console.log(data);

// membaca isi file (asynchronoous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) =>{
//    if (err) throw err;
//    console.log(data);
// });



// rl.question('Masukkan nama anda : ', (nama) => {
//     rl.question('Masukkan no HP anda : ', (noHP) => {
//         const contact = { nama, noHP };
//         const file = fs.readFileSync('data/contacts.json', 'utf8');
//         const contacts = JSON.parse(file);

//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

//         console.log('Terima kasih sudah memasukkan data.');
        
//         rl.close();
//     });
// });

// const  contacts = require('./contacts.js');

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda : ');
//     const noHP = await contacts.tulisPertanyaan('Masukkan No HP anda : ');

//     contacts.simpanContact(nama, email, noHP);

// };

  
// main();

const contacts = require('./contacts');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Leangkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(agrv){
      contacts.simpanContact(agrv.nama, agrv.email, agrv.noHP);
    },
})
.demandCommand();

// Menampilkan daftar semua nama & no kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar semua nama & no kontak',
    handler() {
       contacts.listContact();
    },
});

// Menampilkan detail sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak',
    builder: {
        nama: {
            describe: 'Nama Leangkap',
            demandOption: true,
            type: 'string',
        },

    },
    handler(agrv) {
       contacts.detailContact(agrv.nama);
    },
});

// Menghpus  sebuah kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan anama',
    builder: {
        nama: {
            describe: 'Nama Leangkap',
            demandOption: true,
            type: 'string',
        },

    },
    handler(agrv) {
       contacts.deleteContact(agrv.nama);
    },
});

yargs.parse();

