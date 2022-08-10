const amountItem1 = document.getElementById('amount-one');
const currencyItem1 = document.getElementById('currency-one');
const amountItem2 = document.getElementById('amount-two');
const currencyItem2 = document.getElementById('currency-two');
const swapBtn = document.getElementById('swap');
const rateEl = document.getElementById('rate');


function calculate() {
    const currencyName1 = currencyItem1.value;
    const currencyName2 = currencyItem2.value;

    fetch(`https://v6.exchangerate-api.com/v6/c25c03d649342c8aaf1d0230/pair/${currencyName1}/${currencyName2}`)
        .then(res => res.json())
        .then(json => {
            const rate = json.conversion_rate;
            rateEl.textContent = `1 ${currencyName1} = ${rate} ${currencyName2}`;

            amountItem2.value = (rate * amountItem1.value).toFixed(3);
        });

    // Another way
    // fetch(`https://v6.exchangerate-api.com/v6/c25c03d649342c8aaf1d0230/latest/${currency1}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         const rate = data.conversion_rates[currency2];
            
    //         rateEl.textContent = `1 ${currency1} = ${rate} ${currency2}`;

    //         amountItem2.value = (rate * amountItem1.value).toFixed(3);
    //     });
    
}

// Event listeners
amountItem1.addEventListener('input', calculate);
currencyItem1.addEventListener('change', calculate);
amountItem2.addEventListener('input', calculate);
currencyItem2.addEventListener('change', calculate);

swapBtn.addEventListener('click', () => {
    const temp = currencyItem1.value;
    currencyItem1.value = currencyItem2.value;
    currencyItem2.value = temp;
    calculate();
});

calculate();