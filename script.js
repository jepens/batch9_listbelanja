// tangkap beberapa element html

let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let addlist_form = document.getElementById("addlist_form");
let root = document.getElementById("root");
let subtitle = document.getElementById("subtitle");

// tambahkan date ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString();

// data list belanja *array
let data_list_belanja = [];

// menambahkan event listener ke tombol + (floating button)
floating_button.addEventListener('click', ()=>{

  // munculkan modal

  if(modal.style.display == "none"){
    showModal();
    return
  }

  // else // sembunyikan kembali
  hideModal();

});

// menambahkan event listener ke modal bg

modal_bg.addEventListener('click', ()=>{
  //sembunyikan kembali
  hideModal();
})

// tambahkan event listener submit ke addlist form
addlist_form.addEventListener("submit", (event)=>{

  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing masing input field
  let barang = event.target.barang.value
  let harga = event.target.harga.value

  // push data ke dalam data_list_belanja *array
  data_list_belanja.push({
    nama_barang : barang,
    harga_barang : harga,
    tanggal : new Date().toLocaleDateString()
  })

  console.info(data_list_belanja);

  // clear input field
  event.target.barang.value = "";
  event.target.harga.value = "";

  hideModal();
  renderToHtml();


})

// membuat function show modal
function showModal(){

  modal.style.display = "flex";
    floating_button.style.backgroundColor = "gray";
    floating_button.style.transform = 'rotate(45deg)';

}

// hide modal
function hideModal(){

  modal.style.display = "none";
    floating_button.style.backgroundColor = "pink";
    floating_button.style.transform = 'rotate(0deg)';
}

// render function
function renderToHtml(){

  // clear element div
  root.innerHTML = "";

  // perulangan
  data_list_belanja.forEach((e, i)=>{

    root.innerHTML +=`
    <div class="card">
      <small> ${e.tanggal} </small>
      <div> ${e.nama_barang} <span> Rp. ${e.harga_barang}</span>
      </div>
      <button onclick="handleDelete(${i})">Selesai</button>

    </div>
    
    `

  })

}

// function untuk delete data dalam array data_list_belanja
function handleDelete(index){

  data_list_belanja.splice(index, 1);

  renderToHtml();
}