let rooms = [];
let roomTypes = [];
let totalPages = 1;
let itemsPerPage = 8;
let currentPage = 1;

function loadDataFromApi() {
  fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
  .then(response => response.json())
  .then(data => {
    rooms = data.map(item => {
      if (!roomTypes.includes(item.property_type)) {
        roomTypes.push(item.property_type);
      }
      item.formattedPrice = formatValue(item.price);
      return item;
    });
    totalPages = Math.ceil(rooms.length / itemsPerPage);
    renderFilters();
    changePage(1);
  })
  .catch(err => {
  })
}

function formatValue(value) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency', 
    currency: 'BRL' }
  ).format(value);
  return formattedValue;
}

function renderFilters() {

  let filterTypes = '';
  roomTypes.map((type, index) => {
    filterTypes += `
    <a href="javascript:filterType(${index})" class="filter__button filter-${index}">${type}</a>
    `;
  })
  const filtersHtml = `
    <a href="javascript:filterPrice('smaller')" class="filter__button smaller">Menor Preço</a>
    <a href="javascript:filterPrice('bigger')" class="filter__button bigger">Maior Preço</a>
    ${filterTypes}
    <a href="/" class="filter__button clear hide">Limpar</a>
  `;

  const containerFilters = document.getElementById('container__filters');
  containerFilters.innerHTML = filtersHtml;
}

function cleanFilterActive() {
  const filters = document.querySelectorAll('.filter__button');
  for (i = 0; i < filters.length; ++i) {
    filters[i].classList.remove('active');
  }
}

function sortItems(items, field, order) {
  if (order === 'asc') {
    items.sort(function (a, b) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  } else {
    items.sort(function (a, b) {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    });
  }
  return items;
}

function filterPrice(type) {
  cleanFilterActive();
  let roomsSort = [...rooms];
  if (type === 'smaller') {
    rooms = sortItems(roomsSort, 'price', 'asc');
  } else {
    rooms = sortItems(roomsSort, 'price', 'desc');
  }

  changePage(1);

  const filter = document.querySelector(`.filter__button.${type}`);
  filter.classList.add('active');
  const clear = document.querySelector('.filter__button.clear');
  clear.classList.remove('hide');
}

function filterType(index) {
  cleanFilterActive();
  if (roomTypes[index]) {
    const filtered = rooms.filter(room => room.property_type === roomTypes[index]);
    renderRooms(filtered);

    const filter = document.querySelector(`.filter__button.filter-${index}`);
    filter.classList.add('active');
    const clear = document.querySelector('.filter__button.clear');
    clear.classList.remove('hide');
  }
}

function renderRooms(roomsPage, page) {
  const containerRooms = document.getElementById('container__rooms');
  
  containerRooms.innerHTML = '';

  roomsPage.map(room => {
    const roomHtml = `
    <article class="room">
      <figure>
        <img src="${room.photo}" alt="${room.name}">
      </figure>
      <label class="room__type">${room.property_type}</label>
      <p class="room__title">${room.name}</p>
      <p class="room__price"><strong>${room.formattedPrice}</strong>/noite</p>
    </article>
    `;
    containerRooms.insertAdjacentHTML('beforeend', roomHtml);
  });

  if (page) {
    renderPagination(page);
  } else {
    const containerPagination = document.getElementById('container__pagination');
    containerPagination.innerHTML = '';
  }
}

function renderPagination(page) {
  let itemsPages = '';
  for (let i = 1; i <= totalPages; i++) {
    itemsPages += `<a class="${page == i ? 'active' : ''}" href="javascript:changePage(${i})">${i}</a>`;
  }
  const paginationHtml = `
    <div class="pagination">
      ${itemsPages}
    </div>
  `;
  const containerPagination = document.getElementById('container__pagination');
  containerPagination.innerHTML = '';
  containerPagination.insertAdjacentHTML('beforeend', paginationHtml);
}

function changePage(page) {
  currentPage = page;
  let roomsPage = [...rooms];
  roomsPage = roomsPage.splice((page - 1) * itemsPerPage, itemsPerPage);
  renderRooms(roomsPage, page);
}

function validaCalendar() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd < 10) {
          dd = '0' + dd
      } 
      if(mm < 10) {
          mm = '0' + mm
      } 
  today = yyyy+'-'+mm+'-'+dd;
  /**Data de check-in não pode ser inferior a data atual */
  document.getElementById("calendar-in").setAttribute("min", today);
  /**Data da check-out não pode ser inferior do que a data de check-in */    
  document.getElementById("calendar-out").setAttribute("min", (document.getElementById("calendar-in").value));
  
}/**Fim da função ValidaCalendar */

/**Calcula Perído */
function calculaPeriodo() {
  console.log('Iniciando o calculo do período');
  let dataEntrada = new Date(document.getElementById('calendar-in').value); //Data de Check-in
  let dataSaida = new Date (document.getElementById('calendar-out').value); //Data de Check-out

  let diff = Math.abs(dataSaida.getTime() - dataEntrada.getTime()); //Subtrai uma data pela outr
  let onedays =  1000 * 60 * 60 * 24;

  return Math.ceil(diff / onedays);
}

loadDataFromApi();
