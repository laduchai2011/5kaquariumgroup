import fs from 'fs';
// import path from 'path';
// const filePath = path.join(__dirname, 'input.txt');

const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const space = " ";
const dot = "."

const lenAlphabet = lowerAlphabet.length

let maxlengthfinal = 0;
const rowArray = []
// tim string max length
function stringmaxlength() {
    const content = fs.readFileSync('input.txt', 'utf8');

    let maxlength = 0;
    let lock = false;
    let row = '';

    for (let i = 0; i < content.length; i++) {
        if (!lock) {
            if (content[i]===dot) {
                if (maxlengthfinal < maxlength) {
                    maxlengthfinal = maxlength
                }
                maxlength = 0;
                lock = true
            } else {
                maxlength = maxlength + 1
            }
        } 
        row = row + content[i]
        if (content[i] === '\n' || content[i] === '\r') {
            lock = false
            rowArray.push(row);
            row = ''
        } 
    }
}
stringmaxlength()

console.log('maxlengthfinal', maxlengthfinal)

// const rowArray_With_Maxlengthfinal = []

// for (let i = 0; i < rowArray.length; i++) {
//     const row = rowArray[i]
//     let newRow = ''
//     for (let j = 0; j < row.length; j++) {
//         // switch(row[j]) {
//         //     case dot:
//         //         for (let m = 0; m < maxlengthfinal; m++) {
//         //             newRow = space
//         //         }
//         //         newRow = space + space + space + space + space
//         //         break;
//         //     case space:
//         //         break;
//         //     default:
//         //         newRow = newRow + row[j]
//         // }
//         if (row[j] === dot) {
//             for (let m = 0; m < maxlengthfinal; m++) {
//                 newRow = space
//             }
//             newRow = space + space + space + space + space
//         } else if(row[j] === space) {
//             // bỏ qua
//         } else {
//             newRow = newRow + row[j]
//         }
//     }
//     rowArray_With_Maxlengthfinal.push(newRow)
// }

// console.log(rowArray_With_Maxlengthfinal)

const rowArrayFinall = []

for (let i = 0; i < lenAlphabet; i++) {
    const upperChar = upperAlphabet[i];
    const lowerChar = lowerAlphabet[i];

    for (let j = 0; j < rowArray.length; j++) {
        const rowCurrent = rowArray[j];
        const firstChart = rowCurrent[0];

        if (firstChart===upperChar || firstChart===lowerChar) {
            rowArrayFinall.push(rowCurrent)
        }
    }
}

try {
    for (let i = 0; i < rowArrayFinall.length; i++) {
        fs.appendFileSync('output.txt', rowArrayFinall[i], 'utf8');
        console.log('Ghi tiếp thành công!');
    }
} catch (err) {
    console.error('Lỗi khi ghi file:', err);
}

// for (let i = 0; i < lenAlphabet; i++) {
//     if (/\r\n|\n|\r/.test(content)) {
//         console.log('Có xuống dòng trong file');
//     } else {
//         console.log('Không có xuống dòng');
//     }
// }