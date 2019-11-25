/* eslint-disable no-await-in-loop */
const CLI = require('clui');
const clc = require('cli-color');
const readline = require('readline');

const { Line } = CLI;
const { LineBuffer } = CLI;

const outputBuffer = new LineBuffer({
    x: 0,
    y: 0,
    width: 'console',
    height: 'console',
});

function getMove() {
    return new Promise((resolve, reject) => {
        const newRead = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        newRead.question(
            `What newMove would you like to make? ('x' vs 'o')`,
            move => {
                console.log(`newMove chosen ${move}!`);
                console.log('move!', move);
                resolve(move);
                newRead.close();
            }
        );
    });
}

function getIndices() {
    return new Promise((resolve, reject) => {
        const newRead = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        newRead.question(
            `Where would you like to make your move? (Input 0-based indices with no delimiter. Ex: 01 for top middle square)`,
            response => {
                const move = [0, 0];
                console.log(`newMove chosen ${move}!`);
                move[0] = parseInt(response[0], 10);
                move[1] = parseInt(response[1], 10);
                resolve(move);
                newRead.close();
            }
        );
    });
}

const isWinner = plays => {
    for (let i = 0; i < plays.length; i += 1) {
        if (
            plays[i][0] !== '   ' &&
            plays[i][0] === plays[i][1] &&
            plays[i][1] === plays[i][2]
        ) {
            return true;
        }
        if (
            plays[0][i] !== '   ' &&
            plays[0][i] === plays[1][i] &&
            plays[1][1] === plays[2][i]
        ) {
            return true;
        }
    }
    if (
        plays[0][0] !== '   ' &&
        plays[0][0] === plays[1][1] &&
        plays[1][1] === plays[2][2]
    ) {
        return true;
    }
    if (
        plays[0][2] !== '   ' &&
        plays[0][2] === plays[1][1] &&
        plays[1][1] === plays[2][0]
    ) {
        return true;
    }
    return false;
};

async function playGame() {
    // define user's plays
    const plays = [
        ['   ', '   ', '   '],
        ['   ', '   ', '   '],
        ['   ', '   ', '   '],
    ];

    // monitor win status
    let isWon = isWinner(plays);

    while (!isWon) {
        // write header
        new Line(outputBuffer)
            .column('Tick Tac Toe', 20, [clc.cyan])
            .fill()
            .store();

        new Line(outputBuffer)
            .column('\n', 20, [clc.cyan])
            .fill()
            .store();

        new Line(outputBuffer)
            .column(plays[0][0])
            .column('|')
            .column(plays[0][1])
            .column('|')
            .column(plays[0][2])
            .fill()
            .store();

        new Line(outputBuffer)
            .column(' - ')
            .column('+')
            .column(' - ')
            .column('+')
            .column(' - ')
            .fill()
            .store();

        new Line(outputBuffer)
            .column(plays[1][0])
            .column('|')
            .column(plays[1][1])
            .column('|')
            .column(plays[1][2])
            .fill()
            .store();

        new Line(outputBuffer)
            .column(' - ')
            .column('+')
            .column(' - ')
            .column('+')
            .column(' - ')
            .fill()
            .store();

        new Line(outputBuffer)
            .column(plays[2][0])
            .column('|')
            .column(plays[2][1])
            .column('|')
            .column(plays[2][2])
            .fill()
            .store();

        new Line(outputBuffer)
            .column('\n')
            .fill()
            .store();

        outputBuffer.output();

        const move = await getMove();

        const moveIndices = await getIndices();

        plays[moveIndices[0]][moveIndices[1]] = ` ${move} `;

        isWon = isWinner(plays);

        if (isWon) {
            new Line(outputBuffer)
                .column('\nGame Over!!')
                .fill()
                .store();
        }
    }
}

playGame();
