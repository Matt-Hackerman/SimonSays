function makeId() {
    let gridItem = '';

    const char = 'abc';
    const num = Math.floor(Math.random() * 3) + 1;
    const charLen = char.length;

    gridItem += "#";
    gridItem += char.charAt(Math.floor(Math.random() * charLen));
    gridItem += num;
    gridArr.push(gridItem);

    return gridArr;
}
let gridArr = [];
let gridIndex = 0;
let lives = 1;
let count = 0;
let score = 0;
let multi = 1;

makeId();

$('#start').click(function() {
    highLight(gridArr, lives);
    $('.start-btn').css({
        visibility : 'hidden'
    });
});

$('.ss-item').click(function() {
    if ($(this).attr('id') == gridArr[gridIndex].substring(1, 3)) {
        gridIndex++;
        increaseArr(gridIndex, gridArr.length, lives);
        score += (200 * multi);
        $('#score').html(score);
        $('#endScore').html(score);
    }
    else {
        lives = 0;
        $('.end-game').css({
            visibility : 'visible'
        });

        $('.ss-cover').css({
            visibility: 'visible'
        });

        gridArr = [];
        makeId();
    }
});

$('.retry-btn').click(function() {
    lives = 1;
    multi = 1;
    count = 0;
    
    $('.start-btn').css({
        visibility : 'visible'
    });

    $('.end-game').css({
        visibility : 'hidden'
    });

    $('.ss-grid').css({
        transform : 'rotate(0deg)'
    });

    score = 0;
    $('#score').html(score);
    $('#endScore').html(score);
});

function highLight(gridArr, lives) {
    gridIndex = 0;
    if (lives == 0) {
        gridArr = [];
        $('.end-game').css({
            visibility : 'visible'
        })
    }
    else {
        var i = 0;

        function itemLoop() {
            $('.ss-cover').css({
                visibility: 'visible'
            });

            if (gridArr.length <= 7) {
                var highLightTimer = 1500;
                var removeTimer = 500;
            }
            else {
                var highLightTimer = 1000;
                var removeTimer = 250;
                multi = 4;
            }

            setTimeout(function() {
                if (gridArr[i].substring(0, 2) == '#a') {
                    let rowid = 'red';
                    $(gridArr[i]).addClass(rowid);
                    setTimeout(function() {
                        $('.' + rowid).removeClass(rowid);
                    }, removeTimer);
                }
                else if (gridArr[i].substring(0, 2) == '#b') {
                    let rowid = 'green';
                    $(gridArr[i]).addClass(rowid);
                    setTimeout(function() {
                        $('.' + rowid).removeClass(rowid);
                    }, removeTimer);
                }
                else if (gridArr[i].substring(0, 2) == '#c') {
                    let rowid = 'blue';
                    $(gridArr[i]).addClass(rowid);
                    setTimeout(function() {
                        $('.' + rowid).removeClass(rowid);
                    }, removeTimer);
                }
                i++;
                if (i >= gridArr.length && gridArr.length > 7) {
                    count++;
                    setTimeout(function(){
                        $('.ss-grid').css({
                            transform : 'rotate(' + 90 * count + 'deg)',
                            transition : '300ms'
                        });
                    }, 250);
                }
                if (i < gridArr.length) {
                    itemLoop();
                }
                else {
                    setTimeout(function(){
                        $('.ss-cover').css({
                            visibility: 'hidden'
                        });
                    }, 500);
                }
            }, highLightTimer);
        }

        itemLoop();
    }
}

function increaseArr(i, arr, lives) {
    if (i == arr) {
        makeId();
        highLight(gridArr, lives);
    }
}
