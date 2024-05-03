var loadingOverlay = document.querySelector('.loading');

// Funcion para agregar puntos a los valores
function numeroConPuntos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Cotizacion dolar
if(!localStorage.getItem('dolar') || localStorage.getItem('date') != new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })) {
    fetch('https://mercados.ambito.com//dolar/oficial/variacion').then(res => res.json()).then(data => {
        loadingOverlay.classList.add('hidden');
        dolar = data.venta
        localStorage.setItem('dolar', dolar);
        localStorage.setItem('date', new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }));
    })
} else {
    loadingOverlay.classList.add('hidden');
}

// Funcion para cambiar el tipo de moneda

function setPrice(type) {
    const prices = document.querySelectorAll('.price');
    let dolar = localStorage.getItem('dolar');
    let priceType = localStorage.getItem('priceType');
    if((priceType == 'dolar' && !type) || type == 'dolar') {
        let dolarIcon = document.getElementById('dolar');
        let pesoIcon = document.getElementById('peso');
        pesoIcon.classList.add('hidden');
        dolarIcon.classList.remove('hidden');
        prices.forEach(price => {
            let pesoVal = Number(price.innerText.replace('$ ', '').replace('.', '').replace(',', '.'));
            let dolarVal = Number(dolar.replace(',', '.'));

            price.innerText = `$ ${numeroConPuntos((pesoVal / dolarVal).toFixed(2).replace('.', ','))}`; // set price to dolar
            price.classList.add('dolar');
            if(priceType != 'dolar') localStorage.setItem('priceType', 'dolar');
        });
    } else if ((priceType == 'peso' && !type) || type == 'peso') {
        let pesoIcon = document.getElementById('peso');
        let dolarIcon = document.getElementById('dolar');
        pesoIcon.classList.remove('hidden');
        dolarIcon.classList.add('hidden');
        prices.forEach(price => {
            let dolarVal = Number(dolar.replace(',', '.'));
            let pesoValRe = Number(price.innerText.replace('$ ', '').replace(',', '.'));
            price.innerText = `$ ${numeroConPuntos((pesoValRe * dolarVal).toFixed(2).replace('.', ','))}`;
            price.classList.remove('dolar');
            if(priceType != 'peso') localStorage.setItem('priceType', 'peso');
        });
    }
}

// Cosas que iniciamos con el sitio
setPrice();
if(!localStorage.getItem('priceType')) localStorage.setItem('priceType', 'peso');

// Funcion para mostrar y ocultar el menu
function mostrarNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}