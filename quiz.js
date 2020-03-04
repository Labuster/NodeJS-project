const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

let uniqQuestions = [];
let folderPath = 'QuizQuestions';
let correctAnswers = 0;

let questions = [];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function selectRandomQuestion()
{
    for (let i = 0; i <= 4; i++)
    {
        let randomQuestion = String(getRandomIntInclusive(0, 9) + '.txt');
        if (uniqQuestions.indexOf(randomQuestion) == -1)
        {
            uniqQuestions.push(randomQuestion);
        }

        else
        {
            i--;
        }
    }
}
 
function readandAskQuestions()
{
    let listOfQuestions = fs.readdirSync(folderPath);
    for (let i = 0; i <= uniqQuestions.length; i++)
    {
        if (listOfQuestions.includes(uniqQuestions[i]))
        {
            let pathToFile = path.normalize(uniqQuestions[i]);
            let file = fs.readFileSync(folderPath + '\\' + pathToFile, 'utf8');
            questions = file.split('\n');
            askQuestion();
            verifyAnswer();
        }
    }
}

function askQuestion()
{
    for(let key of questions)
    {
        if (key != questions[1])
        {
            console.log(key);
        }
    }
}

function verifyAnswer()
{
    console.log('\nВведите номер ответа, где 1 - первый вариант, а 4 - последний: ');
    let userGuess = readlineSync.question();

    if (userGuess == questions[1])
    {
        correctAnswers++;
        console.log(`Ответ верный, поздравляем!\n`);
    }

    else
    {
        console.log(`Увы, ответ неверный. Верный - ${questions[1]}\n`);
    }
}

selectRandomQuestion()
readandAskQuestions();

console.log(`Игра окончена. Количество верных ответов: ${correctAnswers}`);



