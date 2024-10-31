// Select the input field and suggestions container
const input = document.querySelector('#fruit');
const suggestionsList = document.querySelector('.suggestions ul');

// List of fruits 
const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// Function to filter fruits based on input
function search(inputVal) {
	// Loop through each fruit and add matches to the results list
	return fruits.filter(fruit => fruit.toLowerCase().includes(inputVal.toLowerCase()))
}

//Function to handle input event (we'll define the search logic here)
function searchHandler(event) {
	const inputVal = event.target.value; // Capture user input
	/* console.log('User is typing:', inputVal); */ // For testing - show the input in console
	const results = search(inputVal); // Get filtered results
	/* console.log(results);  */// For testing, show the filtered results 
	showSuggestions(results,inputVal); // Display the results in drop down

	// TODO: Add search logic to filter fruits list based on inputVal
	// TODO: Update the drop down with results
}

//Function to display the results in the drop down
function showSuggestions(results, inputVal) {
	suggestionsList.innerHTML = ''; // Clear any previous suggestions

	// Check if there are any results to display
	if (results.length > 0) {
		results.forEach(fruit => {
			const listItem = document.createElement('li');

			//Find the matching part of the fruit name
			const matchIndex = fruit.toLowerCase().indexOf(inputVal.toLowerCase());
			if (matchIndex !== -1) {
				// Split the fruit name into three parts: before, match, after
				const beforeMatch = fruit.slice(0, matchIndex); // end not included
				const matchText = fruit.slice(matchIndex, matchIndex + inputVal.length);
				const afterMatch = fruit.slice(matchIndex + inputVal.length);

				//Construct the inner HTML with bolded matchText
				listItem.innerHTML = `${beforeMatch}<span class = 'highlight'>${matchText}</span>${afterMatch}`;
			} 
			else {
				listItem.textContent = fruit;
			}

			// Add event listener for highlighting on hover
			listItem.addEventListener('mouseover', highlightSuggestion);
			listItem.addEventListener('mouseout', removeHighlight);

			// Add click event listener to use suggestion
			listItem.addEventListener('click', useSuggestion)

			suggestionsList.appendChild(listItem);
		});
		suggestionsList.parentElement.classList.add('has-suggestions'); // Show suggestions
	}
	else {
		suggestionsList.parentElement.classList.remove('has-suggestions');
	}
}

// Function to add highlight on hover
function highlightSuggestion(event) {
	event.target.classList.add('highlight');
}

// Function to remove highlight on mouseout
function removeHighlight (event) {
	event.target.classList.remove('highlight');
}

// Function to populate the search bar with the selected suggestion
function useSuggestion(event) {
	input.value = event.target.textContent; // Get text of clicked suggestion and Set search bar value (Populate input with selected suggestion)
	suggestionsList.innerHTML = ''; // Clear drop down
	suggestionsList.parentElement.classList.remove('has-suggestions') // Hide suggestions
}

// Attach the 'keyup' event listener to the input
input.addEventListener('keyup', searchHandler);

suggestionsList.addEventListener('click', useSuggestion);