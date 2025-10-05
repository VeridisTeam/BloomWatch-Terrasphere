// Interactive Map with Leaflet.js for HAB Monitoring
class HABMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.currentLayer = null;
        this.habData = [];
        this.init();
    }

    init() {
        this.initializeMap();
        this.loadHABData();

        this.startRealTimeUpdates();
    }

    initializeMap() {
        // Initialize map centered on Brazil
        this.map = L.map('interactive-map').setView([-14.2350, -51.9253], 4);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Add satellite layer option
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        // Layer control
        const baseMaps = {
            "Mapa": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }),
            "Satélite": satelliteLayer
        };

        L.control.layers(baseMaps).addTo(this.map);

        // Add scale control
        L.control.scale().addTo(this.map);
    }

    loadHABData() {
        // Simulated HAB data for Brazilian coast
        this.habData = [
	{
		"eventId": 1,
		"anoOcorrencia": 2007,
		"cidade": "Fortaleza",
		"estado": "Ceará",
		"localEspecifico": "Costa Marítima",
		"latitude": -3.6946330000000001,
		"longitude": -38.480491000000001,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 2,
		"anoOcorrencia": 2025,
		"cidade": "Santarém",
		"estado": "Pará",
		"localEspecifico": "Praias de Ponta de Pedras e Alter do Chão",
		"latitude": -2.504264,
		"longitude": -54.954642999999997,
		"ondeOcorreu": "Rio (água doce)",
		"tiposDeAlga": "Cianobactérias (Chroococcales e Nostocales)",
		"fonte": "G1 Globo (14/03/2025)"
	},
	{
		"eventId": 3,
		"anoOcorrencia": 2024,
		"cidade": "Recife",
		"estado": "Pernambuco",
		"localEspecifico": "Praia de Maracaípe",
		"latitude": -8.5254999999999992,
		"longitude": -35.006999999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Microalga tóxica (associada a maré vermelha)",
		"fonte": "G1 Globo (02/02/2024)"
	},
	{
		"eventId": 4,
		"anoOcorrencia": 2024,
		"cidade": "Tamandaré",
		"estado": "Pernambuco",
		"localEspecifico": "Praias do litoral sul",
		"latitude": -8.7484500000000001,
		"longitude": -35.103900000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Microalga tóxica (associada a maré vermelha)",
		"fonte": "G1 Globo (02/02/2024)"
	},
	{
		"eventId": 5,
		"anoOcorrencia": 2024,
		"cidade": "Barra de Santo Antônio",
		"estado": "Alagoas",
		"localEspecifico": "Praia de Carro Quebrado",
		"latitude": -9.3503500000000006,
		"longitude": -35.466380000000001,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Algas de cor avermelhada (associada a maré vermelha)",		"fonte": "G1 Globo (02/02/2024)"
	},
	{
		"eventId": 6,
		"anoOcorrencia": 2024,
		"cidade": "Cabo Frio",
		"estado": "Rio de Janeiro",
		"localEspecifico": "Praia do Forte",
		"latitude": -22.887286,
		"longitude": -42.018289000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Algas em grande quantidade",
		"fonte": "G1 Globo (02/02/2024)"
	},
	{
		"eventId": 7,
		"anoOcorrencia": 2007,
		"cidade": "Ilha dos Gatos",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.806711,
		"longitude": -45.671792000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 8,
		"anoOcorrencia": 2007,
		"cidade": "Ilha das Couves",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.424674,
		"longitude": -44.852370999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 9,
		"anoOcorrencia": 2007,
		"cidade": "Cigarras",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.730314,
		"longitude": -45.399230000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 10,
		"anoOcorrencia": 2007,
		"cidade": "Bom Abrigo",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -25.119218,
		"longitude": -47.864998999999997,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 11,
		"anoOcorrencia": 2007,
		"cidade": "Sítio Grande",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.043530000000001,
		"longitude": -46.488864,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 12,
		"anoOcorrencia": 2007,
		"cidade": "Praia Do Tombo",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.014620000000001,
		"longitude": -46.272089999999999,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 13,
		"anoOcorrencia": 2007,
		"cidade": "Grajaú",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.770692,
		"longitude": -46.656367000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 14,
		"anoOcorrencia": 2007,
		"cidade": "Pereirinha",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -25.063891999999999,
		"longitude": -47.912869999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 15,
		"anoOcorrencia": 2007,
		"cidade": "Guarau",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.370956,
		"longitude": -47.012636999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 16,
		"anoOcorrencia": 2007,
		"cidade": "Cibratel",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.214091,
		"longitude": -46.822311999999997,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 17,
		"anoOcorrencia": 2007,
		"cidade": "Sonhos",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.194431999999999,
		"longitude": -46.798295000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 18,
		"anoOcorrencia": 2007,
		"cidade": "Porchat",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.983255,
		"longitude": -46.366971999999997,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 19,
		"anoOcorrencia": 2007,
		"cidade": "Tombo",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.014970000000002,
		"longitude": -46.272711000000001,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 20,
		"anoOcorrencia": 2007,
		"cidade": "Guaiuba",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -24.018322999999999,
		"longitude": -46.292512000000002,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 21,
		"anoOcorrencia": 2007,
		"cidade": "Tijucopava",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": 23.913181999999999,
		"longitude": -46.168208999999997,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 22,
		"anoOcorrencia": 2007,
		"cidade": "São Lourenço",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.792643000000002,
		"longitude": -45.991191999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 34,
		"anoOcorrencia": 2007,
		"cidade": "Enseada",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.986930999999998,
		"longitude": -46.215705,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 35,
		"anoOcorrencia": 2007,
		"cidade": "Baleia",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.776516999999998,
		"longitude": -45.668022999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 36,
		"anoOcorrencia": 2007,
		"cidade": "Toque Toque Grande",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.833946000000001,
		"longitude": -45.511214000000002,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 37,
		"anoOcorrencia": 2007,
		"cidade": "Fortaleza",
		"estado": "Ceará",
		"localEspecifico": "Costa Marítima",
		"latitude": -3.6946330000000001,
		"longitude": -38.480491000000001,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 38,
		"anoOcorrencia": 2007,
		"cidade": "Lamberto",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.496877999999999,
		"longitude": -45.111172000000003,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 39,
		"anoOcorrencia": 2007,
		"cidade": "Engenho",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.764523000000001,
		"longitude": -45.780813000000002,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 40,
		"anoOcorrencia": 2007,
		"cidade": "Almada",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.360799,
		"longitude": -44.888503,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 41,
		"anoOcorrencia": 2007,
		"cidade": "Ilha da Rapada",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.160239000000001,
		"longitude": -44.665106999999999,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 42,
		"anoOcorrencia": 2007,
		"cidade": "Praia Das Conchas",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.386695,
		"longitude": -44.962502999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 43,
		"anoOcorrencia": 2007,
		"cidade": "Ilha Anchieta",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.553265,
		"longitude": -45.058512999999998,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	},
	{
		"eventId": 44,
		"anoOcorrencia": 2007,
		"cidade": "Ponta da Sela",
		"estado": "São Paulo",
		"localEspecifico": "Costa Marítima",
		"latitude": -23.883659000000002,
		"longitude": -45.462769999999999,
		"ondeOcorreu": "Costa Marítima",
		"tiposDeAlga": "Cianobactérias (Chroococcales, Oscillatoriales, Nostocales, Stigonematales)",
		"fonte": "Lilian Mós Blois Crispino (2007)"
	}
];

        this.addMarkersToMap();
        this.updateStatistics();
    }

    addMarkersToMap() {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        this.habData.forEach(point => {
            const marker = this.createMarker(point);
            this.markers.push(marker);
            marker.addTo(this.map);
        });
    }

    createMarker(data) {
        const colors = {
            low: '#2ecc71',
            medium: '#f39c12', 
            high: '#e74c3c',
            critical: '#8e44ad'
        };

        const sizes = {
            low: 8,
            medium: 12,
            high: 16,
            critical: 20
        };

        const marker = L.circleMarker([data.latitude, data.longitude], {
            color: colors[this.determineLevel(data.tiposDeAlga, data.anoOcorrencia)],
            fillColor: colors[this.determineLevel(data.tiposDeAlga, data.anoOcorrencia)],
            fillOpacity: 0.7,
            radius: sizes[this.determineLevel(data.tiposDeAlga, data.anoOcorrencia)],
            weight: 2
        });

        // Create popup content
        const popupContent = `
            <div class="hab-popup">
                <h4><i class="fas fa-map-marker-alt"></i> ${data.cidade}, ${data.estado}</h4>
                <div class="popup-content">
                    <div class="popup-row">
                        <span class="popup-label">Ano de Ocorrência:</span>
                        <span class="popup-value">${data.anoOcorrencia}</span>
                    </div>
                    <div class="popup-row">
                        <span class="popup-label">Local Específico:</span>
                        <span class="popup-value">${data.localEspecifico || 'N/A'}</span>
                    </div>
                    <div class="popup-row">
                        <span class="popup-label">Onde Ocorreu:</span>
                        <span class="popup-value">${data.ondeOcorreu || 'N/A'}</span>
                    </div>
                    <div class="popup-row">
                        <span class="popup-label">Tipos de Alga:</span>
                        <span class="popup-value"><em>${data.tiposDeAlga}</em></span>
                    </div>
                    <div class="popup-row">
                        <span class="popup-label">Fonte:</span>
                        <span class="popup-value">${data.fonte || 'N/A'}</span>
                    </div>
                    <div class="popup-row">
                        <span class="popup-label">Nível de Risco:</span>
                        <span class="popup-value level-${this.determineLevel(data.tiposDeAlga, data.anoOcorrencia)}">${this.getLevelText(this.determineLevel(data.tiposDeAlga, data.anoOcorrencia))}</span>
                    </div>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });

        return marker;
    }

    determineLevel(tiposDeAlga, anoOcorrencia) {
        const currentYear = new Date().getFullYear();
        const isRecent = (currentYear - anoOcorrencia) <= 5; // Considera recente se for nos últimos 5 anos

        if (tiposDeAlga.includes("tóxica") || tiposDeAlga.includes("maré vermelha")) {
            return 'high';
        } else if (tiposDeAlga.includes("Cianobactérias")) {
            return 'medium';
        } else if (tiposDeAlga.includes("grande quantidade")) {
            return 'medium';
        } else if (tiposDeAlga.includes("moderada")) {
            return 'low';
        } else if (isRecent) {
            return 'low'; // Se for recente, mas não tóxica ou cianobactéria, considera baixo
        }
        return 'low'; // Padrão para baixo risco
    }

    getLevelText(level) {
        const texts = {
            low: 'Baixo',
            medium: 'Médio',
            high: 'Alto', 
            critical: 'Crítico'
        };
        return texts[level] || level;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }



    updateStatistics() {
        const totalOccurrences = this.habData.length;
        const highRiskCount = this.habData.filter(d => this.determineLevel(d.tiposDeAlga, d.anoOcorrencia) === 'high').length;
        const mediumRiskCount = this.habData.filter(d => this.determineLevel(d.tiposDeAlga, d.anoOcorrencia) === 'medium').length;
        const lowRiskCount = this.habData.filter(d => this.determineLevel(d.tiposDeAlga, d.anoOcorrencia) === 'low').length;
        
        document.getElementById('total-occurrences').textContent = totalOccurrences;
        document.getElementById('high-risk-count').textContent = highRiskCount;
        document.getElementById('medium-risk-count').textContent = mediumRiskCount;
        document.getElementById('low-risk-count').textContent = lowRiskCount;
        document.getElementById('last-update').textContent = 'Agora';
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.simulateDataUpdate();
        }, 30000);
    }

    simulateDataUpdate() {
        // Randomly update some data points
        const updateCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < updateCount; i++) {
            const randomIndex = Math.floor(Math.random() * this.habData.length);
            const point = this.habData[randomIndex];
            
            // Simulate concentration change
            const change = (Math.random() - 0.5) * 0.2; // ±10% change
            point.concentration = Math.max(1000, Math.floor(point.concentration * (1 + change)));
            
            // Update level based on new concentration
            if (point.concentration < 10000) point.level = 'low';
            else if (point.concentration < 1000000) point.level = 'medium';
            else if (point.concentration < 10000000) point.level = 'high';
            else point.level = 'critical';
            
            // Update date
            point.date = new Date().toISOString().split('T')[0];
        }
        
        // Refresh markers and statistics
        this.addMarkersToMap();
        this.updateStatistics();
        
        // Update last update time
        const now = new Date();
        document.getElementById('last-update').textContent = 
            now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    showDetails(location) {
        const point = this.habData.find(d => d.location === location);
        if (point) {
            alert(`Detalhes para ${location}:\n\nConcentração: ${point.concentration.toLocaleString()} células/L\nEspécie: ${point.species}\nNível: ${this.getLevelText(point.level)}\nData: ${this.formatDate(point.date)}`);
        }
    }

    showTrend(location) {
        alert(`Análise de tendência para ${location} será implementada em breve.`);
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('interactive-map')) {
        window.habMap = new HABMap();
    }
});
