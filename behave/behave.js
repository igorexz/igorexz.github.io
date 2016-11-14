/*
	This script requires JQuery 2.2+ 
	It can be used with <textarea> html tag.
	---
	Use setBehave() function as the document loads for checking user's typing behaviour in <textarea>.
	Use getBehave() function for getting unique user's typing behaviour key.
*/

// Global variables for the next use.
var keypressSum, keypressAvg, backspaceCount, spaceAvg, spaceSum;
var delayArr = [];
var spaceDelayArr = [];

/*
	USAGE: 
		Use setBehave() as the document loads for checking user's typing behaviour.
		Argument typingAreaSelector is required - Jquery <textarea> selector as a string.
*/
var setBehave = function(typingAreaSelector){
	// Copy-Paste command restriction.
	$(typingAreaSelector).bind("cut copy paste",function(e) {
        e.preventDefault();
    });

	// Flushing previous behaviour data.
	keypressSum = 0; keypressAvg = 0; backspaceCount = 0; spaceAvg = 0; spaceSum = 0; delayArr = [], spaceDelayArr = [];
	
	var firstKeyChecker = new Date();
	var secondKeyChecker = new Date();
	var firstSpaceChecker = -1, secondSpaceChecker = -1;
	$(typingAreaSelector).on("keydown", function(e){
		secondKeyChecker = new Date();
		var keypressDelay = secondKeyChecker - firstKeyChecker;
		if(keypressDelay < 800 && keypressDelay > 40)
			delayArr.push(keypressDelay);
		if(e.keyCode == 8)
			backspaceCount++;
		if(e.keyCode == 32){
			secondSpaceChecker = new Date();
			if(firstSpaceChecker != -1){
				var spaceDelay = secondSpaceChecker - firstSpaceChecker;
				if (spaceDelay < 2500 && spaceDelay > 300)
					spaceDelayArr.push(spaceDelay);
			}
			firstSpaceChecker = secondSpaceChecker;
		}
		firstKeyChecker = secondKeyChecker;
	});
}

/*
	USAGE:
		Use getBehave() in the end of user input process.
		It returns user behaviour in array:
			[(Average delay between space keypresses), 
			 (Average delay between any keypresses),
			 (Total backspace keypress count as typos counter.)]
			[FLOAT, FLOAT, INT]
*/
var getBehave = function(){
	for(var i = 0, spaceSum = 0; i < spaceDelayArr.length; spaceSum += spaceDelayArr[i++]);
	spaceAvg = spaceSum / spaceDelayArr.length;
	for(var i = 0, keypressSum = 0; i < delayArr.length; keypressSum += delayArr[i++]);
	keypressAvg = keypressSum / delayArr.length;
	return [spaceAvg, keypressAvg, backspaceCount];
}

/*
	USAGE: 
		Takes getBehave() Array as an argument.
		Returns base64-encoded unique key. (STRING)
*/
var createEncryptedKey = function(getBehaveArr){
	return btoa(getBehaveArr[0].toString()) + "$" + btoa(getBehaveArr[1].toString()) + "$" + btoa(getBehaveArr[2].toString());
}

/*
	USAGE:
		Takes two encrypted behaviour keys as an argument. (STRING, STRING)
		Returns BOOL.
		(TRUE) if behaviour keys are same.
		(FALSE) if behaviour keys aren't same.
	---
	Decodes 3 base-64 encoded strings from createEncryptedKey().
	This strings are divided by "$" - {Space Keypress Average Delay}${Any Keypress Average Delay}${Backspace Count}.
	Checks if maximum difference 
*/
var compareKeys = function(firstKey, secondKey){
	// You can change this variables if you need.
	maxSpaceDiff = 300;
	maxKeypressDiff = 70;
	maxBackspaceDiff = 10;

	firstKeyBehave = firstKey.split("$");
	secondKeyBehave = secondKey.split("$");
	firstSpaceAvg = parseFloat(atob(firstKeyBehave[0]));
	firstKeypressAvg = parseFloat(atob(firstKeyBehave[1]));
	firstBackspaceCount = parseInt(atob(firstKeyBehave[2]));
	secondSpaceAvg = parseFloat(atob(secondKeyBehave[0]));
	secondKeypressAvg = parseFloat(atob(secondKeyBehave[1]));
	secondBackspaceCount = parseInt(atob(secondKeyBehave[2]));
	spaceDiff = Math.abs(firstSpaceAvg - secondSpaceAvg);
	keypressDiff = Math.abs(firstKeypressAvg - secondKeypressAvg);
	backspaceDiff = Math.abs(firstBackspaceCount - secondBackspaceCount);
	return (spaceDiff < maxSpaceDiff && keypressDiff < maxKeypressDiff && backspaceDiff < maxKeypressDiff);
}
