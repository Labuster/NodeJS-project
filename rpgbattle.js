const readlineSync = require('readline-sync');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  let nextMonsterTurn;
  let monsterAttacking = true;
  let battlemageAttacking = true;
  let battlemageTurn;

function difficultyLevel()
{
    console.log(`Выбери уровнь сложности: \n 1 - легкий \n 2 - обычный \n 3 - сложный`);
    let difficulty = readlineSync.question();

    if (difficulty == 1)
    {
        battlemage.maxHealth = 30;
        console.log(`Здоровье мага - 30`);
    }

    else if (difficulty == 2)
    {
        battlemage.maxHealth = 20;
        console.log(`Здоровье мага - 20`);
    }

    else if (difficulty == 3)
    {
        battlemage.maxHealth = 10;
        console.log(`Здоровье мага - 10`);
    }
}  

function monsterAttack()
{
    while (monsterAttacking)
    {
        nextMonsterTurn = getRandomIntInclusive(0, 2);
        if (cooldownMonsterAbilities.monsterMoves[nextMonsterTurn].name == monster.moves[nextMonsterTurn].name && cooldownMonsterAbilities.monsterMoves[nextMonsterTurn].cooldown == 0)
        {
            console.log(`Монстр Лютый готовит следующую атаку: ${monster.moves[nextMonsterTurn].name}. Приготовься!`);
            cooldownMonsterAbilities.monsterMoves[nextMonsterTurn].cooldown = monster.moves[nextMonsterTurn].cooldown;
            console.log(`Лютый кидается в атаку!`);
            monsterAttacking = false;
        }
    }
}

function battlemageAttack()
{   
    console.log(`Выбери свою атаку (введи соответствующее число): \n 0 - ${battlemage.moves[0].name}\n 1 - ${battlemage.moves[1].name}\n 2 - ${battlemage.moves[2].name}\n 3 - ${battlemage.moves[3].name}\n`);

    while (battlemageAttacking)
    {
        battlemageTurn = readlineSync.question();
        if (cooldownBattlemageAbilities.battlemageMoves[battlemageTurn].name == battlemage.moves[battlemageTurn].name && cooldownBattlemageAbilities.battlemageMoves[battlemageTurn].cooldown == 0)
        {
            cooldownBattlemageAbilities.battlemageMoves[battlemageTurn].cooldown = battlemage.moves[battlemageTurn].cooldown;
            console.log(`Евстафий нападает на монстра!`);
            battlemageAttacking = false;
        }

        else
        {
            console.log(`Способность перезаряжается, выбери другую.`);
        }
    }
}

function calculateDamage()
{
    let totalMonsterPhysicalDmg = Math.round(monster.moves[nextMonsterTurn].physicalDmg * (100 - battlemage.moves[battlemageTurn].physicArmorPercents) / 100);
    let totalMonsterMagicDmg = Math.round(monster.moves[nextMonsterTurn].magicDmg * (100 - battlemage.moves[battlemageTurn].magicArmorPercents) / 100);

    let totalBattlemagePhysicalDmg = Math.round(battlemage.moves[battlemageTurn].physicalDmg * (100 - monster.moves[nextMonsterTurn].physicArmorPercents) / 100);
    let totalBattlemageMagicDmg = Math.round(battlemage.moves[battlemageTurn].magicDmg * (100 - monster.moves[nextMonsterTurn].magicArmorPercents) / 100);

    monster.maxHealth -= totalBattlemagePhysicalDmg;
    monster.maxHealth -= totalBattlemageMagicDmg;

    battlemage.maxHealth -= totalMonsterPhysicalDmg;
    battlemage.maxHealth -= totalMonsterMagicDmg;

    console.log(`Здоровье Лютого: ${monster.maxHealth}`);
    console.log(`Здоровье Евстафия: ${battlemage.maxHealth}`);
}

function dropCooldowns()
{
    for (let key in cooldownMonsterAbilities.monsterMoves)
    {
        if (cooldownMonsterAbilities.monsterMoves[key].cooldown > 0)
        {
            cooldownMonsterAbilities.monsterMoves[key].cooldown -= 1;
        }
    }

    for (let key in cooldownBattlemageAbilities.battlemageMoves)
    {
        if (cooldownBattlemageAbilities.battlemageMoves[key].cooldown > 0)
        {
            cooldownBattlemageAbilities.battlemageMoves[key].cooldown -= 1;
        }
    }
}

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const battlemage = {
    maxHealth: 20,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

const cooldownMonsterAbilities = {
    monsterMoves: [
        {
            "name": "Удар когтистой лапой",
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "cooldown": 0
        },
        {
            "name": "Удар хвостом",
            "cooldown": 0
        },
    ]
}

const cooldownBattlemageAbilities = {
    battlemageMoves: [
        {
            "name": "Удар боевым кадилом",
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "cooldown": 0
        },
        {
            "name": "Каноничный фаербол",
            "cooldown": 0
        },
        {
            "name": "Магический блок",
            "cooldown": 0
        },
    ]
}

difficultyLevel()

while (monster.maxHealth > 0 && battlemage.maxHealth > 0)
{
    monsterAttack();
    monsterAttacking = true;

    battlemageAttack();
    battlemageAttacking = true;
    
    calculateDamage();
    dropCooldowns();

    if (monster.maxHealth <= 0 && battlemage.maxHealth <= 0)
    {
        console.log(`Взаимное уничтожение. Поздравляем!`); 
    }

    if (monster.maxHealth <= 0 || battlemage.maxHealth <= 0)
    {
        let winner;
        if (monster.maxHealth <= 0)
        {
            winner = battlemage.name;
        }

        else
        {
            winner = monster.name;
        }
        console.log(`Бой закончен, победил: ${winner}. Поздравляем!`);
    }
}