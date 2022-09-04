let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

// data list belanja
let data_list_belanja = [];
subtitle.innerHTML = new Date().toLocaleDateString();

// button
floating_button.addEventListener('click', function (event) {
  if (modal.style.display == 'flex') {
    hidden_modal();
  } else {
    show_modal();
  }
});
modal_bg.addEventListener('click', function (event) {
  hidden_modal();
});

function show_modal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

function hidden_modal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = 'pink';
  floating_button.style.transform = 'rotate(0deg)';
}

// submit
addlist_form.addEventListener('submit', function (event) {
  event.preventDefault();
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;
  let index = event.target.indexArray.value.trim();

  // edit data
  console.info(index);
  if (index.length != 0) {
    data_list_belanja[index].nama_barang = barang;
    data_list_belanja[index].harga_barang = harga;
    clearValue(event);
    hidden_modal();
    renderToHtml();
    return;
  }

  //push
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  clearValue(event);
  hidden_modal();
  renderToHtml();
});

function clearValue(event) {
  event.target.barang.value = '';
  event.target.harga.value = '';
  event.target.indexArray.value = '';
}

function renderToHtml() {
  root.innerHTML = '';
  data_list_belanja.forEach((data, index) => {
    root.innerHTML += `<div class="card"> 
    <small> ${data.tanggal}</small>  
    <div> ${data.nama_barang} <span>${rupiah(data.harga_barang)}</span></div>
    <div class="buttonCard">
    <button onclick="handleEdit(${index})">Edit</button>
    <button onclick="handleDelete(${index})">Selesai</button>
    <div
    </div>`;
  });
}

function handleDelete(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}

function handleEdit(index) {
  document.getElementById('barang').value =
    data_list_belanja[index].nama_barang;
  document.getElementById('harga').value =
    data_list_belanja[index].harga_barang;
  document.getElementById('indexArray').value = index;
  show_modal();
  // set value
}

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};
