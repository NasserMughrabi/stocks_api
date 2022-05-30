document.addEventListener('DOMContentLoaded', function () {


    document.querySelector('form').onsubmit = function () {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
                'X-RapidAPI-Key': 'b55775101cmshf7a0fdee78a5340p11b6b4jsnc627709db9a2'
            }
        };

        let stock = document.querySelector('#stock').value.toUpperCase();
        fetch(`https://realstonks.p.rapidapi.com/${stock}`, options)
            .then(response => response.json())
            .then(data => {
                display_stock_data(data);
            })
            .catch(err => console.error(err));


        // // url for the entered stock by the user
        // let stock = document.querySelector('#stock').value.toUpperCase();
        // const stocks_api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=IZMH0GAQS0RALJ7B`;


        // fetch(stocks_api)
        //     .then(response => response.json())
        //     .then(data => {
        //         display_stock_data(data);
        //     })
        //     .catch(
        //         error => {
        //         console.log('Error:', error)
        //     });
        return false;
    }
});


function display_stock_data(stockData){
    console.log(stockData);

    const price = stockData.price;
    console.log(price);
    const change_percentage = stockData.change_percentage;
    console.log(change_percentage);
    const change_point = stockData.change_point;
    console.log(change_point);
    const total_vol = stockData.total_vol;
    console.log(total_vol);

    const dataDiv = document.createElement('div');
    dataDiv.innerHTMl = `
    <div>Current Price: ${price}</div>
    <div>Change Percentage: ${change_percentage}%</div>
    <div>Change Point: ${change_point}</div>
    <div>Total Volume: ${total_vol}</div>
    `;

    document.querySelector('#result').innerHTML = dataDiv.innerHTMl ;
}