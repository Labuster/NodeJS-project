
const readlineSync = require('readline-sync');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let numberOfTries = 5;
let correctDigitsPosition = 0;
let incorrectDigitsPosition = 0;
let correctDigits = [];
let incorrectDigits = [];

let machineNumber = String(getRandomIntInclusive(100, 99999)); // computer generating a number

function compareNumbers(machineNumber, userGuess)
{
  for (let i = 0; i < userGuess.length; i++)
  {
    if (machineNumber[i] == userGuess[i])
    {
      correctDigitsPosition++;
      correctDigits.push(userGuess[i]);
    }

    else if (machineNumber.includes(userGuess[i]))
    {
      incorrectDigitsPosition++;

      for (let char of machineNumber)
      {
        if (char == userGuess[i] && incorrectDigits.indexOf(char) == -1)
        {
          incorrectDigits.push(userGuess[i]);
        }
      }
    }
  }
}

while (numberOfTries != 0)
{
  let userGuess = readlineSync.question('Guess a number: ');

  compareNumbers(machineNumber, userGuess);
  console.log(`Количество совпавших чисел: ${correctDigitsPosition} (${correctDigits})`);
  console.log(`Количество совпавших чисел не на своих местах: ${incorrectDigitsPosition} (${incorrectDigits})`);
  numberOfTries--;
  correctDigits.length = 0;
  incorrectDigits.length = 0;
  correctDigitsPosition = 0;
  incorrectDigitsPosition = 0;

  if (userGuess == machineNumber)
  {
    console.log(`Вы отгадали число, поздравляем!`);
    break;
  }

}

console.log(`Игра окончена. Компьютер загадал такое число: ${machineNumber}`);