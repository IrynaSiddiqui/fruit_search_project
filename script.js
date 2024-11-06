// Select the input field and suggestions container

const input = document.querySelector("#fruit");
const suggestionsList = document.querySelector(".suggestions ul");

// List of fruits
const fruits = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

// Function to filter fruits based on input
const search = (inputVal) =>
  fruits.filter((fruit) =>
    fruit.toLowerCase().includes(inputVal.toLowerCase())
  );

//Function to handle input event (we'll define the search logic here)
function searchHandler(event) {
  const inputVal = event.target.value;
  if (inputVal.trim() === "") {
    suggestionsList.innerHTML = "";
  } else {
    const results = search(inputVal);
    showSuggestions(results, inputVal);
  }
}

//Function to display the results in the drop down
function showSuggestions(results, inputVal) {
  suggestionsList.innerHTML = "";

  // Check if there are any results to display
  if (results.length > 0) {
    results.forEach((fruit) => {
      const listItem = document.createElement("li");

      //Find the matching part of the fruit name
      const matchIndex = fruit.toLowerCase().indexOf(inputVal.toLowerCase());
      if (matchIndex !== -1) {
        // Split the fruit name into three parts: before, match, after
        const beforeMatch = fruit.slice(0, matchIndex); // end not included
        const matchText = fruit.slice(matchIndex, matchIndex + inputVal.length);
        const afterMatch = fruit.slice(matchIndex + inputVal.length);

        //Construct the inner HTML with bolded matchText
        listItem.innerHTML = `${beforeMatch}<span class='highlight'>${matchText}</span>${afterMatch}`;
      } else {
        listItem.textContent = fruit;
      }

      suggestionsList.appendChild(listItem);
    });
    suggestionsList.parentElement.classList.add("has-suggestions"); // Show suggestions
  } else {
    //TODO: not working??
    suggestionsList.parentElement.classList.remove("has-suggestions");
  }
}

// Function to populate the search bar with the selected suggestion
function useSuggestion(event) {
  input.value = event.target.textContent;
  suggestionsList.innerHTML = "";
  suggestionsList.parentElement.classList.remove("has-suggestions");
}

// Attach the 'keyup' event listener to the input
input.addEventListener("keyup", searchHandler);

suggestionsList.addEventListener("click", useSuggestion);
