// Takes digitStr(length = 1), targetStr(no limit length)
var oneToManyDigitMultiple = function (digitStr, targetStr) {
  // Initial Values
  var totalStr        = "";
  var increaseNextNum = 0;
  var lastIndex       = targetStr.length - 1;

  for (var i = lastIndex; i >= 0; i--) {
    var targetDigit = Number(targetStr[i]);
    var digitNum    = Number(digitStr);

    var resultNum = (digitNum * targetDigit) + increaseNextNum;
    var resultStr = String(resultNum);

    if (resultStr.length > 1) {
      increaseNextNum = Number(resultStr[0]);
    } else {
      increaseNextNum = 0;
    }

    totalStr = resultStr[resultStr.length - 1] + totalStr;

    if (i === 0 && increaseNextNum) {
      totalStr = String(increaseNextNum) + totalStr;
    }
  }

  return totalStr;
};

// Takes num1Str(no limit length), num2Str(no limit length)
var manyToManyDigitSum = function (num1Str, num2Str) {
  // Initial Values
  var totalStr        = "";
  var increaseNextNum = 0;
  var longest         = num1Str.length >= num2Str.length ? num1Str : num2Str;
  var shortest        = num1Str.length >= num2Str.length ? num2Str : num1Str;
  var lastIndex       = longest.length - 1;
  var lengthDiff      = longest.length - shortest.length;

  for (var i = lastIndex; i >= 0; i--) {
    var shortestIndexOffset = i -lengthDiff;

    var longDigit  = Number(longest[i]);
    var shortDigit = shortestIndexOffset >= 0 ? Number(shortest[shortestIndexOffset]) : 0;

    var resultNum = longDigit + shortDigit + increaseNextNum;
    var resultStr = String(resultNum);

    if (resultStr.length > 1) {
      increaseNextNum = Number(resultStr[0]);
    } else {
      increaseNextNum = 0;
    }

    totalStr = resultStr[resultStr.length - 1] + totalStr;

    if (i === 0 && increaseNextNum) {
      totalStr = String(increaseNextNum) + totalStr;
    }
  }

  return totalStr;
};

// Recursion
// Takes base(str|int)[single|multi digit], powerRemaining(int)[times to run], prevStr(undefined|str)
// Extract Each baseStr digit and multiple it with prevStr as digitMultipleStr
// If baseStr is multi digit, add 0 digitMultipleStr for every digit to offset digit placement
// Cumulate each digitMultipleStr as totalStr
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
    var digitMultipleStr = oneToManyDigitMultiple(baseStr[i], prevStr);
    var zeroToAdd        = "0".repeat(zeroCounter);
    zeroCounter++;

    totalStr = manyToManyDigitSum(totalStr, digitMultipleStr + zeroToAdd);
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
  // oneToManyDigitMultiple
  console.log("Test:", oneToManyDigitMultiple("9", "9999")  === "89991");
  console.log("Test:", oneToManyDigitMultiple("9999", "9")  !== "89991");
  console.log("Test:", oneToManyDigitMultiple("9999", "9999")  !== "99980001");

  // manyToManyDigitSum
  console.log("Test:", manyToManyDigitSum("999", "9999") === "10998");
  console.log("Test:", manyToManyDigitSum("9999", "999") === "10998");

  // mathPowerStr
  console.log("Test:", mathPowerStr("9", 5) === "59049");
  console.log("Test:", mathPowerStr("99", 5) === "9509900499");
  console.log("Test:", mathPowerStr("2", 1000) === "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376");
  console.log("Test:", mathPowerStr("22", 1000) === "26465543808159359807204897752248530030728824402738723167918795488166165273798371390437672934193601584932945845549271970715677887354427612601390043090235343992293044865163772297469410385122978329678056499296046815122820408087007318491330752037326632848699710203456534735974308941168775473205721554039443204937610177929590286101141387167127581079666525884056222276109629316685302130400020580747092596297556673676259389989258709881395831076723440004667105228514426488284026106932507177721458489295288837068557178136639184670101496129468846997885141096404019577184748414819055187329638500969907051311225151083884240790626313806340789667373178478032516050853023433207986217460651327137805472895049170475888604242782978670991195223848704473438684486835660639093025671599733735049605800664609655501336071529669200245472469430523045855244493268057149512441659293736149805014312014474480540074585365220748619918179775116928934517270712809891340914502201281396468896867603859538547946981372702319495989995355120910688511428245811723518006950557022279638984419287276685520422142753315816756800924921302937351832829423691467932144816580392648661722022310892465081241882752048749260560976755150214966625419722895872213350670990433349705757387295004909344423053225686827603496954982950280200010805253243831624556864586769879190356952607054413216591565029376");

  // getStrDigitSum
  console.log("Test:", getStrDigitSum("123") === 6);
  console.log("Test:", getStrDigitSum("321") === 6);
}