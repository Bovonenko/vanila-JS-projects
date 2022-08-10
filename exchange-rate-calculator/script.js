window.addEventListener('DOMContentLoaded', () => {
    const amountItem1 = document.getElementById('amount-one');
    const currencyItem1 = document.getElementById('currency-one');
    const amountItem2 = document.getElementById('amount-two');
    const currencyItem2 = document.getElementById('currency-two');
    const swapBtn = document.getElementById('swap');
    const rateEl = document.getElementById('rate');
    
    // Fetch request function
    async function request(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    
    // Render currencies on the page
    function renderCurr(dataArr, target, defaultCurr) {
        dataArr.forEach(item => {
            const option = document.createElement('option');
                option.setAttribute('value', item);
                if(item === defaultCurr) {
                    option.setAttribute('selected', true);
                }
                option.textContent = item;
                target.append(option);
        });
    }
    // Takes data from JSON database
    function getDataFromJSON() {
        request('http://localhost:3000/currencies')
            .then(data => {
                renderCurr(data[0], currencyItem1, 'USD');
                renderCurr(data[0], currencyItem2, 'EUR');            
            })
            .then(calculate)
            .catch(err => console.error(err));
    }
    getDataFromJSON();
    
    // 
    function calculate() {
        const currencyName1 = currencyItem1.value;
        const currencyName2 = currencyItem2.value;
        console.log(currencyName2);
    
        request(`https://v6.exchangerate-api.com/v6/c25c03d649342c8aaf1d0230/pair/${currencyName1}/${currencyName2}`)
            .then(json => {
                const rate = json.conversion_rate;
                rateEl.textContent = `1 ${currencyName1} = ${rate} ${currencyName2}`;
    
                amountItem2.value = (rate * amountItem1.value).toFixed(3);
            });
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
});