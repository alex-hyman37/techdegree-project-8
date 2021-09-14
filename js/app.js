// Global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// __________________________________________________________________________________________________________________
// card function
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = "";

  //loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    //template literal to implement HTML

    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;

  //Searchbar
const search = document.querySelector('#searchBar');
const employeeDatas = document.querySelectorAll('.card h2');

const handleSearch = event => {
  const searchTerm = event.target.value.toLowerCase();

  employeeDatas.forEach(boxData => {
    const text = boxData.textContent.toLowerCase();
    const box = boxData.parentElement.parentElement;

    if(text.includes(searchTerm)) {
      box.style.display = "";
    } else {
      box.style.display = "none";
    }
  });
}
search.addEventListener('keyup', handleSearch);
}

//__________________________________________________________________________________________________________________
// modal function
function displayModal(index) {
  // object destructuring for easier template literal use
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="adress">${city}</p>
      <hr/>
      <p class="phone">${phone}</p>
      <p class="address"> ${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
      <p class="birthday">Birthday: 
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} </p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

//__________________________________________________________________________________________________________________
// event listeners
gridContainer.addEventListener("click", (e) => {
  // make sure click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to the actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Arrow back/forward
const arrowForward = document.querySelector(".arrow-forward");
const arrowBack = document.querySelector(".arrow-back");
let card = document.getElementsByClassName("card");
let indexCards = 0;

function cardNext() {
  if (indexCards == card.length - 1) {
    indexCards = 0;
  } else {
    indexCards++;
    setTimeout(function () {
      displayModal(indexCards);
    }, 100);
  }
}

function cardBack() {
  if (indexCards == 0) {
    indexCards == card.length - 1;
  } else {
    indexCards--;
    setTimeout(function () {
      displayModal(indexCards);
    }, 100);
  }
}

arrowForward.addEventListener("click", () => {
  cardNext();
});

arrowBack.addEventListener("click", () => {
  cardBack();
});









// searchBar.addEventListener("keyup", (e) => {
//   const searchString = e.target.value.toLowerCase();

//   const filteredCharacters = employees.filter((character) => {
//     return character.name.includes(searchString);
//   });
//   displayEmployees(filteredCharacters);
// });
