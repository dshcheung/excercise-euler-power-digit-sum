// Takes num1Str, num2Str, doMultiple(bool)[multiply or summation]
// Extract number from both longest & shortest string at appropriate digit level
// resultNum = longDigit (*|+) shortDigit + residuleNum[from previous step]
// Transform resultNum to resultStr for manipulation
// Always add the last digit from resultStr to totalStr to build up totalStr
// if resultStr is multi digit,
// then make residule = resultStr except last digit,
// since last digit was added to totalStr
// When loop finish and still residule left,
// add residule to the beginning of totalStr to complete total
// return totalStr
var multiplyOrSum = function (num1Str, num2Str, doMultiple) {
  // Initial Values
  var totalStr        = "";
  var residuleNum     = 0;
  // Set longest & shortest because in summation
  // allow the left over to add up to total
  // from longest to add up to totalStr
  var longest         = num1Str.length >= num2Str.length ? num1Str : num2Str;
  var shortest        = num1Str.length >= num2Str.length ? num2Str : num1Str;
  var lastIndex       = longest.length - 1;

  for (var i = lastIndex; i >= 0; i--) {
    var longDigit = Number(longest[i]);
    var shortDigit;
    var resultNum;

    // Extract number from both longest & shortest string at appropriate digit level
    // resultNum = longDigit (*|+) shortDigit + residuleNum[from previous step]
    if (doMultiple) {
      shortDigit = Number(shortest);
      resultNum  = (longDigit * shortDigit) + residuleNum;
    } else {
      // lengthDiff help to find numbers on same digit level
      // "9999" -> last index is 3
      //   "99" -> last index is 1, offset 2
      var lengthDiff          = longest.length - shortest.length;
      // Stop adding longDigit & shortDigit when shortestIndexOffset is negative,
      // because there are no more digits on the same level
      // "1234" -> index 1                    -> "2"
      //   "12" -> index 1 - lengthDiff -> -1 -> undefined
      shortDigit = i - lengthDiff >= 0 ? Number(shortest[i - lengthDiff]) : 0;
      resultNum  = longDigit + shortDigit + residuleNum;
    }

    // Transform resultNum to resultStr for manipulation
    var resultStr    = String(resultNum);
    var resultLength = resultStr.length;

    // Always add the last digit from resultStr to totalStr to build up totalStr
    totalStr = resultStr[resultStr.length - 1] + totalStr;

    // if resultStr is multi digit, then make residule = resultStr except last digit
    if (resultLength > 1) {
      residuleNum = Number(resultStr.substr(0, resultLength - 1));
    } else {
      residuleNum = 0;
    }

    // When loop finish and still residule left,
    // add residule to the beginning of totalStr to complete total
    if (i === 0 && residuleNum) {
      totalStr = String(residuleNum) + totalStr;
    }
  }

  return totalStr;
};

// Recursion
// Takes base(str|int)[single|multi digit], powerRemaining(int)[times to run], prevStr(undefined|str)
// Extract Each baseStr digit and multiple it with prevStr as digitMultipleStr
// If baseStr is multi digit, add 0 digitMultipleStr for every digit to offset digit level
// Cumulate each digitMultipleStr as totalStr[the next prevStr]
// return self
var mathPowerStr = function (base, powerRemaining, prevStr) {
  // Base Case
  // === 1 to exclude first step
  if (powerRemaining === 1) {
    return prevStr;
  }

  // Inital Values
  var baseStr      = String(base);
  prevStr          = prevStr || baseStr;

  // Loop Values
  var totalStr     = "0";
  var zeroCounter  = 0;

  // Extract Each baseStr digit and multiple it with prevStr as digitMultipleStr
  // If baseStr is multi digit, add 0 digitMultipleStr for every digit to offset digit placement
  // Cumulate each digitMultipleStr as totalStr
  for (var i = baseStr.length - 1; i >= 0; i--) {
    var digitMultipleStr = multiplyOrSum(baseStr[i], prevStr, true);
    var zeroToAdd        = "0".repeat(zeroCounter);
    zeroCounter++;

    totalStr = multiplyOrSum(totalStr, digitMultipleStr + zeroToAdd, false);
  }

  return mathPowerStr(base, powerRemaining - 1, totalStr);
};

// Takes targetNumStr(str)[numbers in string]
// Cumulate each digit in targetNumStr as total
// Return total(int)
var getStrDigitSum = function (targetNumStr) {
  // Initial Value
  var total = 0;

  // Cumulate each digit in targetNumStr to total
  for (var i = 0; i < targetNumStr.length; i++) {
    total += Number(targetNumStr[i]);
  }

  return total;
};

// Takes base(int|str), power(int)
// Calculate the base^power in string
// Returns the Calculated sum(int) of each digit within the string
var powerDigitsSum = function (base, power) {
  // Calculate the base^power in string
  var poweredResultStr = mathPowerStr(base, power);

  // returns the Calculated sum of each digit within the string
  return getStrDigitSum(poweredResultStr);
};

if (true) {
  // multiplyOrSum - Multiple
  console.log("Test:", multiplyOrSum("9", "9999", true)  === "89991");
  console.log("Test:", multiplyOrSum("9999", "9", true)  === "89991");
  // Multi Digit multiply works but unrelyable when
  // one or both number > Number.MAX_SAFE_INTEGER
  console.log("Test:", multiplyOrSum("9999", "9999", true)  === "99980001");

  // multiplyOrSum - Summation
  console.log("Test:", multiplyOrSum("999", "9999", false) === "10998");
  console.log("Test:", multiplyOrSum("9999", "999", false) === "10998");

  // mathPowerStr
  console.log("Test:", mathPowerStr("9", 5) === "59049");
  console.log("Test:", mathPowerStr("99", 5) === "9509900499");
  console.log("Test:", mathPowerStr("2", 1000) === "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376");
  console.log("Test:", mathPowerStr("22", 1000) === "26465543808159359807204897752248530030728824402738723167918795488166165273798371390437672934193601584932945845549271970715677887354427612601390043090235343992293044865163772297469410385122978329678056499296046815122820408087007318491330752037326632848699710203456534735974308941168775473205721554039443204937610177929590286101141387167127581079666525884056222276109629316685302130400020580747092596297556673676259389989258709881395831076723440004667105228514426488284026106932507177721458489295288837068557178136639184670101496129468846997885141096404019577184748414819055187329638500969907051311225151083884240790626313806340789667373178478032516050853023433207986217460651327137805472895049170475888604242782978670991195223848704473438684486835660639093025671599733735049605800664609655501336071529669200245472469430523045855244493268057149512441659293736149805014312014474480540074585365220748619918179775116928934517270712809891340914502201281396468896867603859538547946981372702319495989995355120910688511428245811723518006950557022279638984419287276685520422142753315816756800924921302937351832829423691467932144816580392648661722022310892465081241882752048749260560976755150214966625419722895872213350670990433349705757387295004909344423053225686827603496954982950280200010805253243831624556864586769879190356952607054413216591565029376");

  // getStrDigitSum
  console.log("Test:", getStrDigitSum("123") === 6);
  console.log("Test:", getStrDigitSum("321") === 6);

  // powerDigitsSum
  console.log("Test:", powerDigitsSum(2, 1000) === 1366);
}