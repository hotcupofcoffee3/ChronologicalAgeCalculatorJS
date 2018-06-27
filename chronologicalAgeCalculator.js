/*** Set up Chronlogical Age Calculator HTML ***/

	function startChronologicalAgeCalculator(){
		setBirthMonths();
		setTestingMonth();
		makeSelectedMonthCurrent();
		makeSelectedDayCurrent();
		setBirthYears();
		setTestingYears();
		makeSelectedYearCurrent();
	}

/*** Birth and Test Date Object Constructs ***/

	function DateObject(year, month, day){
		this.year = year;
		this.month = month;
		this.day = day;
	}

	let birthDate = new DateObject();
	let testingDate = new DateObject();


/*** Calculating and populating dropdown menus ***/

	/*** Months ***/

		// Actual values
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		// Create HTML String
			function populateDropdownMenusFor_Months(whichTypeOfDate, arrayOfMonths){
				let monthsHTML = "";
				monthsHTML += "<option></option>";
				for (month in arrayOfMonths){
					monthsHTML += "<option id='" + whichTypeOfDate + arrayOfMonths[month] + "'value='" + arrayOfMonths[month] + "'>" + (parseInt(month) + 1) + " - " + arrayOfMonths[month] + "</option>";
				}
				return monthsHTML;
			}

		function setBirthMonths(){
			document.getElementById('birthMonth').innerHTML = populateDropdownMenusFor_Months('birth', months);
		}
		function setTestingMonth(){
			document.getElementById('testingMonth').innerHTML = populateDropdownMenusFor_Months('testing', months);
		}

		function makeSelectedMonthCurrent(){
			document.getElementById('testing' + months[new Date().getMonth()]).selected = "true";
			// Sets selected month to testingDate object
				testingDate.month = (new Date().getMonth() + 1);
		}

	/*** Days ***/

		// Actual values for each month
			function setDaysForEachMonth(chosenMonthFromMonthsArray){
				switch (chosenMonthFromMonthsArray) {
					case "January": case "March": case "May": case "July": case "August": case "October": case "December":
						return 31;
					case "April": case "June": case "September": case "November":
						return 30;
					case "February":
						return 29;
					default:
						break;
				}
			}

		// Create HTML String
			function populateDropdownMenusFor_Days(whichTypeOfDate, numberOfDaysInChosenMonth){
				let daysHTML = "";
				daysHTML += "<option></option>";
				for (day = 1; day <= numberOfDaysInChosenMonth; day++){
					daysHTML += "<option id='" + whichTypeOfDate + day + "'value='" + day + "'>" + day + "</option>";
				}
				return daysHTML;
			}

		// Get chosen month and populate 'days' dropdown based on month
		// Function is used on the dropdown menu only, not in the JavaScript
			function setBirthDays(chosenMonth){
				let itemIndex = chosenMonth.selectedIndex;
				let numberOfDaysInChosenMonth = setDaysForEachMonth(chosenMonth[itemIndex].value);
				document.getElementById('birthDay').innerHTML = populateDropdownMenusFor_Days('birth', numberOfDaysInChosenMonth);
			}
			function setTestingDays(chosenMonth){
				let itemIndex = chosenMonth.selectedIndex;
				let numberOfDaysInChosenMonth = setDaysForEachMonth(chosenMonth[itemIndex].value);
				document.getElementById('testingDay').innerHTML = populateDropdownMenusFor_Days('testing', numberOfDaysInChosenMonth);
			}

		// Make selected day current
			function setCurrentAmountOfDays(){
				let numberOfDaysInChosenMonth = setDaysForEachMonth(months[new Date().getMonth()]);
				document.getElementById('testingDay').innerHTML = populateDropdownMenusFor_Days('testing', numberOfDaysInChosenMonth);
			}
			function makeSelectedDayCurrent(){
				setCurrentAmountOfDays();
				document.getElementById('testing' + new Date().getDate()).selected = "true";
				// Sets selected day to testingDate object
					testingDate.day = new Date().getDate();
			}

	/*** Years ***/

		// Actual values
			function arrayOfYears(){
				let years = [];
				let currentYear = new Date().getFullYear();
				for (year = currentYear; year >= 1995; year--){
					years.push(year);
				}
				return years;
			}

		// Create HTML String
			function populateDropdownMenusFor_Years(whichTypeOfDate, arrayOfYears){
				let yearsHTML = "";
				yearsHTML += "<option></option>";
				for (year in arrayOfYears){
					yearsHTML += "<option id='" + whichTypeOfDate + arrayOfYears[year] + "'value='" + arrayOfYears[year] + "'>" + arrayOfYears[year] + "</option>";
				}
				return yearsHTML;
			}

			function setBirthYears(){
				document.getElementById('birthYear').innerHTML = populateDropdownMenusFor_Years('birth', arrayOfYears());
			}
			function setTestingYears(){
				document.getElementById('testingYear').innerHTML = populateDropdownMenusFor_Years('testing', arrayOfYears());
			}
			function makeSelectedYearCurrent(){
				document.getElementById('testing' + new Date().getFullYear()).selected = "true";
				// Sets selected year to testingDate object
					testingDate.year = new Date().getFullYear();
			}

/*** Updates birthDate and testingDate after each option is selected ***/

	function updateDateObjects(itemSelected){

		// The actual value of each selected option
			let valueOfItemSelected = itemSelected[itemSelected.selectedIndex].value;

		// If any value is left de-selected, as in the first blank slot, it gets set back to 'undefined'.
		// Also, if month is changed, the day is reset to 'undefined', because it needs to change again based on the month.
			if (valueOfItemSelected == ""){
				switch (itemSelected.id) {
					case "birthMonth": birthDate.month = undefined; birthDate.day = undefined;
						break;
					case "birthDay": birthDate.day = undefined;
						break;
					case "birthYear": birthDate.year = undefined;
						break;
					case "testingMonth": testingDate.month = undefined; testingDate.day = undefined;
						break;
					case "testingDay": testingDate.day = undefined;
						break;
					case "testingYear": testingDate.year = undefined;
						break;
				}
			}

		// Months
			for (month in months) {
				// English name matches
				if (valueOfItemSelected == months[month]){
					if (itemSelected.id == "birthMonth"){
						// Sets month to number, instead of string.
						birthDate.month = parseInt(month) + 1;
						birthDate.day = undefined;
					} else {
						// Sets month to number, instead of string.
						testingDate.month = parseInt(month) + 1;
						testingDate.day = undefined;
					}
				}
			}

		// Days
			let days = []; for (i = 1; i <= 31; i++){ days.push(i); }
			for (day in days) {
				if (valueOfItemSelected == day){
					if (itemSelected.id == "birthDay"){
						// Sets day to number, instead of string.
						birthDate.day = parseInt(valueOfItemSelected);
					} else {
						// Sets day to number, instead of string.
						testingDate.day = parseInt(valueOfItemSelected);
					}
				}
			}

		// Years
			let years = arrayOfYears();
			for (year in years) {
				if (valueOfItemSelected == years[year]){
					if (itemSelected.id == "birthYear"){
						// Sets year to number, instead of string.
						birthDate.year = parseInt(valueOfItemSelected);
					} else {
						// Sets year to number, instead of string.
						testingDate.year = parseInt(valueOfItemSelected);
					}
				}
			}
	}

/***** Checks before submission *****/

	let errorMessage = "";

	// Check to see if Feb 29 is actual leap year
		function isLeapYearAccurate(selectedDateObject){
			let leapYearIsAccurate = true;
			if (selectedDateObject.year % 4 != 0 && selectedDateObject.day == 29){
				addError("<p>" + selectedDateObject.year + " isn't a leap year!</p>");
				leapYearIsAccurate = false;
			}
			return leapYearIsAccurate;
		}

	// Check to make sure no value is left 'undefined'
		function hasEverythingBeenSelected(){
			let everythingSelected = true;
			if (birthDate.day == undefined){
				addError("<p>You gotta select a birth day!</p>");
				everythingSelected =  false;
			}
			if (birthDate.month == undefined){
				addError("<p>You gotta select a birth month!</p>");
				everythingSelected =  false;
			}
			if (birthDate.year == undefined){
				addError("<p>You gotta select a birth year!</p>");
				everythingSelected =  false;
			}
			if (testingDate.day == undefined){
				addError("<p>You gotta select a testing day!</p>");
				everythingSelected =  false;
			}
			if (testingDate.month == undefined){
				addError("<p>You gotta select a testing month!</p>");
				everythingSelected =  false;
			}
			if (testingDate.year == undefined){
				addError("<p>You gotta select a testing year!</p>");
				everythingSelected =  false;
			}
			return everythingSelected;
		}

	// Check to see if the years are not negative
		function isThePersonBornYet(){
			let thePersonIsBorn = true;
			let calculatedChronologicalAge = calculateCA(birthDate, testingDate);
			if (calculatedChronologicalAge.year < 0 || calculatedChronologicalAge.month < 0 || calculatedChronologicalAge.day < 0){
				thePersonIsBorn = false;
				addError("<p>You can't test a person that hasn't been born yet!</p>");
			}
			return thePersonIsBorn;
		}

	// Adds to error message
		function addError(specificErrorMessage){
			errorMessage += specificErrorMessage;
		}

	// Adds error message to document
		function putErrorMessageInDocument(errorMessage){
			document.getElementById('error').innerHTML = errorMessage;
		}

	/*** Final Check of everything to make sure it's all good ***/
		function isEverythingGood(){
			let everythingIsGood = true;
			errorMessage = "";
			putErrorMessageInDocument("");

			if (!isLeapYearAccurate(birthDate)) {
				everythingIsGood = false;
			}
			if (!isLeapYearAccurate(testingDate)){
				everythingIsGood = false;
			}
			if (!hasEverythingBeenSelected()){
				everythingIsGood = false;
			}
			if (!isThePersonBornYet()){
				everythingIsGood = false;
			}

			if (!everythingIsGood){
				putErrorMessageInDocument(errorMessage);
			}
			return everythingIsGood;
		}

/*** Calculate Chronological Age ***/

	function calculateCA(chosenBirthDate, chosenTestingDate){
		// Setting CA to testing date initially, as it will be the one "on top" during arithmetic.
			let chronologicalAge = new DateObject();
			chronologicalAge.year = chosenTestingDate.year;
			chronologicalAge.day = chosenTestingDate.day;
			chronologicalAge.month = chosenTestingDate.month;

		// Calculate day
			chronologicalAge.day = chronologicalAge.day - chosenBirthDate.day;
			if (chronologicalAge.day < 0){
				// Borrowing 1 from 'month' property
				chronologicalAge.month -= 1;
				// Adding borrowed month to 'day' (30) to make up for the difference.
				chronologicalAge.day += 30;
			}

		// Calculate month
			chronologicalAge.month = chronologicalAge.month - chosenBirthDate.month;
			if (chronologicalAge.month < 0){
				// Borrowing 1 from 'year' property
				chronologicalAge.year -= 1;
				// Adding borrowed month to days (30)
				chronologicalAge.month += 12;
			}

		// Calculate year
			chronologicalAge.year = chronologicalAge.year - chosenBirthDate.year;

			return chronologicalAge;
	}

/*** Display CA ***/

	function displayCA(){
		document.getElementById('chronologicalAgeDisplay').innerHTML = "";
		if (isEverythingGood() == true){
			putErrorMessageInDocument("");

			// Calculate and display CA
			console.log("Huzzah!");

			let chronologicalAge = calculateCA(birthDate, testingDate);
			document.getElementById('chronologicalAgeDisplay').innerHTML = "<p>The Chronological Age is: </p><p>" + chronologicalAge.year + " years; " + chronologicalAge.month + " months; " + chronologicalAge.day + " days</p>";
			console.log(chronologicalAge);
		}
	}

	startChronologicalAgeCalculator();
