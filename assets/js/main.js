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
  if(loadingOverlay) {
    loadingOverlay.classList.add("hidden");
  }
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

    price.onclick = function (event) {
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

// FORMULARIO

// Funcion para habilitar las ciudades
document.addEventListener('DOMContentLoaded', function () {
  const provinciaSelect = document.getElementById('provincia');
  const ciudadSelect = document.getElementById('ciudad');

  const ciudad = {
    buenos_aires: [
      "Adolfo Gonzales Chaves", "Adrogué", "Alberti", "Alejandro Korn", "América", "Arrecifes",
      "Avellaneda", "Ayacucho", "Azul", "Bahía Blanca", "Balcarce", "Banfield", "Baradero", "Batán",
      "Béccar", "Bella Vista", "Benavídez", "Benito Juárez", "Berazategui", "Bernal", "Bolívar", "Bosques",
      "Boulogne Sur Mer", "Bragado", "Brandsen", "Burzaco", "Campana", "Cañuelas", "Capilla del Señor",
      "Capitán Sarmiento", "Carhué", "Carlos Casares", "Carlos Spegazzini", "Carlos Tejedor", "Carmen de Areco",
      "Carmen de Patagones", "Casbas", "Caseros", "Castelar", "Castelli", "Chacabuco", "Chivilcoy", "Claypole",
      "Colón", "Comandante Nicanor Otamendi", "Coronel Dorrego", "Coronel Pringles", "Coronel Suárez",
      "Coronel Vidal", "Daireaux", "Dock Sud", "Dolores", "Don Torcuato", "Eduardo O'Brien", "El Jagüel",
      "El Palomar", "El Talar", "Ezeiza", "Ezpeleta", "Florencio Varela", "Florentino Ameghino", "Francisco Álvarez",
      "Garín", "General Alvear", "General Arenales", "General Belgrano", "General Conesa", "General Daniel Cerri",
      "General Guido", "General Juan Madariaga", "General Las Heras", "General Lavalle", "General Pacheco",
      "General Pinto", "General Rodríguez", "General Villegas", "Gerli", "Glew", "González Catán",
      "Gregorio de Laferrere", "Guaminí", "Guernica", "Haedo", "Henderson", "Hudson", "Hurlingham",
      "Ingeniero Budge", "Ingeniero Maschwitz", "Isidro Casanova", "Ituzaingó", "José C. Paz", "Junín", "La Emilia",
      "La Plata", "La Tablada", "La Unión", "Lanús", "Laprida", "Las Flores", "Lezama", "Libertad", "Lima", "Lincoln",
      "Llavallol", "Lobería", "Lobos", "Lomas de Zamora", "Lomas del Mirador", "Longchamps", "Los Polvorines",
      "Los Toldos", "Luis Guillón", "Luján", "Magdalena", "Maipú", "Mar de Ajó", "Mar del Plata", "Mar del Tuyú",
      "Marcos Paz", "Mariano Acosta", "Martínez", "Médanos", "Mercedes", "Merlo", "Miramar", "Monte",
      "Monte Chingolo", "Monte Grande", "Monte Hermoso", "Navarro", "Necochea", "Nueve de Julio", "Olavarría",
      "Paso del Rey", "Pehuajó", "Pellegrini", "Pergamino", "Pila", "Pilar", "Pinamar", "Pontevedra",
      "Presidente Derqui", "Puan", "Punta Alta", "Quilmes", "Rafael Calzada", "Rafael Castillo", "Ramallo",
      "Ramos Mejía", "Ranchos", "Rauch", "Rawson", "Remedios de Escalada", "Rojas", "Roque Pérez", "Saavedra",
      "Saladillo", "Salto", "San Andrés de Giles", "San Antonio de Areco", "San Antonio de Padua", "San Cayetano",
      "San Fernando", "San Francisco Solano", "San Isidro", "San Justo", "San Martín", "San Nicolás de los Arroyos",
      "San Pedro", "San Vicente", "Santa María", "Sarandí", "Suipacha", "Tandil", "Tapalqué", "Temperley", "Tigre",
      "Tornquist", "Treinta de Agosto", "Trenque Lauquen", "Tres Arroyos", "Tres Lomas", "Tristán Suárez", "Turdera",
      "Valentín Alsina", "Vedia", "Veinticinco de Mayo", "Vicente López", "Villa Ballester", "Villa Elisa", "Villa Fiorito", "Villa Luzuriaga",
      "Villa Madero", "Villa Ramallo", "Villa Tesei", "Wilde", "Zárate"],
    caba: [
      "Retiro", "San Nicolás", "Puerto Madero", "San Telmo", "Montserrat", "Constitución", "Recoleta", "Balvanera",
      "San Cristóbal", "La Boca", "Barracas", "Parque Patricios", "Nueva Pompeya", "Almagro", "Boedo", "Caballito",
      "Flores", "Parque Chacabuco", "Villa Soldati", "Villa Riachuelo", "Villa Lugano", "Liniers", "Mataderos",
      "Parque Avellaneda", "Villa Real", "Monte Castro", "Versalles", "Floresta", "Vélez Sarfield", "Villa Luro",
      "Villa General Mitre", "Villa Devoto", "Villa del Parque", "Villa Santa Rita", "Coghlan", "Saavedra", "Villa Urquiza",
      "Villa Pueyrredón", "Núñez", "Belgrano", "Colegiales", "Palermo", "Chacarita", "Villa Crespo", "La Paternal",
      "Villa Ortúzar", "Agronomía", "Parque Chas"],
    catamarca: [
      "Adolfo E. Carranza", "Alijilán", "Amadores", "Amanao", "Ancasti", "Andalgalá",
      "Andalhualá", "Anillaco", "Anquincila", "Antinaco", "Antofagasta de la Sierra",
      "Antofalla", "Apoyaco", "Balde de la Punta", "Bañado de Ovanta", "Banda de Lucero",
      "Barranca Larga", "Belén", "Capayán", "Casa de Piedra", "Caspichango",
      "Catamarca (San Fernando del Valle de Catamarca)", "Cerro Negro", "Chañar Punco",
      "Chaquiago", "Choya", "Chuchucaruana", "Chumbicha", "Colana", "Collagasta",
      "Colonia del Valle", "Colonia Nueva Coneta", "Colpes", "Concepción", "Cóndor Huasi",
      "Coneta", "Copacabana", "Cordobita", "Corral Quemado", "Costa de Reyes", "El Alamito",
      "El Alto", "El Aybal", "El Bañado", "El Bolsón", "El Cajón", "El Desmonte", "El Divisadero",
      "El Durazno", "El Lindero", "El Pajonal (Est. Pomán)", "El Pantanillo", "El Peñón",
      "El Portezuelo", "El Potrero", "El Pueblito", "El Quimilo", "El Rodeo", "El Rosario",
      "El Salado", "Esquiú", "Famatanca", "Farallón Negro", "Fiambalá", "Fuerte Quemado",
      "Guayamba", "Hualfín", "Huaycama", "Huillapima", "Icaño", "Infanzón", "Jacipunco",
      "Joyango", "La Aguada", "La Bajada", "La Candelaria", "La Dorada", "La Guardia",
      "La Higuera", "La Hoyada", "La Loma", "La Majada", "La Merced", "La Puerta", "La Puntilla",
      "Las Cañas", "Las Chacritas", "Las Esquinas", "Las Juntas", "Las Lajas", "Las Mojarras",
      "Las Palmitas", "Las Tejas", "Lavalle", "La Viña", "Londres", "Loro Huasi", "Los Altos",
      "Los Ángeles", "Los Balverdis", "Los Castillos", "Los Corrales", "Los Nacimientos",
      "Los Talas", "Los Varela", "Manantiales", "Medanitos", "Miraflores", "Monte Potrero",
      "Mutquín", "Palo Blanco", "Palo Labrado", "Pomán", "Pomancillo Este", "Pomancillo Oeste",
      "Puerta de Corral Quemado", "Puerta de San José", "Punta de Balasto", "Punta del Agua",
      "Quirós", "Ramblones", "Recreo", "Rincón", "San Antonio", "San Isidro", "San José",
      "San Martín", "San Miguel", "San Pablo", "San Pedro", "Santa Cruz", "Santa María",
      "Saujil", "Siján", "Singuil", "Tapso", "Tatón", "Tinogasta", "Vilismán", "Villa de Balcozna",
      "Villa Las Pirquitas", "Villa Vil", "Yapes"],
    chaco: [
      "Avia Terai", "Barranqueras", "Barrio de los Pescadores", "Basail", "Campo Largo", "Capitán Solari",
      "Charadai", "Charata", "Chorotis", "Ciervo Petiso", "Colonia Aborigen", "Colonia Baranda",
      "Colonia Benítez", "Colonia Elisa", "Colonia Popular", "Colonias Unidas", "Concepción del Bermejo",
      "Coronel Du Graty", "Corzuela", "Cote Lai", "El Espinillo", "El Sauzal", "El Sauzalito",
      "Enrique Urién", "Estación General Obligado", "Fontana", "Fortín Las Chuñas", "Fortín Lavalle",
      "Fuerte Esperanza", "Gancedo", "General Capdevila", "General José de San Martín", "General Pinedo",
      "General Vedia", "Haumonía", "Hermoso Campo", "Horquilla", "Ingeniero Barbet", "Isla del Cerrito",
      "Itín", "Juan José Castelli", "La Clotilde", "La Eduvigis", "La Escondida", "Laguna Blanca",
      "Laguna Limpia", "La Leonesa", "Lapachito", "La Sabana", "Las Breñas", "Las Garcitas", "Las Palmas",
      "La Tigra", "La Verde", "Los Frentones", "Machagai", "Makallé", "Margarita Belén", "Mesón de Fierro",
      "Miraflores", "Napalpí", "Napenay", "Nueva Pompeya", "Pampa Almirón", "Pampa del Indio",
      "Pampa del Infierno", "Pampa Landriel", "Presidencia de la Plaza", "Presidencia Roca",
      "Presidencia Roque Sáenz Peña", "Puerto Bermejo Nuevo", "Puerto Bermejo Viejo", "Puerto Eva Perón",
      "Puerto Tirol", "Puerto Vilelas", "Quitilipi", "Resistencia", "Río Muerto", "Samuhú", "San Bernardo",
      "Santa Sylvina", "Selvas del Río de Oro", "Taco Pozo", "Tres Isletas", "Venados Grandes", "Villa Ángela",
      "Villa Berthet", "Villa El Palmar", "Villa Río Bermejito", "Wichí", "Zaparinqui"],
    chubut: [
      "28 de Julio", "Aldea Apeleg", "Aldea Beleiro", "Aldea Epulef", "Aldea Escolar (Losrápidos)",
      "Alto Río Senguer", "Arroyo Verde", "Astra", "Bahía Bustamante", "Blancuntre",
      "Buenos Aires Chico", "Buen Pasto", "Camarones", "Carrenleufú", "Cerro Cóndor",
      "Cholila", "Colan Conhué", "Comodoro Rivadavia", "Corcovado", "Costa del Chubut",
      "Cushamen Centro", "Diadema Argentina", "Dique Florentino Ameghino",
      "Doctor Oscar Atilio Viglione (Frontera de Río Pico)", "Doctor Ricardo Rojas",
      "Dolavon", "El Escorial", "El Hoyo", "El Maitén", "El Mirasol", "Epuyén", "Esquel",
      "Facundo", "Fofo Cahuel", "Gaiman", "Gan Gan", "Garayalde", "Gastre", "Gobernador Costa",
      "Gualjaina", "José de San Martín", "Lago Blanco", "Lago Epuyén", "Lago Puelo",
      "Lago Rosario", "Lagunita Salada", "Las Plumas", "Leleque", "Los Altares",
      "Los Cipreses", "Paso de Indios", "Paso del Sapo", "Playa Magagna", "Playa Unión",
      "Puerto Madryn", "Puerto Pirámides", "Quinta El Mirador", "Rada Tilly", "Rawson",
      "Reserva Area Protegida El Doradillo", "Río Mayo", "Río Pico", "Sarmiento", "Tecka",
      "Telsen", "Trelew", "Trevelin", "Villa Futalaufquen"],
    cordoba: [
      "Achiras", "Adelia María", "Agua de Oro", "Alcira (Gigena)", "Aldea Santa María", "Alejandro Roca (Est. Alejandro)", "Alejo Ledesma",
      "Alicia", "Almafuerte", "Alpa Corral", "Alta Gracia", "Alto Alegre", "Alto de los Quebrachos", "Altos de Chipión", "Amboy", "Ámbul",
      "Ana Zumarán", "Anisacate", "Arias", "Arroyito", "Arroyo Algodón", "Arroyo Cabral", "Arroyo Los Patos", "Ascochinga", "Assunta", "Atahona",
      "Ausonia", "Avellaneda", "Ballesteros", "Ballesteros Sur", "Balnearia", "Bañado de Soto", "Barrio Gilbert (- Tejas Tres; 1° de Mayo)",
      "Barrio Nuevo Rio Ceballos", "Barrio Santa Isabel", "Bell Ville", "Bengolea", "Benjamín Gould", "Berrotarán", "Bialet Massé", "Bouwer",
      "Brinkmann", "Bulnes", "Cabalango", "Calchín", "Calchín Oeste", "Camilo Aldao", "Caminiaga", "Campos del Virrey", "Cañada del Sauce",
      "Cañada de Luque", "Cañada de Machado", "Cañada de Río Pinto", "Canals", "Candelaria Sur", "Canteras El Sauce", "Canteras Quilpo",
      "Capilla del Carmen", "Capilla del Monte", "Capilla de los Remedios", "Capilla de Sitón", "Capilla Vieja", "Capitán General Bernardo O'Higgins",
      "Carnerillo", "Carrilobo", "Casa Bamba", "Casa Grande", "Caseros Centro", "Causana", "Cavanagh", "Cerro Colorado", "Chaján", "Chalacea",
      "Chañar Viejo", "Chancaní", "Charbonier", "Charras", "Chazón", "Chilibroste", "Chucul", "Chuña", "Chuña Huasi", "Churqui Cañada",
      "Ciénaga del Coro", "Cintra", "Colazo", "Colonia 10 de Julio", "Colonia Almada", "Colonia Anita", "Colonia Barge", "Colonia Bismarck",
      "Colonia Bremen", "Colonia Caroya", "Colonia Italiana", "Colonia Iturraspe", "Colonia Las Cuatro Esquinas", "Colonia Las Pichanas",
      "Colonia Marina", "Colonia Prosperidad", "Colonia San Bartolomé", "Colonia San Pedro", "Colonia Santa María", "Colonia Tirolesa",
      "Colonia Valtelina", "Colonia Veinticinco", "Colonia Vicente Agüero", "Colonia Videla", "Colonia Vignaud", "Conlara", "Copacabana", "Córdoba",
      "Coronel Baigorria", "Coronel Moldes", "Corral de Bustos", "Corralito", "Corral Quemado", "Cosquín", "Costa Azul", "Costa Sacate",
      "Country Chacras de la Villa (- Country San Isidro)", "Cruz Alta", "Cruz Caña", "Cruz de Caña", "Cruz del Eje", "Cuesta Blanca", "Dalmacio Vélez",
      "Deán Funes", "Del Campillo", "Despeñaderos", "Devoto", "Diego de Rojas", "Dique Chico", "Dos Arroyos", "El Alcalde (Est. Tala Norte)",
      "El Arañado", "El Brete", "El Chacho", "El Corcovado - El Torreón", "El Crispín", "El Durazno", "Elena", "El Fortín", "El Fuertecito",
      "El Huayco", "El Manzano", "El Pantanillo", "El Potrerillo", "El Rastreador", "El Rincón", "El Rodeo", "El Tío", "El Tuscal", "Embalse", "Esquina", "Esquina del Alambre", "Estación Colonia Tirolesa", "Estación Lecueder", "Estación Luxardo",
      "Estancia de Guadalupe", "Estancia Vieja", "Etruria", "Eufrasio Loza", "Falda del Cañete", "Falda del Carmen", "Freyre",
      "General Baldissera", "General Cabrera", "General Deheza", "General Fotheringham", "General Levalle", "General Paz",
      "General Roca", "Guanaco Muerto", "Guasapampa", "Guatimozín", "Gutemberg", "Hernando", "Hipólito Bouchard (Buchardo)",
      "Huanchillas", "Huerta Grande", "Huinca Renancó", "Idiazábal", "Impira", "Inriville", "Isla Verde", "Italó", "James Craik",
      "Jesús María", "José de la Quintana", "Justiniano Posse", "Kilómetro 658", "La Banda", "La Batea", "La Boca del Río", "Laborde",
      "Laboulaye", "La Calera", "La Carbonada", "La Carlota", "La Carolina", "La Cautiva", "La Cesira", "La Cruz", "La Cumbre",
      "La Cumbrecita", "La Falda", "La Francia", "La Gilda", "La Granja", "Laguna Larga", "La Higuera", "La Laguna", "La Morada",
      "La Paisanita", "La Palestina", "La Pampa", "La Paquita", "La Para", "La Paz", "La Perla", "La Playa", "La Playosa", "La Población",
      "La Posta", "La Puerta", "La Quinta", "La Ramada", "La Rancherita y Las Cascadas", "La Rinconada", "Las Acequias", "Las Albahacas",
      "Las Arrias", "Las Bajadas", "Las Caleras", "Las Calles", "Las Cañadas", "Las Chacras", "Las Corzuelas", "La Serranita", "Las Gramillas",
      "Las Higueras", "Las Isletillas", "Las Jarillas", "Las Junturas", "Las Mojarras", "Las Oscuras", "Las Palmas", "Las Peñas (Sud)",
      "Las Peñas", "Las Perdices", "Las Playas", "Las Rabonas", "Las Saladas", "Las Tapias", "Las Varas", "Las Varillas", "Las Vertientes",
      "La Tordilla", "La Travesía", "Leguizamón", "Leones", "Loma Bola", "Los Callejones", "Los Cedros", "Los Cerrillos", "Los Chañaritos",
      "Los Chañaritos", "Los Cisnes", "Los Cocos", "Los Cóndores", "Los Hornillos", "Los Hoyos", "Los Mistoles", "Los Molinos", "Los Molles",
      "Los Molles", "Los Pozos", "Los Reartes", "Los Surgentes", "Los Talares", "Los Zorros", "Lozada", "Luca", "Lucio V. Mansilla", "Luque",
      "Lutti", "Luyaba", "Malagueño", "Malena", "Mallín", "Malvinas Argentinas", "Manfredi", "Maquinista Gallini", "Marcos Juárez", "Marull",
      "Matorrales", "Mattaldi", "Mayu Sumaj", "Media Naranja", "Melo", "Mendiolaza", "Mi Granja", "Mina Clavero", "Miramar", "Monte Buey",
      "Monte Cristo", "Monte de los Gauchos", "Monte del Rosario", "Monte Leña", "Monte Maíz", "Monte Ralo", "Morrison", "Morteros", "Mussi",
      "Nicolás Bruzzone", "Noetinger", "Nono", "Obispo Trejo", "Olaeta", "Oliva", "Olivares de San Nicolás", "Onagoity", "Oncativo", "Ordóñez",
      "Pacheco de Melo", "Pajas Blancas", "Pampayasta Norte", "Pampayasta Sur", "Panaholma", "Parque Calmayo", "Pascanas", "Pasco", "Paso del Durazno",
      "Paso del Durazno", "Paso Viejo", "Pilar", "Pincén", "Piquillín", "Plaza de Mercedes", "Plaza Luxardo", "Plaza San Francisco", "Porteña",
      "Potrero de Garay", "Pozo del Molle", "Pozo Nuevo", "Pueblo Comechingones", "Pueblo Italiano", "Puesto de Castro", "Punta del Agua",
      "Quebracho Herrado", "Quebracho Ladeado", "Quebrada de los Pozos", "Quebrada de Luna", "Quilino", "Rafael García", "Ramón J. Cárcano",
      "Ranqueles", "Rayo Cortado", "Rincón", "Río Bamba", "Río Ceballos", "Río Cuarto", "Río de los Sauces", "Río Primero", "Río Segundo", "Río Tercero", "Rosales", "Rosario del Saladillo", "Sacanta", "Sagrada Familia", "Saira", "Saladillo", "Saldán", "Salsacate",
      "Salsipuedes", "Sampacho", "Sanabria", "San Agustín", "San Antonio de Arredondo", "San Antonio de Litín", "San Basilio",
      "San Carlos Minas", "San Clemente", "San Esteban", "San Francisco", "San Francisco del Chañar", "San Gerónimo", "San Huberto",
      "San Ignacio (Loteo San Javier)", "San Javier y Yacanto", "San Joaquín", "San José", "San José de la Dormida", "San José de las Salinas",
      "San Lorenzo", "San Marcos", "San Marcos Sierra", "San Martín", "San Nicolás (- Tierra Alta)", "San Pedro", "San Pedro de Gütemberg",
      "San Pedro de Toyos", "San Pedro Norte", "San Roque", "San Severo", "Santa Catalina (Holmberg)", "Santa Catalina", "Santa Elena",
      "Santa Elena", "Santa Eufemia", "Santa Magdalena (Est. Jovita)", "Santa María de Punilla", "Santa Rosa de Calamuchita",
      "Santa Rosa de Río Primero", "Santiago Temple", "San Vicente", "Sarmiento", "Saturnino María Laspiur", "Sauce Arriba",
      "Sebastián Elcano", "Seeber", "Segunda Usina", "Serrano", "Serrezuela", "Silvio Pellico", "Simbolar", "Sinsacate", "Socavones",
      "Solar de los Molinos", "Suco", "Tala Cañada", "Tala Huasi", "Talaini", "Tancacha", "Taninga", "Tanti", "Tasna", "Ticino", "Tinoco",
      "Tío Pujio", "Toledo", "Toro Pujio", "Tosno", "Tosquitas", "Tránsito", "Tuclame", "Ucacha", "Unquillo", "Valle Alegre", "Valle de Anisacate",
      "Valle Hermoso", "Viamonte", "Vicuña Mackenna", "Villa Albertina", "Villa Allende", "Villa Alpina", "Villa Amancay", "Villa Ascasubi",
      "Villa Berna", "Villa Candelaria", "Villa Carlos Paz", "Villa Cerro Azul", "Villa Ciudad de América (Loteo Diego de Rojas)",
      "Villa Ciudad Parque Los Reartes", "Villa Concepción del Tío", "Villa Corazon de Maria", "Villa Cura Brochero", "Villa de Las Rosas",
      "Villa del Dique", "Villa del Prado", "Villa del Rosario", "Villa del Totoral", "Villa del Tránsito", "Villa de María", "Villa de Pocho",
      "Villa de Soto", "Villa Dolores", "Villa El Chacay", "Villa El Fachinal (- Parque Norte - Guiñazú Norte)", "Villa Elisa", "Villa El Tala",
      "Villa Flor Serrana", "Villa Fontana", "Villa General Belgrano", "Villa Giardino", "Villa Gutiérrez", "Villa Huidobro", "Villa La Bolsa",
      "Villa Lago Azul", "Villa La Rivera", "Villa La Viña", "Villa Los Aromos", "Villa Los Llanos (- Juárez Celman)", "Villa Los Patos",
      "Villa María", "Villa Nueva", "Villa Oeste", "Villa Parque Santa Ana", "Villa Parque Síquiman", "Villa Quilino", "Villa Quillinzo",
      "Villa Reducción", "Villa Río Icho Cruz", "Villa Rossi", "Villa Rumipal", "Villa San Esteban", "Villa San Isidro", "Villa San José (San José de los Ríos)",
      "Villa Santa Cruz del Lago", "Villa Santa Eugenia", "Villa Sarmiento", "Villa Sarmiento", "Villa Sierras de Oro", "Villa Tulumba",
      "Villa Valeria", "Villa Yacanto (Yacanto de Calamuchita)", "Washington", "Wenceslao Escalante", "Yocsina"],
    corrientes: [
      "9 de Julio", "Alvear", "Bella Vista", "Berón de Astrada", "Bonpland", "Carolina", "Cazadores Correntinos",
      "Chavarría", "Colonia Carlos Pellegrini", "Colonia Libertad", "Colonia Liebig's", "Colonia Pando", "Concepción",
      "Corrientes", "Cruz de los Milagros", "Curuzú Cuatiá", "El Sombrero", "Empedrado", "Esquina", "Estación Libertad",
      "Estación Torrent", "Felipe Yofre", "Garruchos", "Gobernador Igr. Valentín Virasoro", "Gobernador Juan E. Martínez",
      "Goya", "Guaviraví", "Ingenio Primer Correntino", "Itá Ibaté", "Itatí", "Ituzaingó", "José Rafael Gómez (Garabí)",
      "Juan Pujol", "La Cruz", "Laguna Brava", "Lavalle", "Lomas de Vallejos", "Loreto", "Mariano I. Loza (Est. Justino Solari)",
      "Mburucuyá", "Mercedes", "Mocoretá", "Monte Caseros", "Nuestra Señora del Rosario de Caá Catí", "Palmar Grande",
      "Parada Acuña", "Parada Labougle", "Parada Pucheta", "Paso de la Patria", "Paso de los Libres", "Pedro R. Fernández (Est. Manuel F. Mantilla)",
      "Perugorría", "Pueblo Libertador", "Ramada Paso", "Riachuelo", "Saladas", "San Antonio", "San Carlos", "San Cayetano",
      "San Cosme", "San Lorenzo", "San Luis del Palmar", "San Miguel", "San Roque", "Santa Ana", "Santa Lucía", "Santa Rosa",
      "Santo Tomé", "Sauce", "Tabay", "Tapebicuá", "Tatacuá", "Villa Córdoba", "Villa Olivari", "Yahapé", "Yapeyú",
      "Yatayti Calle"],
    entre_rios: [
      "1º de Mayo (Primero de Mayo)", "Aldea Asunción", "Aldea Brasilera", "Aldea Grapschental", "Aldea María Luisa",
      "Aldea Protestante", "Aldea Salto", "Aldea San Antonio", "Aldea San Francisco", "Aldea San Isidro (El Cimarrón)",
      "Aldea San Juan", "Aldea San Juan", "Aldea San Rafael", "Aldea Santa María", "Aldea Santa Rosa", "Aldea Spatzenkutter",
      "Aldea Valle María", "Altamirano Sur", "Antelo", "Aranguren", "Arroyo Barú", "Basavilbaso", "Betbeder", "Bovril",
      "Calabacilla", "Caseros", "Ceibas", "Cerrito", "Chajarí", "Clodomiro Ledesma", "Colón", "Colonia Alemana",
      "Colonia Avellaneda", "Colonia Avigdor", "Colonia Ayuí", "Colonia Crespo", "Colonia Elía", "Colonia Ensayo",
      "Colonia General Roca", "Colonia Hugues", "Colonia La Argentina", "Colonia Peña", "Concepción del Uruguay",
      "Concordia", "Conscripto Bernardi", "Crespo", "Diamante", "Don Cristóbal", "Durazno", "El Palenque", "El Pingo",
      "El Ramblón", "El Solar", "Enrique Carbó", "Estación Arroyo Clé", "Estación Camps", "Estación Escriña",
      "Estación Lazo", "Estación Raíces", "Estación Yeruá", "Estación Yuquerí", "Estancia Grande (Colonia Yeruá)",
      "Faustino M. Parera", "Febré", "Federación", "Federal", "General Almada", "General Alvear (Puerto Alvear)",
      "General Campos", "General Galarza", "General Racedo (El Carmen)", "General Ramírez", "Gilbert", "Gobernador Echagüe",
      "Gobernador Mansilla", "Gobernador Sola", "Gualeguay", "Gualeguaychú", "Guardamonte", "Hambis", "Hasenkamp",
      "Hernandarias", "Hernández", "Herrera", "Hocker", "Ibicuy", "Ingeniero Miguel Sajaroff", "Irazusta", "Jubileo",
      "La Clarita", "La Criolla", "La Juanita", "La Paz", "La Picada", "Larroque", "Las Guachas", "Las Jaulas",
      "Las Moscas", "Las Tunas", "Líbaros", "Los Charrúas", "Los Conquistadores", "Lucas González", "Maciá",
      "María Grande", "Médanos", "Molino Doll", "Nogoyá", "Nueva Escocia", "Nueva Vizcaya", "Oro Verde",
      "Osvaldo Magnasco", "Paraje La Virgen", "Paraná", "Paso de la Laguna", "Pastor Britos", "Pedernal",
      "Piedras Blancas", "Pronunciamiento", "Pueblo Arrúa (Est. Alcaraz)", "Pueblo Bellocq (Est. Las Garzas)",
      "Pueblo Brugo", "Pueblo Cazes", "Pueblo General Belgrano", "Pueblo General San Martín", "Pueblo Liebig's",
      "Puerto Las Cuevas", "Puerto Ruiz", "Puerto Yeruá", "Rocamora", "Rosario del Tala", "San Benito", "San Gustavo",
      "San Jaime de la Frontera", "San José", "San José de Feliciano", "San Pedro", "San Ramón", "San Salvador",
      "Santa Ana", "Santa Anita", "Santa Elena", "San Víctor", "Sauce de Luna", "Sauce Montrull", "Sauce Pinto",
      "Seguí", "Sir Leonard", "Sosa", "Tabossi", "Tezanos Pinto", "Ubajay", "Urdinarrain", "Viale", "Victoria",
      "Villa Clara", "Villa del Rosario", "Villa Domínguez", "Villa Elisa", "Villa Fontana", "Villa Gobernador Luis F. Etchevehere",
      "Villaguay", "Villa Libertador San Martín", "Villa Mantero", "Villa Paranacito", "Villa San Justo",
      "Villa San Marcial (Est. Gobernador Urquiza)", "Villa Urquiza"],
    formosa: [
      "Banco Payaguá", "Bartolomé de las Casas", "Buena Vista", "Clorinda", "Colonia Campo Villafañe (Mayor Vicente Villafañe)",
      "Colonia Pastoril", "Colonia Sarmiento", "Comandante Fontana", "El Colorado", "El Espinillo", "El Potrillo", "El Quebracho",
      "El Recreo", "Estanislao del Campo", "Formosa", "Fortín Cabo 1º Lugones", "Fortín Sargento 1º Leyes", "Fortín Soledad",
      "General Lucio Victorio Mansilla", "General Mosconi", "Gran Guardia", "Guadalcazar", "Herradura", "Ibarreta",
      "Ingeniero Guillermo N. Juárez", "Juan G. Bazán", "Laguna Blanca", "Laguna Gallo", "Laguna Naick-Neck", "Laguna Yema",
      "Lamadrid", "La Rinconada", "Las Lomitas", "Los Chiriguanos", "Mariano Boedo", "Misión Tacaaglé", "Mojón de Fierro",
      "Palma Sola", "Palo Santo", "Pirané", "Portón Negro", "Posta Cambio Zalazar", "Pozo del Mortero", "Pozo del Tigre",
      "Pozo de Maza", "Puerto Pilcomayo", "Riacho He-He", "Riacho Negro", "San Francisco de Laishi", "San Hilario", "San Martín I",
      "San Martín II", "Siete Palmas", "Subteniente Perín", "Tatané", "Tres Lagunas", "Vaca Perdida", "Villa del Carmen",
      "Villa Escolar", "Villa General Güemes", "Villa General Manuel Belgrano", "Villa Kilómetro 213 (Villa Dos Trece)"],
    jujuy: [
      "Abdón Castro Tolay", "Abralaite", "Abra Pampa", "Agua de Castilla", "Aguas Calientes", "Aparzo", "Arrayanal",
      "Arroyo Colorado", "Bananal", "Bárcena", "Barrio El Milagro (La Ovejería)", "Barrio La Unión", "Barrios", "Bermejito",
      "Caimancito", "Calilegua", "Cangrejillos", "Carahunco", "Casabindo", "Casa Colorada", "Casira", "Caspalá", "Catua",
      "Centro Forestal", "Chalicán", "Cianzo", "Ciénega de Paicone", "Cieneguillas", "Cochinoca", "Coctaca", "Colonia San José",
      "Coranzulí", "Coyaguaima", "Cusi Cusi", "Don Emilio", "El Acheral", "El Aguilar", "El Angosto", "El Carmen", "El Ceibal",
      "El Cóndor", "El Fuerte", "El Moreno", "El Piquete", "El Puesto", "El Quemado", "El Talar", "El Toro", "Fraile Pintado",
      "Guerrero", "Hipólito Yrigoyen (Est. Iturbe)", "Huacalera", "Huáncar", "Humahuaca", "Jama", "Juella", "La Almona", "La Ciénega",
      "La Esperanza", "Lagunillas de Farallón", "La Intermedia", "La Manga", "La Mendieta", "La Quiaca", "La Redonda", "León", "Libertad",
      "Libertador General San Martín (Est. Ledesma)", "Liviara", "Llulluchayoc", "Loma Blanca", "Los Alisos", "Los Lapachos (Est. Maquinista Veró)",
      "Loteo Navea (Los Alisos)", "Loteo San Vicente", "Lozano (Ap. Chañi)", "Maimará", "Manantiales", "Mina Providencia", "Miraflores", "Misarrumi",
      "Monterrico", "Nuestra Señora del Rosario", "Nuevo Pirquitas (Mina Pirquitas)", "Ocloyas", "Olacapato", "Olaroz Chico", "Oratorio",
      "Orosmayo", "Paicone", "Palca de Aparzo", "Palca de Varas", "Palma Sola", "Palos Blancos", "Palpalá (Est. Gral. Manuel N. Savio)", "Pampa Blanca",
      "Pampichuela", "Parapetí", "Pastos Chicos", "Paulina", "Perico", "Piedritas", "Puente Lavayén", "Puerta de Colorados", "Puesto del Marquéz",
      "Puesto Sey", "Puesto Viejo", "Pumahuasi", "Purmamarca", "Quebraleña", "Quera", "Rinconada", "Rinconadillas", "Rodeíto", "Rodero", "Rosario de Río Grande (Barro Negro)",
      "San Antonio", "San Francisco", "San Francisco de Alfarcito", "San Isidro", "San Juancito", "San Juan de Oros", "San Juan de Quillaqués", "San Lucas",
      "San Pedro (Est. San Pedro de Jujuy)", "San Salvador de Jujuy (Est. Jujuy)", "Santa Ana", "Santa Ana de la Puna", "Santa Catalina", "Santa Clara",
      "Santuario de Tres Pozos", "Sauzal", "Susques", "Tambillos", "Tesorero", "Tilcara", "Tres Cruces", "Tumbaya", "Tusaquillas", "Uquía (Est. Senador Pérez)",
      "Valle Colorado", "Valle Grande", "Vinalito", "Volcán", "Yala", "Yavi", "Yavi Chico", "Yoscaba", "Yuto"],
    la_pampa: [
      "25 de Mayo (Villa Veinticinco de Mayo)", "Abramo", "Adolfo Van Praet", "Agustoni", "Algarrobo del Águila", "Alpachiri", "Alta Italia",
      "Anguil", "Anzoátegui", "Arata", "Ataliva Roca", "Bernardo Larroudé", "Bernasconi", "Cachirulo", "Caleufú", "Carro Quemado",
      "Casa de Piedra", "Catriló", "Ceballos", "Chacharramendi", "Colonia Barón", "Colonia San José", "Colonia Santa María", "Conhelo",
      "Coronel Hilario Lagos (Est. Aguas Buenas)", "Cuchillo-Có", "Damián Maisonave (Est. Simson)", "Doblas", "Dorila", "Eduardo Castex",
      "Embajador Martini", "Falucho", "General Acha", "General Manuel J. Campos", "General Pico", "General San Martín (Est. Villa Alba)",
      "Gobernador Duval", "Guatraché", "Hucal", "Ingeniero Foster", "Ingeniero Luiggi", "Intendente Alvear", "Jacinto Aráuz", "La Adela",
      "La Gloria", "La Humada", "La Maruja", "La Reforma", "Limay Mahuida", "Lonquimay", "Loventué", "Luan Toro", "Macachín", "Mauricio Mayer",
      "Metileo", "Miguel Cané", "Miguel Riglos", "Monte Nievas", "Naicó", "Ojeda", "Parera", "Perú", "Pichi Huinca", "Puelches", "Puelén",
      "Quehué", "Quemú Quemú", "Quetrequén", "Rancul", "Realicó", "Relmo", "Rolón", "Rucanelo", "Santa Isabel", "Santa Rosa", "Santa Teresa",
      "Sarah", "Speluzzi", "Telén", "Toay", "Tomás Manuel de Anchorena", "Trebolares", "Trenel", "Unanué", "Uriburu", "Vértiz", "Victorica",
      "Villa Mirasol", "Winifreda"],
    la_rioja: [
      "Aicuña", "Aimogasta", "Alto Carrizal", "Amaná", "Ambil", "Aminga", "Angulos", "Anillaco", "Anjullón", "Antinaco", "Arauco", "Bajo Carrizal",
      "Bañado de los Pantanos", "Campanas", "Castro Barros", "Chamical", "Chañar", "Chañarmuyo", "Chepes", "Chilecito", "Chuquis", "Colonia Anguinán",
      "Colonia Catinzaco", "Colonia Malligasta", "Colonia Ortiz de Ocampo", "Colonia Vichigasta", "Desiderio Tello", "Estación Mazán", "Famatina",
      "Guanchín", "Guandacol", "Jagüé", "La Cuadra", "La Rioja", "Loma Blanca", "Los Molinos", "Los Palacios", "Malanzán", "Malligasta", "Milagro",
      "Miranda", "Nácate", "Nonogasta", "Olpas", "Olta", "Pagancillo", "Patquía", "Pinchas", "Pituil", "Plaza Vieja", "Polco", "Portezuelo",
      "Punta de los Llanos", "Salicas (- San Blas)", "San Antonio", "San Nicolás", "Sañogasta", "San Pedro", "Santa Cruz", "Santa Florentina",
      "Santa Rita de Catuna", "Santa Vera Cruz", "Santo Domingo", "Tama", "Termas Santa Teresita", "Tilimuqui", "Ulapes", "Vichigasta", "Villa Castelli",
      "Villa Mazán", "Villa Sanagasta", "Villa San José de Vinchina", "Villa Unión"],
    mendoza: [
      "25 de Mayo (Villa Veinticinco de Mayo)", "3 de Mayo", "Agrelo", "Agua Escondida", "Alto Verde", "Andrade", "Barrancas", "Barrio 12 de Octubre",
      "Barrio Alto del Olvido", "Barrio Belgrano Norte", "Barrio Campos El Toledano", "Barrio Carrasco", "Barrio Chivilcoy", "Barrio Cooperativa Los Campamentos",
      "Barrio El Cepillo", "Barrio El Nevado", "Barrio Emanuel", "Barrio Empleados de Comercio", "Barrio Intendencia", "Barrio Jesús de Nazaret",
      "Barrio Jocolí II", "Barrio la Estación", "Barrio Lagunas de Bartoluzzi", "Barrio La Palmera", "Barrio La Pega", "Barrio Los Charabones",
      "Barrio Los Jarilleros", "Barrio Los Olivos", "Barrio María Auxiliadora", "Barrio Molina Cabrera", "Barrio Nuestra Señora de Fátima",
      "Barrio Perdriel IV", "Barrio Rivadavia", "Barrio San Cayetano", "Barrio Virgen del Rosario", "Blanco Encalada", "Bowen", "Cacheuta",
      "Campo Los Andes", "Capitán Montoya", "Carmensa", "Chapanay", "Chilecito", "Chivilcoy", "Colonia Las Rosas", "Colonia Segovia", "Cordón del Plata",
      "Costa de Araujo", "Costa Flores", "Cruz de Piedra", "Cuadro Benegas", "Desaguadero", "El Carrizal", "El Espino", "El Manzano", "El Mirador",
      "El Nihuil", "El Paramillo", "El Pedregal", "El Peral", "El Ramblón", "El Salto", "El Sosneado", "El Tropezón", "El Vergel", "El Zampal",
      "Eugenio Bustos", "Fray Luis Beltrán", "General Alvear", "Godoy Cruz", "Goudge", "Guaymallén (Villa Nueva)", "Ingeniero Giagnoni",
      "Ingeniero Gustavo André", "Jaime Prats", "Jocolí", "Jocolí Viejo", "Junín", "La Arboleda", "La Central", "La Colonia", "La Consulta",
      "La Dormida", "La Esperanza", "La Florida", "La Libertad", "La Llave Nueva", "La Paz", "La Primavera", "Las Catitas", "Las Compuertas",
      "Las Cuevas", "Las Heras", "Las Leñas", "Las Malvinas", "Las Vegas", "Las Violetas", "Los Árboles", "Los Barriales", "Los Campamentos",
      "Los Compartos", "Los Corralitos", "Los Penitentes", "Los Reyunos", "Los Sauces", "Luján de Cuyo", "Maipú", "Malargüe", "Medrano", "Mendoza",
      "Montecaseros", "Monte Comán", "Mundo Nuevo", "Nueva California (Est. Moluches)", "Pareditas", "Perdriel", "Phillips", "Pobre Diablo",
      "Polvaredas", "Potrerillos", "Puente de Hierro", "Puente del Inca", "Punta del Agua", "Punta de Vacas", "Rama Caída", "Real del Padre",
      "Reducción de Abajo", "Rivadavia", "Rodeo del Medio", "Rodríguez Peña", "Russell", "Salto de las Rosas", "San Carlos", "San José", "San Martín",
      "San Rafael", "San Roque", "Santa María de Oro", "Santa Rosa", "Tres Porteñas", "Tunuyán", "Tupungato", "Ugarteche", "Uspallata",
      "Villa Antigua", "Villa Atuel", "Villa Atuel Norte", "Villa Teresa", "Villa Tulumaya", "Vista Flores"],
    misiones: [
      "1º de Mayo (Primero de Mayo)", "25 de Mayo (Villa Veinticinco de Mayo)", "9 de Julio Kilómetro 20 (Nueve de Julio Kilómetro 20)",
      "9 de Julio Kilómetro 28 (Nueve de Julio Kilómetro 28)", "Alba Posse", "Alicia Alta", "Alicia Baja", "Almafuerte", "Apóstoles",
      "Aristóbulo del Valle", "Arroyo del Medio", "Azara", "Barra Concepción", "Barrio Cuatro Bocas", "Barrio del Lago", "Barrio Escuela 461",
      "Barrio Escuela 633", "Barrio Guatambú", "Barrio Itá", "Barrio Nuevo Garupa", "Barrio Rural", "Barrio Tungoil", "Bernardo de Irigoyen",
      "Bonpland", "Caá - Yarí", "Caburei", "Campo Grande", "Campo Ramón", "Campo Viera", "Candelaria", "Capioví", "Caraguatay", "Cerro Azul",
      "Cerro Corá", "Colonia Alberdi", "Colonia Aurora", "Colonia Polana", "Colonia Victoria", "Colonia Wanda", "Comandante Andresito (Almirante Brown)",
      "Concepción de la Sierra", "Copioviciño", "Corpus", "Cruce Caballero", "Domingo Savio", "Dos Arroyos", "Dos de Mayo", "Dos de Mayo Núcleo III (Barrio Bernardino Rivadavia)",
      "Dos Hermanas", "El Alcázar", "Eldorado", "El Salto", "El Soberbio", "Estación Apóstoles", "Florentino Ameghino", "Fracrán", "Garuhapé", "Garupá",
      "General Alvear", "General Urquiza", "Gobernador López", "Gobernador Roca", "Guaraní", "Helvecia (Barrio Eva Perón)", "Hipólito Yrigoyen", "Integración",
      "Itacaruaré", "Jardín América", "Kilómetro 17", "La Corita", "Laharrague", "Leandro N. Alem", "Loreto", "Los Helechos", "María Magdalena (Colonia Delicia)",
      "Mártires", "Mbopicuá", "Mojón Grande", "Montecarlo", "Nemesio Parma", "Nueva Delicia", "Oasis", "Oberá", "Olegario V. Andrade", "Panambí",
      "Panambí Kilómetro 15", "Panambí Kilómetro 8", "Paraíso", "Piñalito Norte", "Piñalito Sur", "Pindapoy", "Piray Kilómetro 18", "Posadas",
      "Posadas (Expansión)", "Profundidad", "Pueblo Illia", "Pueblo Nuevo", "Puerto Andresito", "Puerto Deseado", "Puerto Esperanza", "Puerto Iguazú",
      "Puerto Leoni", "Puerto Libertad", "Puerto Mado", "Puerto Pinares", "Puerto Piray", "Puerto Rico", "Puerto Santa Ana", "Rincón de Azara (Puerto Azara)",
      "Roca Chica", "Ruiz de Montoya", "Salto Encantado", "San Alberto", "San Antonio", "San Francisco de Asís", "San Gotardo", "San Ignacio",
      "San Javier", "San José", "San Martín", "San Miguel (Garuhapé-Mi)", "San Pedro", "Santa Ana", "Santa María", "Santa Rita", "Santiago de Liniers",
      "Santo Pipó", "San Vicente", "Tarumá", "Tobuna", "Tres Capones", "Valle Hermoso", "Villa Akerman", "Villa Bonita", "Villa Cooperativa",
      "Villa Libertad (Municipio Caá Yarí)", "Villa Parodi", "Villa Roulet", "Villa Urrutia"],
    neuquen: [
      "11 de Octubre", "Aguada San Roque", "Aluminé", "Andacollo", "Añelo", "Arroyito", "Bajada del Agrio", "Barrancas",
      "Barrio Ruca Luhé", "Buta Ranquil", "Caviahue", "Centenario", "Chorriaca", "Chos Malal", "Copahue", "Cutral Có",
      "El Chocón (Barrio Llequen)", "El Cholar", "El Huecú", "El Sauce", "Huinganco", "Junín de los Andes", "La Buitrera",
      "Las Coloradas", "Las Lajas", "Las Ovejas", "Loncopué", "Los Catutos", "Los Miches", "Manzano Amargo", "Mariano Moreno",
      "Mari Menuco", "Moquehue", "Neuquén", "Octavio Pico", "Paso Aguerre", "Picún Leufú", "Piedra del Águila", "Plaza Huincul",
      "Plottier", "Quili Malal", "Ramón M. Castro", "Rincón de los Sauces", "San Martín de los Andes", "San Patricio del Chañar",
      "Santo Tomás", "Senillosa", "Taquimilán", "Tricao Malal", "Varvarco", "Villa del Curi Leuvú", "Villa El Chocón",
      "Villa La Angostura", "Villa Lago Meliquina", "Villa Nahueve", "Villa Pehuenia", "Villa Traful", "Vista Alegre Norte",
      "Vista Alegre Sur", "Zapala"],
    rio_negro: [
      "Aguada Cecilio", "Aguada de Guerra", "Aguada Guzmán", "Allen", "Arelauquen", "Arroyo Los Berros", "Arroyo Ventana",
      "Bahía Creek", "Barda del Medio", "Barrio Blanco", "Barrio Calle Ciega Nº 6", "Barrio Calle Ciega Nº 10", "Barrio Canale",
      "Barrio Chacra Monte", "Barrio Colonia Conesa", "Barrio Costa Este", "Barrio Costa Linda", "Barrio Costa Oeste",
      "Barrio Destacamento", "Barrio El Labrador", "Barrio El Maruchito", "Barrio El Petróleo", "Barrio El Pilar", "Barrio Emergente",
      "Barrio Esperanza", "Barrio Fátima", "Barrio Frontera", "Barrio Guerrico", "Barrio Isla 10", "Barrio La Barda",
      "Barrio La Costa (Municipio General Roca)", "Barrio La Costa (Municipio Ingeniero Huergo)", "Barrio La Defensa",
      "Barrio la Herradura", "Barrio La Ribera - Barrio Apycar", "Barrio Luisillo", "Barrio Mar del Plata", "Barrio María Elvira",
      "Barrio Moño Azul", "Barrio Mosconi", "Barrio Norte (Municipio de Cinco Saltos)", "Barrio Pinar", "Barrio Planta Compresora de Gas",
      "Barrio Porvenir", "Barrio Puente 83", "Barrio Santa Lucía", "Barrio Santa Rita", "Barrio Unión", "Barrio Unión", "Cañadón Chileno",
      "Catriel", "Cerro Policía", "Cervantes", "Chelforó", "Chichinales", "Chimpay", "Choele Choel", "Cinco Saltos", "Cipolletti",
      "Clemente Onelli", "Colan Conhue", "Colonia Juliá y Echarren", "Colonia Suiza", "Comallo", "Comicó", "Cona Niyeu",
      "Contralmirante Cordero", "Coronel Belisle", "Darwin", "Dina Huapi", "El Bolsón", "El Caín", "El Cóndor", "El Cuy", "El Empalme",
      "El Foyel", "El Juncal", "Ferri", "General Conesa", "General Enrique Godoy", "General Fernández Oro", "General Roca",
      "Guardia Mitre", "Ingeniero Jacobacci", "Ingeniero Luis A. Huergo", "Ingeniero Otto Krause", "Juventud Unida", "Laguna Blanca",
      "La Lobería", "Lamarque", "Las Bayas", "Las Grutas", "Las Perlas", "Los Menucos", "Loteo Costa de Río", "Luis Beltrán", "Mainqué",
      "Mallin Ahogado", "Mamuel Choique", "Maquinchao", "Mencué", "Mina Santa Teresita", "Ministro Ramos Mexía", "Nahuel Niyeu",
      "Naupa Huen", "Ñirihuau", "Ñorquincó", "Ojos de Agua", "Paraje Arroyón (Bajo San Cayetano)", "Paso Córdova (Paso Córdoba)",
      "Paso Córdova (Paso Córdoba)", "Península Ruca Co", "Pichi Mahuida", "Pilcaniyeu", "Pilquiniyeu", "Pilquiniyeu del Limay",
      "Playas Doradas", "Pomona", "Pozo Salado", "Prahuaniyeu", "Puente Cero (Barrio Las Angustias)", "Puerto San Antonio Este",
      "Punta Colorada", "Río Chico (Est. Cerro Mesa)", "Río Colorado", "Río Villegas", "Saco Viejo", "Salto Andersen",
      "San Antonio Oeste", "San Carlos de Bariloche", "San Javier", "Sargento Vidal", "Sierra Colorada", "Sierra Grande",
      "Sierra Pailemán", "Treneta", "Valcheta", "Valle Azul", "Viedma", "Villa Alberdi", "Villa Catedral", "Villa del Parque",
      "Villa Llanquín", "Villa Los Coihues", "Villa Manzano", "Villa Mascardi", "Villa Regina", "Villa San Isidro", "Yaminué"],
    salta: [
      "Acoyte", "Aguaray", "Aguas Blancas", "Alto de la Sierra", "Ampascachi", "Angastaco", "Animaná", "Antilla",
      "Apolinario Saravia", "Atocha", "Barrio Finca la Maroma", "Barrio la Rotonda", "Barrio Santa Teresita", "Cabra Corral",
      "Cachi", "Cafayate", "Campamento Vespucio", "Campichuelo", "Campo Durán", "Campo La Cruz", "Campo Quijano", "Campo Santo",
      "Capiazuti", "Capitán Juan Pagé", "Carboncito", "Ceibalito", "Centro 25 de Junio", "Cerrillos", "Chicoana", "Cobos",
      "Cobres", "Colonia Santa Rosa", "Copo Quile", "Coronel Cornejo", "Coronel Juan Solá", "Coronel Moldes", "Coronel Mollinedo",
      "Coronel Olleros", "Dragones", "El Barrial", "El Bordo", "El Carril", "El Galpón", "El Jardín", "El Naranjo",
      "El Potrero (Apeadero Cochabamba)", "El Quebrachal", "El Tabacal", "El Tala", "El Tunal", "Embarcación", "Gaona",
      "General Ballivián", "General Güemes", "General Mosconi", "General Pizarro", "Guachipas", "Hickman", "Hipólito Yrigoyen",
      "Hito 1", "Iruya", "Isla de Cañas", "Joaquín V. González", "La Caldera", "La Candelaria", "La Ciénaga y Barrio San Rafael",
      "La Merced", "La Merced del Encón", "La Poma", "La Puerta", "Las Costas", "La Silleta", "Las Lajitas", "La Unión",
      "La Viña", "Los Blancos", "Los Toldos", "Luis Burela", "Lumbreras", "Macapillo", "Metán Viejo", "Misión Chaqueña",
      "Misión El Cruce (- El Milagro - El Jardín de San Martín)", "Misión Kilómetro 6", "Molinos", "Nazareno", "Nuestra Señora de Talavera",
      "Olacapato", "Pacará", "Padre Lozano", "Payogasta", "Pichanal", "Piquete Cabado", "Piquirenda", "Pluma de Pato",
      "Poscaya", "Profesor Salvador Mazza", "Pueblo Viejo", "Río del Valle", "Río Piedras", "Rivadavia", "Rosario de la Frontera",
      "Rosario de Lerma", "Salta", "San Agustín", "San Antonio de los Cobres", "San Carlos", "San Felipe", "San José de Metán",
      "San José de Orquera", "San Marcos", "San Ramón de la Nueva Orán", "Santa María", "Santa Rosa", "Santa Rosa de los Pastos Grandes",
      "Santa Victoria", "Santa Victoria Este", "Seclantás", "Talapampa", "Tartagal", "Tobantirenda", "Tolar Grande", "Tolloche",
      "Tolombóm", "Tranquitas", "Urundel", "Vaqueros", "Villa Los Álamos (- El Congreso - Las Tunas)", "Villa San Lorenzo",
      "Yacuy"],
    san_juan: [
      "9 de Julio (Nueve de Julio)", "Alto de Sierra", "Angualasto", "Astica", "Balde del Rosario", "Barreal (- Villa Pituil)",
      "Barrio Justo P. Castro IV", "Barrio Municipal", "Barrio Ruta 40", "Barrio Sadop (- Bella Vista)", "Bella Vista", "Bermejo",
      "Calingasta", "Cañada Honda", "Carpintería", "Caucete", "Chimbas", "Chucuma", "Cienaguita", "Colonia Fiorito", "Colonia Fiscal",
      "Divisadero", "Dos Acequias (Est. Los Angacos)", "El Encón", "El Médano", "El Rincón", "El Rincón", "Gran China", "Guanacache",
      "Huaco", "Iglesia", "Las Chacritas", "Las Flores", "Las Lagunas", "Las Piedritas", "Las Talas - Los Médanos", "Las Tapias",
      "Los Baldecitos", "Los Berros", "Marayes", "Mogna", "Niquivil", "Pampa Vieja", "Pedernal", "Pie de Palo", "Pismanta",
      "Punta del Médano", "Quinto Cuartel", "Rawson (Villa Krause)", "Rivadavia", "Rodeo", "San Isidro", "San Isidro (Est. Los Angacos)",
      "San José de Jáchal", "San Juan", "Santa Lucía", "Tamberías", "Tamberías", "Tudcum", "Tupelí", "Usno", "Vallecito",
      "Villa Aberastain (- La Rinconada)", "Villa Barboza (- Villa Nacusi)", "Villa Basilio Nievas", "Villa Bolaños (Médano de Oro)",
      "Villa Borjas (- La Chimbera)", "Villa Centenario", "Villa del Salvador", "Villa Dominguito (Est. Puntilla Blanca)",
      "Villa Don Bosco (Est. Angaco Sud)", "Villa El Salvador (- Villa Sefair)", "Villa El Tango", "Villa General San Martín (- Campo Afuera)",
      "Villa Ibáñez", "Villa Independencia", "Villa Malvinas Argentinas", "Villa Media Agua", "Villa Mercedes", "Villa San Agustín",
      "Villa San Martín", "Villa Santa Rosa"],
    san_luis: [
      "Alto Pelado", "Alto Pencoso", "Anchorena", "Arizona", "Bagual", "Balde", "Batavia", "Beazley", "Buena Esperanza", "Candelaria",
      "Carolina", "Carpintería", "Cazador", "Cerro de Oro", "Chosmes", "Concarán", "Cortaderas", "Desaguadero", "El Trapiche",
      "El Volcán", "Estancia Grande", "Fortín El Patria", "Fortuna", "Fraga", "Jarilla", "Juana Koslay", "Juan Jorba", "Juan Llerena",
      "Justo Daract", "La Bajada", "La Calera", "Lafinur", "La Florida", "La Maroma", "La Punilla", "La Punta", "Las Aguadas",
      "Las Chacras", "Las Lagunas", "La Toma", "Lavaisse", "La Vertiente", "Leandro N. Alem", "Los Cajones", "Los Molles",
      "Los Overos", "Luján", "Martín de Loyola", "Merlo", "Mosmota", "Nación Ranquel", "Nahuel Mapá", "Naschel", "Navia", "Nogolí",
      "Nueva Galia", "Papagayos", "Paso Grande", "Potrerillo", "Potrero de los Funes", "Quines", "Renca", "Riocito", "Río Grande",
      "Saladillo", "Salinas del Bebedero", "San Francisco del Monte de Oro", "San Jerónimo", "San José del Morro", "San Luis",
      "San Martín", "San Pablo", "Santa Rosa del Conlara", "Talita", "Tilisarao", "Unión", "Villa de la Quebrada", "Villa del Carmen",
      "Villa de Praga", "Villa General Roca", "Villa Larca", "Villa Mercedes", "Villa Reynolds", "Villa Salles", "Zanjitas"],
    santa_cruz: [
      "28 de Noviembre (Veintiocho de Noviembre)", "Bajo Caracoles", "Caleta Olivia", "Cañadón Seco", "Comandante Luis Piedrabuena",
      "El Calafate", "El Chaltén", "El Turbio (Est. Gobernador Mayer)", "Fitz Roy", "Gobernador Gregores", "Hipólito Yrigoyen",
      "Jaramillo", "Julia Dufour", "Koluel Kaike", "Las Heras", "Los Antiguos", "Mina 3", "Perito Moreno", "Pico Truncado",
      "Puerto Deseado", "Puerto San Julián", "Puerto Santa Cruz", "Río Gallegos", "Rospentek", "Tellier", "Tres Lagos",
      "Yacimientos Río Turbio"],
    santa_fe: [
      "Aarón Castellanos (Est. Castellanos)", "Acebal", "Aguará Grande", "Albarellos", "Alcorta", "Aldao (Est. Casablanca)",
      "Aldao", "Alejandra", "Álvarez", "Alvear", "Ambrosetti", "Amenábar", "Ángel Gallardo", "Angélica", "Angeloni", "Arbilla",
      "Arequito", "Arminda", "Armstrong", "Arocena", "Arroyo Aguiar", "Arroyo Ceibal", "Arroyo Leyes", "Arroyo Seco", "Arrufó",
      "Arteaga", "Ataliva", "Aurelia", "Avellaneda (Est. Ewald)", "Balneario La Verde", "Balneario Monje", "Barrancas",
      "Barrio Arroyo del Medio", "Barrio Caima", "Barrio Cicarelli", "Barrio El Pacaá - Barrio Comipini", "Barrio Mitre",
      "Barrios Acapulco y Veracruz", "Bauer y Sigel", "Bella Italia", "Berabevú", "Berna", "Bernardo de Irigoyen (Est. Irigoyen)",
      "Bigand", "Bombal", "Bouquet", "Bustinza", "Cabal", "Cacique Ariacaiquín", "Cafferata", "Calchaquí", "Campo Andino",
      "Cañada de Gómez", "Cañada del Ucle", "Cañada Ombú", "Cañada Rica", "Cañada Rosquín", "Candioti", "Capitán Bermúdez",
      "Capivara", "Carcarañá", "Carlos Pellegrini", "Carmen", "Carmen del Sauce", "Carreras", "Carrizales (Est. Clarke)",
      "Casalegno", "Casas", "Casilda", "Castelar", "Castellanos", "Cavour", "Cayastá", "Cayastacito", "Centeno", "Cepeda",
      "Ceres", "Chabás", "Chañar Ladeado", "Chapuy", "Chovet", "Christophersen", "Classon", "Colmena", "Colonia Ana",
      "Colonia Belgrano", "Colonia Bicha", "Colonia Bossi", "Colonia Cello", "Colonia Dolores", "Colonia Durán", "Colonia Margarita",
      "Colonia Médici", "Colonia Raquel", "Colonia Rosa", "Constanza", "Coronda", "Coronel Arnold", "Coronel Bogado",
      "Coronel Fraga", "Coronel Rodolfo S. Domínguez", "Correa", "Crispi", "Cuatro Esquinas", "Cululú", "Curupaytí",
      "Desvío Arijón", "Díaz", "Diego de Alvear", "Egusquiza", "El Arazá", "El Caramelo", "Elisa", "Elortondo", "El Rabón",
      "El Trébol", "Emilia", "Empalme San Carlos", "Empalme Villa Constitución", "Esmeralda", "Esperanza", "Estación Clucellas",
      "Estación Saguier", "Esteban Rams", "Esther", "Eusebia y Carolina", "Eustolia", "Felicia", "Fighiera", "Firmat",
      "Florencia", "Fortín Olmos", "Franck", "Fray Luis Beltrán", "Frontera", "Fuentes", "Funes", "Gaboto", "Gálvez", "Garabato",
      "Garibaldi", "Gato Colorado", "General Gelly", "General Lagos", "Gessler", "Gobernador Crespo", "Gödeken", "Godoy",
      "Golondrina", "Granadero Baigorria", "Gregoria Pérez de Denis (Est. El Nochero)", "Grutly", "Guadalupe Norte", "Helvecia",
      "Hersilia", "Hipatia", "Huanqueros", "Hughes", "Humberto Primo", "Humboldt", "Ibarlucea", "Ingeniero Chanourdie",
      "Intiyaco", "Irigoyen", "Jacinto L. Aráuz", "Josefina", "Juan Bernabé Molina", "Juncal", "Kilómetro 101", "Kilómetro 115",
      "Labordeboy", "La Brava", "La Cabral", "La Chispa", "La Criolla (Est. Cañadita)", "La Gallareta", "Laguna Paiva", "La Isleta",
      "La Lucila", "Landeta", "Lanteri", "La Pelada", "La Penca y Caraguatá", "Larguía", "Larrechea", "La Rubia", "La Sarita",
      "Las Avispas", "Las Bandurrias", "Las Garzas", "Las Palmeras", "Las Parejas", "Las Petacas", "Las Rosas", "Las Toscas",
      "Las Tunas", "La Vanguardia", "Lazzarino", "Lehmann", "Llambi Campbell", "Logroño", "Loma Alta", "López (Est. San Martín de Tours)",
      "Los Amores", "Los Cardos", "Los Laureles", "Los Molinos", "Los Muchachos - La Alborada", "Los Nogales", "Los Quirquinchos",
      "Los Zapallos", "Lucio V. López", "Luis Palacios (Est. La Salada)", "Maciel", "Maggiolo", "Malabrigo", "Marcelino Escalada",
      "Margarita", "María Juana", "María Luisa", "María Susana", "María Teresa", "Matilde", "Máximo Paz (Est. Paz)",
      "Melincué (Est. San Urbano)", "Miguel Torres", "Moisés Ville", "Monigotes", "Monje", "Montefiore", "Monte Flores",
      "Montes de Oca", "Monte Vera", "Murphy", "Ñanducita", "Naré", "Nelson", "Nueva Lehmann", "Nuevo Torino", "Oliveros",
      "Palacios", "Paraje 29", "Paraje Chaco Chico", "Paraje La Costa", "Paraje San Manuel", "Pavón", "Pavón Arriba",
      "Pedro Gómez Cello", "Pérez", "Peyrano", "Piamonte", "Pilar", "Piñero (Est. Erasto)", "Plaza Clucellas", "Plaza Matilde",
      "Plaza Saguier", "Pozo Borrado", "Pozo de los Indios", "Presidente Roca", "Progreso", "Providencia", "Pueblo Andino",
      "Pueblo Esther", "Pueblo Marini", "Pueblo Muñoz (Est. Bernard)", "Pueblo Santa Lucía", "Pueblo Uranga", "Puerto Aragón",
      "Puerto Arroyo Seco", "Puerto General San Martín", "Puerto Reconquista", "Pujato", "Rafaela", "Ramayón", "Ramona",
      "Reconquista", "Recreo", "Ricardone", "Rincón Potrero", "Roldán", "Romang", "Rosario", "Rueda", "Rufino", "Saladero Mariano Cabal",
      "Salto Grande", "San Agustín", "San Antonio", "San Antonio de Obligado", "San Bernardo", "San Carlos Centro",
      "San Carlos Norte", "San Carlos Sud", "San Cristóbal", "Sancti Spiritu", "San Eduardo", "San Eugenio", "San Fabián",
      "Sanford", "San Francisco de Santa Fe", "San Genaro", "San Genaro Norte", "San Gregorio", "San Guillermo", "San Javier",
      "San Jerónimo del Sauce", "San Jerónimo Norte", "San Jerónimo Sud", "San Jorge", "San José de la Esquina",
      "San José del Rincón", "San Justo", "San Lorenzo", "San Mariano", "San Martín de las Escobas", "San Martín Norte",
      "Santa Clara de Buena Vista", "Santa Clara de Saguier", "Santa Fe", "Santa Isabel", "Santa Margarita", "Santa Rosa de Calchines",
      "Santa Teresa", "Santo Domingo", "Santo Tomé", "Santurce", "San Vicente", "Sa Pereira", "Sargento Cabral", "Sarmiento",
      "Sastre", "Sauce Viejo", "Serodino", "Silva (Est. Abipones)", "Soldini", "Soledad", "Stephenson", "Suardi", "Sunchales",
      "Susana", "Tacuarendí (Emb. Kilómetro 421)", "Tacural", "Tartagal (Est. El Tajamar)", "Teodelina", "Theobald", "Timbúes", "Toba",
      "Tortugas", "Tostado", "Totoras", "Traill", "Venado Tuerto", "Vera (Est. Gobernador Vera)", "Vera y Pintado (Est. Guaraníes)",
      "Videla", "Vila", "Villa Amelia", "Villa Ana", "Villa Cañás", "Villa Constitución", "Villada", "Villa del Plata", "Villa Eloísa",
      "Villa Elvira", "Villa Gobernador Gálvez", "Villa Guillermina", "Villa Josefina", "Villa la Rivera (Comuna Oliveros) (Villa La Ribera)",
      "Villa la Rivera (Comuna Pueblo Andino) (Villa La Ribera)", "Villa Laura (Est. Constituyentes)", "Villa Minetti", "Villa Mugueta",
      "Villa Ocampo", "Villa San José", "Villa Saralegui", "Villa Trinidad", "Virginia", "Wheelwright", "Wildermuth (Est. Granadero B. Bustos)",
      "Zavalla", "Zenón Pereyra"],
    santiago_del_estero: [
      "Abra Grande", "Aerolito", "Alhuampa", "Añatuya", "Ancaján", "Antajé", "Ardiles", "Argentina", "Árraga", "Averías", "Bandera",
      "Bandera Bajada", "Beltrán", "Brea Pozo", "Campo Gallo", "Cañada Escobar", "Casares", "Caspi Corral", "Chañar Pozo de Abajo",
      "Chauchillas", "Chaupi Pozo", "Chilca Juliana", "Choya", "Clodomira", "Colonia Alpina", "Colonia Dora", "Colonia El Simbolar",
      "Colonia San Juan", "Colonia Tinco", "Coronel Manuel L. Rico", "Cuatro Bocas", "Donadeu", "El 49", "El Arenal", "El Bobadal",
      "El Caburé", "El Charco", "El Charco", "El Colorado", "El Crucero", "El Cuadrado", "El Deán", "El Mojón", "El Mojón", "El Rincón",
      "El Sauzal", "El Zanjón", "Estación Atamisqui", "Estación La Punta", "Estación Robles", "Estación Taboada", "Estación Tacañitas",
      "Fernández", "Fortín Inca", "Frías", "Garza", "Gramilla", "Gramilla", "Guardia Escolta", "Hasse", "Hernán Mejía Miraval", "Herrera",
      "Huyamampa", "Icaño", "Ingeniero Forres (Est. Chaguar Punco)", "Isca Yacu", "Isca Yacu Semaul", "Kilómetro 30", "La Aurora", "La Banda",
      "La Cañada", "La Dársena", "La Firmeza", "La Invernada", "La Nena", "La Nueva Donosa", "Laprida", "Las Delicias", "Las Tinajas",
      "Lavalle", "Libertad", "Lilo Viejo", "Los Cardozos", "Los Juríes", "Los Miranda", "Los Núñez", "Los Pirpintos", "Los Quiroga",
      "Los Soria", "Los Telares", "Los Tigres", "Lugones", "Maco", "Malbrán", "Mansupa", "Maquito", "Matará", "Medellín", "Minerva",
      "Monte Quemado", "Morales", "Nueva Esperanza", "Nueva Esperanza", "Nueva Francia", "Palo Negro", "Pampa de los Guanacos", "Patay",
      "Pozo Betbeder", "Pozo Hondo", "Pozuelos", "Pueblo Pablo Torelo (Est. Otumpa)", "Puesto de San Antonio", "Quimilí", "Ramírez de Velazco",
      "Rapelli", "Real Sayana", "Rodeo de Valdez", "Roversi", "Sacháyoj", "San José del Boquerón", "San Pedro", "San Pedro", "San Pedro",
      "San Pedro", "Santa María", "Santiago del Estero", "Santo Domingo", "Santos Lugares", "Selva", "Simbol", "Simbolar", "Sol de Julio",
      "Sumamao", "Sumampa", "Sumampa Viejo", "Suncho Corral", "Tapso", "Termas de Río Hondo", "Tintina", "Tomás Young", "Tramo 16", "Tramo 20",
      "Urutaú", "Vaca Huañuna", "Vilelas", "Villa Atamisqui", "Villa Figueroa", "Villa General Mitre (Est. Pinto)", "Villa Giménez",
      "Villa La Punta", "Villa Mailín", "Villa Nueva", "Villa Ojo de Agua", "Villa Río Hondo", "Villa Salavina", "Villa San Martín (Est. Loreto)",
      "Villa Silípica", "Villa Turística del Embalse", "Villa Unión", "Vilmer", "Vinará", "Vuelta de la Barranca", "Weisburd", "Yanda", "Yuchán"],
    tierra_del_fuego: [
      "Laguna Escondida", "Río Grande", "Tolhuin", "Ushuaia"],
    tucuman: [
      "7 de Abril (Siete de Abril)", "Acheral", "Aguilares", "Alderetes", "Alpachiri", "Alto Verde", "Amaicha del Valle",
      "Arcadia", "Atahona", "Banda del Río Salí", "Barrio Casa Rosada", "Barrio El Cruce", "Barrio Lomas de Tafí",
      "Barrio Mutual San Martín", "Barrio Parada 14", "Barrio San Felipe", "Barrio San Jorge", "Barrio San José III",
      "Barrio San Roque", "Barrio U.T.A. II", "Bella Vista", "Campo de Herrera", "Capitán Cáceres", "Choromoro",
      "Colalao del Valle", "Colombres", "Colonia Mayo - Barrio La Milagrosa", "Concepción", "Delfín Gallo",
      "Diagonal Norte (- Luz y Fuerza - Los Pocitos - Villa Nueva Italia)", "El Bracho", "El Cadillal", "El Chañar",
      "El Manantial", "El Mollar", "El Naranjo", "Estación Aráoz", "Famaillá", "Garmendia", "Graneros", "Iltico",
      "Ingenio Fronterita", "Ingenio San Pablo", "Juan Bautista Alberdi", "La Cocha", "La Florida", "Lamadrid",
      "La Ramada", "La Reducción", "Las Cejas", "La Trinidad", "Los Puestos", "Los Ralos", "Los Sarmientos", "Lules",
      "Macomitas", "Manuel García Fernández", "Medinas", "Monteagudo", "Monteros", "Nueva Trinidad", "Pacará",
      "Pala Pala", "Piedrabuena", "Pueblo Independencia (Santa Rosa y Los Rojo)", "Ranchillos", "Río Chico",
      "Río Colorado", "Río Seco", "San Andrés", "San José de La Cocha", "San Miguel de Tucumán (Est. Tucumán)",
      "San Pedro de Colalao", "Santa Ana", "Santa Cruz", "Santa Lucía", "Santa Rosa de Leales", "Sargento Moya",
      "Simoca", "Soldado Maldonado", "Taco Ralo", "Tafí del Valle", "Tafí Viejo", "Teniente Berdina", "Villa Belgrano",
      "Villa Benjamín Aráoz", "Villa Burruyacú", "Villa Carmela (Cebil Redondo)", "Villa Chicligasta",
      "Villa Clodomiro Hileret", "Villa de Leales", "Villa de Trancas", "Villa Fiad (- Ingenio Leales)",
      "Villa Las Flores", "Villa Mariano Moreno (- El Colmenar)", "Villa Padre Monti", "Villa Quinteros",
      "Yerba Buena (- Marcos Paz)"],
    };

    provinciaSelect.addEventListener('change', function () {
        const provincia = this.value;
        const ciudadOptions = ciudad[provincia];

        // Limpiar opciones anteriores
        ciudadSelect.innerHTML = '<option value="" disabled selected hidden>Selecciona una ciudad...</option>';

        // Agregar nuevas opciones
        ciudadOptions.forEach(function (ciudad) {
            const option = document.createElement('option');
            option.value = ciudad.toLowerCase().replace(/\s+/g, "_");
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });

        // Habilitar el select de ciudades
        ciudadSelect.disabled = false;
    });
});
