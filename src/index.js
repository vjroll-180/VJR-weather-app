function submitSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#form-input-search");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);
