// Dashboard JavaScript - TerraSphere HAB Monitoring System

class HABDashboard {
    constructor() {
        this.charts = {};
        this.currentData = {};
        this.filters = {
            timeRange: '30d',
            region: 'global'
        };
        this.isInitialized = false;
        this.updateInterval = null;
        this.kpiInterval = null;
        
        this.init();
    }

    async init() {
        // Prevent multiple initializations
        if (this.isInitialized) {
            this.cleanup();
        }
        
        this.setupEventListeners();
        
        try {
            // Load data first, then create charts
            await this.loadInitialData();
            this.createCharts();
            
            this.startRealTimeUpdates();
            this.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            // Show error and retry after 3 seconds
            this.showError('Erro na inicialização. Tentando novamente...');
            setTimeout(() => {
                this.init();
            }, 3000);
        }
        
        // Cleanup when page is about to unload
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    cleanup() {
        // Clear intervals
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        if (this.kpiInterval) {
            clearInterval(this.kpiInterval);
            this.kpiInterval = null;
        }
        
        // Destroy existing charts
        Object.keys(this.charts).forEach(chartKey => {
            if (this.charts[chartKey] && typeof this.charts[chartKey].destroy === 'function') {
                this.charts[chartKey].destroy();
            }
        });
        this.charts = {};
    }

    setupEventListeners() {
        // Filter controls
        document.getElementById('timeRange').addEventListener('change', (e) => {
            this.filters.timeRange = e.target.value;
            this.updateDashboard();
        });

        document.getElementById('regionFilter').addEventListener('change', (e) => {
            this.filters.region = e.target.value;
            this.updateDashboard();
        });

        // Refresh button
        document.getElementById('refreshData').addEventListener('click', () => {
            this.refreshData();
        });

        // Chart controls
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const metric = e.target.dataset.metric;
                this.updateTrendsChart(metric);
                
                // Update active state
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Export buttons
        document.getElementById('exportPDF').addEventListener('click', () => this.exportPDF());
        document.getElementById('exportCSV').addEventListener('click', () => this.exportCSV());
        document.getElementById('exportJSON').addEventListener('click', () => this.exportJSON());
        document.getElementById('shareReport').addEventListener('click', () => this.shareReport());
    }

    async loadInitialData() {
        this.showLoading(true);
        
        try {
            // Simulate API calls with realistic data
            this.currentData = await this.generateMockData();
            this.updateKPIs();
            this.updateAlerts();
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Erro ao carregar dados. Tentando novamente...');
            throw error; // Re-throw to prevent chart creation with no data
        } finally {
            this.showLoading(false);
        }
    }

    async generateMockData() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const timeRange = this.getTimeRangeInDays();
        const dates = this.generateDateRange(timeRange);

        return {
            kpis: {
                activeEvents: Math.floor(Math.random() * 50) + 100,
                affectedAreas: Math.floor(Math.random() * 30) + 70,
                toxinLevel: (Math.random() * 3 + 1).toFixed(1),
                riskLevel: ['Baixo', 'Moderado', 'Alto'][Math.floor(Math.random() * 3)]
            },
            trends: {
                events: dates.map(date => ({
                    date,
                    value: Math.floor(Math.random() * 20) + 5
                })),
                toxins: dates.map(date => ({
                    date,
                    value: Math.random() * 4 + 0.5
                })),
                impact: dates.map(date => ({
                    date,
                    value: Math.random() * 100 + 50
                }))
            },
            geographic: this.generateGeographicData(),
            toxinTypes: {
                PSP: Math.floor(Math.random() * 30) + 20,
                ASP: Math.floor(Math.random() * 25) + 15,
                NSP: Math.floor(Math.random() * 20) + 10,
                DSP: Math.floor(Math.random() * 15) + 8,
                Others: Math.floor(Math.random() * 10) + 5
            },
            economic: dates.slice(-12).map((date, index) => ({
                month: date.toLocaleDateString('pt-BR', { month: 'short' }),
                value: Math.random() * 500 + 200
            }))
        };
    }

    generateDateRange(days) {
        const dates = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date);
        }
        
        return dates;
    }

    generateGeographicData() {
        const regions = ['North Atlantic', 'South Atlantic', 'North Pacific', 'South Pacific', 'Mediterranean', 'Indian Ocean'];
        return regions.map(region => ({
            region,
            events: Math.floor(Math.random() * 15) + 5,
            riskLevel: Math.floor(Math.random() * 3) + 1
        }));
    }

    getTimeRangeInDays() {
        const ranges = {
            '7d': 7,
            '30d': 30,
            '90d': 90,
            '1y': 365
        };
        return ranges[this.filters.timeRange] || 30;
    }

    updateKPIs() {
        const kpis = this.currentData.kpis;
        
        document.getElementById('activeEvents').textContent = kpis.activeEvents;
        document.getElementById('affectedAreas').textContent = kpis.affectedAreas;
        document.getElementById('toxinLevel').textContent = kpis.toxinLevel;
        document.getElementById('riskLevel').textContent = kpis.riskLevel;

        // Animate KPI values
        this.animateKPIValues();
    }

    animateKPIValues() {
        const kpiValues = document.querySelectorAll('.kpi-value');
        kpiValues.forEach(element => {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        });
    }

    createCharts() {
        // Verify that chart elements exist before creating charts
        const chartElements = [
            'trendsChart',
            'geoChart', 
            'toxinChart',
            'economicChart'
        ];
        
        const missingElements = chartElements.filter(id => !document.getElementById(id));
        if (missingElements.length > 0) {
            console.warn('Missing chart elements:', missingElements);
            return;
        }
        
        // Wait a bit to ensure DOM is fully ready
        setTimeout(() => {
            this.createTrendsChart();
            this.createGeographicChart();
            this.createToxinChart();
            this.createEconomicChart();
        }, 100);
    }

    createTrendsChart() {
        const element = document.getElementById('trendsChart');
        if (!element) {
            console.warn('trendsChart element not found');
            return;
        }
        
        const ctx = element.getContext('2d');
        const data = this.currentData.trends.events;

        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'Eventos de HAB',
                    data: data.map(d => d.value),
                    borderColor: '#1e88e5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1e88e5',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    createGeographicChart() {
        const element = document.getElementById('geoChart');
        if (!element) {
            console.warn('geoChart element not found');
            return;
        }
        
        const ctx = element.getContext('2d');
        const data = this.currentData.geographic;

        this.charts.geographic = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.region),
                datasets: [{
                    label: 'Eventos por Região',
                    data: data.map(d => d.events),
                    backgroundColor: data.map(d => {
                        if (d.riskLevel === 3) return '#e74c3c';
                        if (d.riskLevel === 2) return '#f39c12';
                        return '#27ae60';
                    }),
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createToxinChart() {
        const element = document.getElementById('toxinChart');
        if (!element) {
            console.warn('toxinChart element not found');
            return;
        }
        
        const ctx = element.getContext('2d');
        const data = this.currentData.toxinTypes;

        this.charts.toxin = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#e74c3c',
                        '#f39c12',
                        '#3498db',
                        '#27ae60',
                        '#9b59b6'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    createEconomicChart() {
        const element = document.getElementById('economicChart');
        if (!element) {
            console.warn('economicChart element not found');
            return;
        }
        
        const ctx = element.getContext('2d');
        const data = this.currentData.economic;

        this.charts.economic = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.month),
                datasets: [{
                    label: 'Impacto Econômico (Milhões USD)',
                    data: data.map(d => d.value),
                    backgroundColor: 'rgba(30, 136, 229, 0.8)',
                    borderColor: '#1e88e5',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    updateTrendsChart(metric) {
        if (!this.charts.trends) return;

        const data = this.currentData.trends[metric];
        const labels = {
            events: 'Eventos de HAB',
            toxins: 'Nível de Toxinas (mg/L)',
            impact: 'Impacto Econômico (Milhões USD)'
        };

        this.charts.trends.data.datasets[0].label = labels[metric];
        this.charts.trends.data.datasets[0].data = data.map(d => d.value);
        this.charts.trends.update('active');
    }

    updateAlerts() {
        const alerts = [
            {
                type: 'critical',
                title: 'Floração Severa Detectada',
                location: 'Costa da Califórnia, EUA',
                time: 'Há 2 horas'
            },
            {
                type: 'warning',
                title: 'Aumento de Toxinas',
                location: 'Golfo do México',
                time: 'Há 4 horas'
            },
            {
                type: 'info',
                title: 'Condições Favoráveis',
                location: 'Mar Mediterrâneo',
                time: 'Há 6 horas'
            }
        ];

        // Add random variation to alerts
        alerts.forEach(alert => {
            const randomHours = Math.floor(Math.random() * 12) + 1;
            alert.time = `Há ${randomHours} horas`;
        });

        this.renderAlerts(alerts);
    }

    renderAlerts(alerts) {
        const alertsList = document.getElementById('alertsList');
        alertsList.innerHTML = '';

        alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert-item ${alert.type}`;
            
            alertElement.innerHTML = `
                <div class="alert-icon">
                    <i class="fas fa-${alert.type === 'critical' ? 'exclamation-circle' : 
                                      alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-location">${alert.location}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
            `;
            
            alertsList.appendChild(alertElement);
        });
    }

    async updateDashboard() {
        this.showLoading(true);
        
        try {
            // Simulate API call with new filters
            await new Promise(resolve => setTimeout(resolve, 800));
            
            this.currentData = await this.generateMockData();
            this.updateKPIs();
            this.updateAlerts();
            
            // Only update charts if they exist, otherwise create them
            if (Object.keys(this.charts).length > 0) {
                this.updateCharts();
            } else {
                this.createCharts();
            }
            
        } catch (error) {
            console.error('Error updating dashboard:', error);
            this.showError('Erro ao atualizar dados.');
        } finally {
            this.showLoading(false);
        }
    }

    updateCharts() {
        // Update all charts with new data
        Object.keys(this.charts).forEach(chartKey => {
            if (this.charts[chartKey]) {
                this.charts[chartKey].destroy();
            }
        });
        
        this.createCharts();
    }

    async refreshData() {
        const refreshBtn = document.getElementById('refreshData');
        const icon = refreshBtn.querySelector('i');
        
        // Animate refresh button
        icon.style.animation = 'spin 1s linear infinite';
        refreshBtn.disabled = true;
        
        try {
            await this.updateDashboard();
        } finally {
            icon.style.animation = '';
            refreshBtn.disabled = false;
        }
    }

    startRealTimeUpdates() {
        // Clear existing intervals first
        if (this.updateInterval) clearInterval(this.updateInterval);
        if (this.kpiInterval) clearInterval(this.kpiInterval);
        
        // Update data every 5 minutes
        this.updateInterval = setInterval(() => {
            this.updateDashboard();
        }, 300000);

        // Update KPIs every 30 seconds with small variations
        this.kpiInterval = setInterval(() => {
            this.updateKPIsRealTime();
        }, 30000);
    }

    updateKPIsRealTime() {
        const kpis = this.currentData.kpis;
        
        // Small random variations
        const activeEvents = kpis.activeEvents + Math.floor(Math.random() * 6) - 3;
        const affectedAreas = kpis.affectedAreas + Math.floor(Math.random() * 4) - 2;
        const toxinLevel = (parseFloat(kpis.toxinLevel) + (Math.random() * 0.4) - 0.2).toFixed(1);
        
        document.getElementById('activeEvents').textContent = Math.max(0, activeEvents);
        document.getElementById('affectedAreas').textContent = Math.max(0, affectedAreas);
        document.getElementById('toxinLevel').textContent = Math.max(0, toxinLevel);
        
        this.animateKPIValues();
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }

    showError(message) {
        // Simple error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Export functions
    exportPDF() {
        this.showNotification('Gerando relatório PDF...', 'info');
        // Simulate PDF generation
        setTimeout(() => {
            this.showNotification('Relatório PDF baixado com sucesso!', 'success');
        }, 2000);
    }

    exportCSV() {
        const csvData = this.generateCSVData();
        this.downloadFile(csvData, 'hab_data.csv', 'text/csv');
        this.showNotification('Dados CSV exportados com sucesso!', 'success');
    }

    exportJSON() {
        const jsonData = JSON.stringify(this.currentData, null, 2);
        this.downloadFile(jsonData, 'hab_data.json', 'application/json');
        this.showNotification('Dados JSON exportados com sucesso!', 'success');
    }

    shareReport() {
        if (navigator.share) {
            navigator.share({
                title: 'Relatório HAB - TerraSphere',
                text: 'Confira os dados mais recentes sobre florações de algas nocivas',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showNotification('Link copiado para a área de transferência!', 'success');
        }
    }

    generateCSVData() {
        const headers = ['Data', 'Eventos', 'Toxinas', 'Impacto'];
        const rows = this.currentData.trends.events.map((event, index) => [
            event.date.toISOString().split('T')[0],
            event.value,
            this.currentData.trends.toxins[index]?.value.toFixed(2) || '',
            this.currentData.trends.impact[index]?.value.toFixed(2) || ''
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Prevent multiple instances
    if (window.habDashboard) {
        window.habDashboard.cleanup();
    }
    
    // Wait a bit to ensure all resources are loaded
    await new Promise(resolve => setTimeout(resolve, 100));
    
    window.habDashboard = new HABDashboard();
});

// Cleanup when navigating away
window.addEventListener('beforeunload', () => {
    if (window.habDashboard) {
        window.habDashboard.cleanup();
    }
});
