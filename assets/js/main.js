var loadingOverlay = document.querySelector(".loading");

// Funcion para agregar puntos a los valores
function numeroConPuntos(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Cotizacion dolar
if (
  !localStorage.getItem("dolar") ||
  localStorage.getItem("date") !=
    new Date().toLocaleDateString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    })
) {
  fetch("https://mercados.ambito.com//dolar/oficial/variacion")
    .then((res) => res.json())
    .then((data) => {
      loadingOverlay.classList.add("hidden");
      dolar = data.venta;
      localStorage.setItem("dolar", dolar);
      localStorage.setItem(
        "date",
        new Date().toLocaleDateString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
        })
      );
    });
} else {
  loadingOverlay.classList.add("hidden");
}

// Funcion para cambiar el tipo de moneda

function setPrice() {
  const prices = document.querySelectorAll(".price");
  let dolar = localStorage.getItem("dolar");
  prices.forEach((price) => {
    let pesoVal = Number(
      price.innerText.replace("$ ", "").replace(".", "").replace(",", ".")
    );
    let dolarVal = Number(dolar.replace(",", "."));
    let total = `${numeroConPuntos(
      (pesoVal / dolarVal).toFixed(2).replace(".", ",")
    )}`;
    tippy(price, {
      content: `Precio Dólar: $${total}`,
    });
    
    price.onclick = function(event) {
      event.preventDefault();
    };
  });
}

// Cosas que iniciamos con el sitio
setPrice();

// Funcion para mostrar y ocultar el menu
function mostrarNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
