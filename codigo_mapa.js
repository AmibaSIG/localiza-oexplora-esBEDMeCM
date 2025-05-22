//comentário
// Inicia o mapa na div com id 'mapa' e centraliza nas coordenadas específicas definidas por mim
var map = L.map('mapa').setView([39.5, -8.0], 7);

// Adiciona uma camada de mapas do OpenStreetMap (OSM)
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
osm.addTo(map);  // Define esta camada como a padrão visível no início

// Adiciona uma camada de satélite do Google Maps, que mostra imagens de satélite
var googleSat = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');

// Adiciona a camada "Esri World Imagery", que é uma camada de imagens de satélite fornecida pela Esri
var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; <a href="https://www.esri.com/">Esri</a>' 
});

// Cria um objeto contendo os basemap disponíveis, permitindo alternar conforme escolha do utilizador
var baseMaps = {
	"OpenStreetMap": osm, 
	"Google Satellite": googleSat, 
	"Esri World Imagery": esriWorldImagery, 
};

// Adiciona um controlo ao mapa que permite alternar os basemaps
var layerControl = L.control.layers(baseMaps).addTo(map);


//*************************************************************************************************************************************************************************************************************************
// Icones coloridos personalizados
var bordaleiraIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/17207/17207630.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

var churraIcon = L.icon({
  iconUrl: 'https://static.vecteezy.com/system/resources/previews/009/589/758/non_2x/location-location-pin-location-icon-transparent-free-png.png',
  iconSize: [45, 45],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

//*************************************************************************************************************************************************************************************************************************
// Pontos para raça Bordaleira de Entre Douro e Minho (AZUL)
var bordaleiraPoints = [
  {
    nome: "Bordaleira Exploração 1",
    morada: "Rua A, Nº 10",
    codigoPostal: "4900-000",
    telefone: "222 000 111",
    telemovel: "91 222 3333",
    marca: "Marca X",
    direcoes: "https://shre.ink/eNeJ",
    lat: 41.5,
    lng: -8.0
  },
  {
    nome: "Bordaleira Exploração 2",
    morada: "Rua B, Nº 20",
    codigoPostal: "4900-001",
    telefone: "222 000 222",
    telemovel: "91 333 4444",
    marca: "Marca Y",
    direcoes: "https://goo.gl/maps/exemplo2",
    lat: 41.6,
    lng: -8.1
  }
];

// Pontos para raça Churra do Minho (VERMELHO)
var churraPoints = [
  {
    nome: "Churra Exploração 1",
    morada: "Rua C, Nº 15",
    codigoPostal: "4800-000",
    telefone: "222 111 000",
    telemovel: "92 111 2222",
    marca: "Marca A",
    direcoes: "https://goo.gl/maps/exemplo3",
    lat: 41.2,
    lng: -8.2
  },
  {
    nome: "Churra Exploração 2",
    morada: "Rua D, Nº 25",
    codigoPostal: "4800-001",
    telefone: "222 111 111",
    telemovel: "92 333 4444",
    marca: "Marca B",
    direcoes: "https://goo.gl/maps/exemplo4",
    lat: 41.3,
    lng: -8.3
  }
];

// Função para criar conteúdo da popup
function criarPopup(ponto) {
  return ` 
	<b>Nome:</b>${ponto.nome}<br>
    <b>Morada:</b> ${ponto.morada}<br>
    <b>Código Postal:</b> ${ponto.codigoPostal}<br>
    <b>Telefone:</b> ${ponto.telefone}<br>
    <b>Telemóvel:</b> ${ponto.telemovel}<br>
    <b>Marca:</b> ${ponto.marca}<br>
    <b>Direções:</b> <a href="${ponto.direcoes}" target="_blank">Ver no Google Maps</a>
  `;
}

// Adiciona marcadores Bordaleira com ícone azul
bordaleiraPoints.forEach(function(ponto) {
  L.marker([ponto.lat, ponto.lng], {icon: bordaleiraIcon})
    .addTo(map)
    .bindPopup(criarPopup(ponto));
});

// Adiciona marcadores Churra com ícone vermelho
churraPoints.forEach(function(ponto) {
  L.marker([ponto.lat, ponto.lng], {icon: churraIcon})
    .addTo(map)
    .bindPopup(criarPopup(ponto));
});
//*************************************************************************************************************************************************************************************************************************

function procurarPonto() {
  var nomeBusca = document.getElementById('buscaNome').value.trim().toLowerCase();
  var todosPontos = [...bordaleiraPoints, ...churraPoints];
  
  var pontoEncontrado = todosPontos.find(p => p.nome.toLowerCase().includes(nomeBusca));

  if (pontoEncontrado) {
    map.setView([pontoEncontrado.lat, pontoEncontrado.lng], 14); // Ajuste o nível de zoom se quiser
    L.popup()
      .setLatLng([pontoEncontrado.lat, pontoEncontrado.lng])
      .setContent(criarPopup(pontoEncontrado))
      .openOn(map);
  } else {
    alert("Ponto não encontrado. Verifique o nome digitado.");
  }
}

// Preenche o datalist com sugestões de nomes das explorações
function preencherDatalist() {
  const datalist = document.getElementById('nomesExploracoes');
  const todosPontos = [...bordaleiraPoints, ...churraPoints];

  todosPontos.forEach(ponto => {
    const option = document.createElement('option');
    option.value = ponto.nome;
    datalist.appendChild(option);
  });
}

// Executa a função ao carregar a página
preencherDatalist();
