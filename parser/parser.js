window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    let textNodes = [];

    function recursy (element) {
        element.childNodes.forEach(node => {
            if (node.nodeName.match(/OPTION/)) {
                textNodes.push(node.textContent);
            } else {
                recursy(node);
            }
        });
    }
    recursy(body);
    const arr = [...new Set(textNodes)];
    fetch('http://localhost:3000/currencies', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(arr)
    })
    .then(res => res.json())
    .then(data => console.log(data));
});