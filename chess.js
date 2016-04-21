var N = parseInt(process.argv[2]) || 8;
var variantsNeeded = parseInt(process.argv[3]) || null;
var diag1 = [];
var diag2 = [];
var free = [];
var variants = 0;
var startTime = new Date;

for(var i = 0; i < (N*2-1); i++) {
    diag1[i] = true;
    diag2[i] = true;
}

for (var i = 0; i < N; i++) {
    free[i] = true;
}

function checkDiag(x, y) {
    return diag1[(x+y)] && diag2[(x-y)+(N-1)];
}

function checkLines(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = i+1; j < len; j++) {
            for (var k = j+1; k < len; k++) {
                if ((i-j)*(arr[j]-arr[k]) === (j-k)*(arr[i]-arr[j])) {
                    return false;
                }
            }
        }
    }

    return true;
}

function setDiag(x, y, flag) {
    diag1[(x+y)] = flag;
    diag2[(x-y)+(N-1)] = flag;
}

function printChess(chess) {
    for (var i = 0, len = chess.length; i < len; i++) {
        var printStr = (i<10? '   ': (i<100? '  ':(i<1000? ' ': ''))) + i + ':';
        for (var j = 0; j < len; j++) {
            printStr += ' ' + (chess[i] === j? 'Q' : '_' );
        }
        console.log(printStr);
    }
    console.log('----------------------------------------');
}

function init(arr, N, deep, free) {
    if (deep === N && checkLines(arr)) {
        printChess(arr);
        variants++;
        if (variantsNeeded && variantsNeeded === variants) {
            console.log('Limited variants: ' + variants + ', execution time: ' + (new Date - startTime) + 'ms');
            process.exit();
        }
        return;
    }
    for(var i = 0; i < N; i++) {
        if (checkDiag(deep, i) && free[i]) {
            arr.push(i);
            free[i] = false;
            setDiag(deep, i, false);
            init(arr, N, deep+1, free);
            free[i] = true;
            setDiag(deep, i, true);
            arr.pop();
        }
    }
}

init([], N, 0, free);
console.log('Total number of possible variants: ' + variants + ', execution time: ' + (new Date - startTime) + 'ms');