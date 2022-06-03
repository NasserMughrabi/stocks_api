var submit = null;

document.addEventListener('DOMContentLoaded', function () {

    fetchStockData('AAPL');
    fetchPopStocks();
    document.querySelector('#AAPL').addEventListener('click', ()=> fetchStockData('AAPL'));
    document.querySelector('#TSLA').addEventListener('click', ()=>  fetchStockData('TSLA'));
    document.querySelector('#AMZN').addEventListener('click',  ()=> fetchStockData('AMZN'));
    document.querySelector('#AMD').addEventListener('click', ()=> fetchStockData('AMD'));
    document.querySelector('#NVDA').addEventListener('click', ()=> fetchStockData('NVDA'));

    // setInterval(fetchPopStocks, 500);
    // const defaultInterval = setInterval(fetchStockData, 500);
    document.querySelector('form').onsubmit = function() {
        
        // clearInterval(defaultInterval);
        // if(submit){
        //     console.log('here');
        //     clearInterval(submit);
        // }
        // setTimeout(function(){}, 500);
        let stock = document.querySelector('#stock').value;
        if(stock){
            stock = stock.toUpperCase();
        }else {
            stock = 'AAPL';
        }
        // while(true){
        fetchStockData(stock);
        // }
        // submit = setInterval(function(){fetchStockData(stock);}, 500);
        // clearInterval(submit);
        return false;
    }
});

function fetchStockData(stock){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
            'X-RapidAPI-Key': 'b55775101cmshf7a0fdee78a5340p11b6b4jsnc627709db9a2'
        }
    };


    fetch(`https://realstonks.p.rapidapi.com/${stock}`, options)
        .then(response => response.json())
        .then(data => {
            // call this function every two seconds
            display_stock_data(data, stock);
        })
        .catch(err => alert('Invalid stock ticker'));

    return false;
}


function display_stock_data(stockData, stockName){
    
    const price = stockData.price.toFixed(2);
    const change_percentage = stockData.change_percentage;
    const change_point = stockData.change_point;
    const total_vol = stockData.total_vol;

    const current_stock_color = decide_color(change_point);
    // if the color is green, add plus to the start of the percentage and point numbers
    let plus = '';
    if(current_stock_color === '#11DF44'){ // if color is green
        plus = '+';
    }

    document.querySelector('#name-ticker').innerHTML = stockName;
    document.querySelector('#price').innerHTML = price;
    document.querySelector('#percentage').innerHTML = plus + change_percentage + '%';
    document.querySelector('#points').innerHTML = plus + change_point;
    document.querySelector('#stock-name-div').innerHTML = stockName;
    
    document.querySelector('#price').style.color = current_stock_color;
    document.querySelector('#percentage').style.color = current_stock_color;
    document.querySelector('#points').style.color = current_stock_color;
}

function fetchPopStocks(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
            'X-RapidAPI-Key': 'b55775101cmshf7a0fdee78a5340p11b6b4jsnc627709db9a2'
        }
    };

    var popStocks = new Array('AAPL', 'TSLA', 'AMZN', 'AMD', 'NVDA');
    popStocks.forEach( popStock => {
        fetch(`https://realstonks.p.rapidapi.com/${popStock}`, options)
        .then(response => response.json())
        .then(data => {
            // call this function every two seconds
            display_pop_stocks(data, popStock);
        })
        .catch(err => alert('Invalid stock ticker'));//console.error(err)

        return false;
    });
    
}

function display_pop_stocks(stockData, stockName){

    const price = stockData.price.toFixed(2);
    const change_percentage = stockData.change_percentage;
    const change_point = stockData.change_point;
    const total_vol = stockData.total_vol;

    const current_stock_color = decide_color(change_point);
    // if the color is green, add plus to the start of the percentage and point numbers
    let plus = '';
    if(current_stock_color === '#11DF44'){ // if color is green
        plus = '+';
    }

    document.querySelector(`#${stockName}-price`).innerHTML = price;
    document.querySelector(`#${stockName}-perc`).innerHTML = plus + change_percentage + '%';
    document.querySelector(`#${stockName}-points`).innerHTML = plus + change_point;
}

function decide_color(dataAttribute){
    if(dataAttribute > 0){
        return '#11DF44';
    } else if (dataAttribute === 0){
        return 'white';
    }else {
        return '#FF506A'
    }
}