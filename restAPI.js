// import modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser'); // import body-parser

app.use(bodyParser.urlencoded({extend: false})) // harus berada diatas semua endpoint

// method get
app.get('/test', (req, res)=>{
    res.end("Halo");
});

// method post
app.post('/test', (req, res)=>{
    res.end("Halo");
});



// endpoint get dengan menggunakan parameter
app.get('/siswa/:nama ', (req, res)=>{ // :nama merupakan parameter
    let namaSiswa = req.params.nama; // deklarasi variabel namaSiswa
    res.end("menampilkan nama siswa " + namaSiswa);
});

// endpoint post, dengan menggunakan body-parser untuk mengirimkan data
app.post('/siswa', (req, res)=>{
    let namaSiswa = req.body.name;
    let alamat = req.body.address;
    res.end('menampilkan siswa baru ' + namaSiswa + ', yang beralamat di ' + alamat);
});

// endpoint delete, data yang diakses secara spesifik dengan menggunakan parameter
app.delete('/siswa/:id', (req, res)=>{
    let id = req.params.id;
    let namaSiswa = req.body.name;
    res.end('id' + id + ' telah di hapus, dengan nama: '+ namaSiswa);
});

//endpoint update
app.put('/siswa/:id', (req, res)=>{
    let id = req.params.id;
    let namaSiswa = req.body.name;
    let alamat = req.body.address;
    res.end('siswa dengan id: '+id+' telah diupdate');
});

// inisialisasi port
app.listen('8080', (e)=>{
    console.log(e);
});