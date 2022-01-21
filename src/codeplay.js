/****************************
 * DATA STRUCTURES & ALGORITHMS
 ****************************/

// Reverse String
const reverseString = (str) => {
  // writing a reverse string with the built-in reverse() method
  return str
    .split("")
    .reduce((prev, current) => {
      prev.unshift(current);
      return prev;
    }, [])
    .join("");
};

console.log(reverseString("Maxwell"));

// Palindrom - Forward and backward equates
const palindrome = (str) => {
  return str.toLowerCase() === str.toLowerCase().split("").reverse().join("");
};

console.log(palindrome("Maxwell"));
console.log(palindrome("Madam"));

// Reverse Int

const reverseInt = (number) => {
  return Math.sign(number) === 1
    ? Number(number.toString().split("").reverse().join(""))
    : -1 * Number(number.toString().slice(1).split("").reverse().join(""));
};

// console.log(reverseInt(100));

const ceasarCypher = (str, shift) => {
  const alph = "abcdefghijklmnopqrstuvwxyz";
  return str
    .split("")
    .map((char) => {
      const letterIndex = alph.indexOf(char);
      if (letterIndex === -1) return char;
      return alph[(letterIndex + shift) % 26];
    })
    .join("");
};

console.log(ceasarCypher("abd", 3));
