"use strict";

$(document).ready(function(){
    
    
    /* basic layout - start */

    function layout() {
        // build basic layout
        const main = $('div');
        for (let i = 0; i < 15; i++) {
            let row = $('<div>', {'class': 'row'});
            main.append(row);
            for (let j = 0; j < 15; j++) {
                let col = $('<div>', {'class': 'col'});
                row.append(col);
            }
        }
        setSize(); 
        onClick(main)
    }

    function setColSize(el, val) {
        // set cell size - abstract
        el.width(val / 20);
        el.height(val / 20);
        el.css({'font-size': val / 25})
    }
    
    function setSize() {
        // set cell size - depending on window width and height  
        const windowWidth = $(window).width(),
            windowHeight = $(window).height();

        windowWidth >= windowHeight ? setColSize($('.col'), windowHeight) : setColSize($('.col'), windowWidth)
    }

    layout();

    $(window).on('resize', function() {
        setSize()
    });
 
    
    
    /* basic functionality - start */
    
    function onClick(parent) {
        // add event click to every cell
        let counter = 0; 
        parent.on('click', '.col', function() {
            if (!($(this).data('status'))) {
                if (counter % 2 == 0) {
                    var toAdd = $('<i>', {'class': 'fas fa-circle my'});
                    $(this).data('status', '1')
                } else {
                    var toAdd = $('<i>', {'class': 'fas fa-times my'});
                    $(this).data('status', '2')
                }
                $(this).append(toAdd);
                counter ++
                
                if (counter > 8) {
                    return checkIfWinner(0, -4, 0, 1, 0) // horizontally
                    || checkIfWinner(0, 0, -4, 0, 1) // vertically
                    || checkIfWinner(0, -4, -4, 1, 1) // across right
                    || checkIfWinner(4, -4, 0, 1, -1) // across left
                }
            }
        })
    }
    
    function checkIfWinner(start, row, col, down, right) {
        const rows = $('.row');
        for (let i = 0; i < rows.length + row; i++) {
            for (let j = start; j < rows.eq(i).children().length + col; j++) {
                let result = []
                for (let k = 0; k < 5; k++) {
                    result[k] = rows.eq(i + down*k).children().eq(j + right*k).data('status')
                }
                
                if (testIfSame(result)) {
                    for (let k = 0; k < 5; k++) {
                        rows.eq(i + down*k).children().eq(j + right*k).data('status', '3')
                        rows.eq(i + down*k).children().eq(j + right*k).css('background-color', 'yellow')
                    }
                    (result[0] == '1') ? addOne(0) : addOne(1)
                    return true;
                } 
            }
        }
    }
    
    
    function testIfSame(arr) {
        // test on result if all elements have same status - not undefined, not 3
        const testIfNot = arr.every(function(element) {
                    return element != undefined && element != '3'
        })
        if (testIfNot) {
            const testIfAllOne = arr.every(function(element) {
                return element == '1'
            })
            const testIfAllTwo = arr.every(function(element) {
                return element == '2'
            })
            return testIfAllOne || testIfAllTwo
        }                
    }
    
    function addOne(index) {
        const counter = $('td').eq(index).text();
        $('td').eq(index).text(parseInt(counter, 10) + 1)
    }
    
});