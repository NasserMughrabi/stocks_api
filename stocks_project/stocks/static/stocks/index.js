document.addEventListener('DOMContentLoaded', function () {

    // const defaultInterval = setInterval(fetchStockData, 500);
    document.querySelector('form').onsubmit = function() {
        
        // clearInterval(defaultInterval);
        // setInterval(fetchStockData, 500);
        return false;
        
    }
});

function fetchStockData(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
            'X-RapidAPI-Key': 'b55775101cmshf7a0fdee78a5340p11b6b4jsnc627709db9a2'
        }
    };

    let stock = document.querySelector('#stock').value;
    if(stock){
        stock = stock.toUpperCase();
    }else {
        stock = 'AMD';
    }


    fetch(`https://realstonks.p.rapidapi.com/${stock}`, options)
        .then(response => response.json())
        .then(data => {
            // call this function every two seconds
            display_stock_data(data, stock);
        })
        .catch(err => console.error(err));

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
    if(current_stock_color === '#08F6B5'){ // if color is green
        plus = '+';
    }

    document.querySelector('#stock-ticker').innerHTML = stockName;
    document.querySelector('#price-div').innerHTML = price;
    document.querySelector('#perc-div').innerHTML = plus + change_percentage + '%';
    document.querySelector('#points-div').innerHTML = plus + change_point;
    document.querySelector('#stock-fullname').innerHTML = stockName;
    document.querySelector('#stock-ETF').innerHTML = 'NASDAQ';
    document.querySelector('#stock-name').innerHTML = (stockName);
    
    document.querySelector('#price-div').style.color = current_stock_color;
    document.querySelector('#perc-div').style.color = current_stock_color;
    document.querySelector('#points-div').style.color = current_stock_color;
}


function decide_color(dataAttribute){
    if(dataAttribute > 0){
        return '#08F6B5';
    } else if (dataAttribute === 0){
        return 'white';
    }else {
        return '#FF506A'
    }
}