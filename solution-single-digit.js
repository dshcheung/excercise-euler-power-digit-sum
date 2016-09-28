var mathPowerStr = function (base, power) {
  var prevStr  = "1";

  for (var i = power; i > 0; i--) {
    var totalStr    = "";
    var residuleNum = 0;

    for (var k = prevStr.length - 1; k >= 0; k--) {
      var targetNum   = Number(prevStr[k]);
      var multipleStr = String(base * targetNum + residuleNum);

      if (multipleStr.length > 1) {
        residuleNum = Number(multipleStr[0]);
        totalStr    = multipleStr[1] + totalStr;
      } else {
        residuleNum = 0;
        totalStr    = multipleStr[0] + totalStr;
      }

      if (k === 0 && residuleNum) {
        totalStr = String(residuleNum) + totalStr;
      }
    }

    prevStr = totalStr;
  }

  return prevStr;
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

powerDigitsSum(2, 1000); // -> 1366