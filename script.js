// tangkap beberapa element html

let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');

// tambahkan date ke subtitle

// data list belanja *array
let data_list_belanja = [];

// menambahkan event listener ke tombol + (floating button)
floating_button.addEventListener('click', () => {
  // munculkan modal

  if (modal.style.display == 'none') {
    showModal();
    return;
  }

  // else // sembunyikan kembali
  hideModal();
});

// menambahkan event listener ke modal bg

// modal_bg.addEventListener('click', () => {
//   //sembunyikan kembali
//   hideModal();
// });

// tambahkan event listener submit ke addlist form
addlist_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data ke dalam data_list_belanja *array
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  console.info(data_list_belanja);

  // clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();
  renderToHtml();
});

// membuat function show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

// hide modal
function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#03dac6';
  floating_button.style.transform = 'rotate(0deg)';
}

// render function
function renderToHtml() {
  // clear element div
  root.innerHTML = '';

  // perulangan
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <small> ${e.tanggal} </small>
      <div> ${e.nama_barang}  <div> Rp. ${e.harga_barang}</div>
      </div>
      <button onclick="handleDelete(${i})">Delete</button>

    </div>
    
    `;
  });
}

// function untuk delete data dalam array data_list_belanja
function handleDelete(index) {
  let conDelete = confirm('yakin delete bang ?');

  if (!conDelete) {
    return;
  } else {
    //delete data array sesuai index
    data_list_belanja.splice(index, 1);
  }

  renderToHtml();
}

window.onload = function () {
  Particles.init({
    selector: '.background',
  });
};
const particles = Particles.init({
  selector: '.background',
  color: ['#03dac6', '#ff0266', '#000000'],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ['#faebd7', '#03dac6', '#ff0266'],
        maxParticles: 43,
        connectParticles: false,
      },
    },
  ],
});

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $('.nav-tab').click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $('.nav-container').addClass('nav-container--scrolled');
    } else {
      $('.nav-container').removeClass('nav-container--scrolled');
    }
    let offset =
      $('.nav').offset().top +
      $('.nav').height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $('.nav-container').addClass('nav-container--move-up');
      $('.nav-container').removeClass('nav-container--top-first');
      $('.nav-container').addClass('nav-container--top-second');
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $('.nav-container').removeClass('nav-container--move-up');
      $('.nav-container').removeClass('nav-container--top-second');
      $('.nav-container-container').addClass('nav-container--top-first');
    } else {
      $('.nav-container').removeClass('nav-container--move-up');
      $('.nav-container').removeClass('nav-container--top-first');
      $('.nav-container').removeClass('nav-container--top-second');
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $('.nav-tab').each(function () {
      let id = $(this).attr('href');
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css('width');
      left = this.currentTab.offset().left;
    }
    $('.nav-tab-slider').css('width', width);
    $('.nav-tab-slider').css('left', left);
  }
}

new NavigationPage();
