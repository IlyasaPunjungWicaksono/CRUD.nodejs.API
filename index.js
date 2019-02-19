// Create Server

const express = require('express'); // import module express
const app = express(); // eksekusi module express

const MongoClient = require('mongodb').MongoClient;//import driver mongodb
const ObjectID = require('mongodb').ObjectID;//import objectID
const Dburl = "mongodb://127.0.0.1:27017";//url DB -> port mongo : 27017
const DBname = "XIR6";

let dbo = null;//object koneksi database
//koneksi database
MongoClient.connect(Dburl, (error,db)=> {
    if (error) throw error;
    dbo = db.db(DBname);
});

const bodyParser = require('body-parser'); // import body-parser

app.use(bodyParser.urlencoded({extend: false})) // harus berada diatas semua endpoint

//endpoint get : mengambil data dari database yang telah dibuat sebelumnya 
app.get('/siswa', (request,response)=>{
    dbo.collection("siswa").find().toArray((err, res)=>{ //mengambil data dari collextion dalam bentuk array
        if(err) throw err;
        response.json(res);//menampilkan data
    })
});



//endpoint insert data ke database
app.post('/siswa', (request,response)=>{
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    dbo.collection("siswa").insertOne({
        nama : namaSiswa,
        alamat : alamatSiswa
    },(err, res)=>{
        if(!err){
            response.json(res);
            response.end("data berhasil masuk");
        }else{
            throw err;//apabila error akan dilempar ke nodejs
        }
    })
})

//endpoint detele data dari database
app.delete('/siswa/:id',(request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({ //perintah hapus mongodb
        _id : id_object //mengambil id data untuk dihapus
    },(err,res)=>{
        if(err) throw err;
        response.end("data  berhasil dihapus");
    })
})

//endpoint update data dari database
app.put('/siswa/:id',(request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusan;
    dbo.collection("siswa").updateOne({
        _id : id_object          //mengambil data yang akan di edit berdasarkan id
},{$set:{
    nama : namaSiswa,
    kelas : kelasSiswa,
    jurusan : jurusanSiswa
}},
(err,res)=>{
    if(err) throw err;
    response.end("data berhasil diupdate");
})
})

// eksekusi express dengan memanggil variabel app
app.get('/test', function(req, res){ // simbol / yang berarti "root" atau halaman utama, function req(request) dan res(respone)
    res.end("cek") // mengirimkan respone dari http dan dikembalikan 
});

app.post('/test', function(req, res){
    res.end("cek")
});

app.listen('8080', (e)=>{
    console.log(e);
}); // definisi halaman port