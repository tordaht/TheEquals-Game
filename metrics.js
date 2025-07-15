// Metrik Sistemi - Direktörün İstediği Somut Metrikler
const metricsSystem = {
    // Lighthouse Metrikleri
    lighthouse: {
        performance: 0,
        accessibility: 0,
        seo: 0,
        bestPractices: 0,
        
        // Lighthouse skorunu hesapla
        calculateScore: function() {
            return {
                performance: this.performance,
                accessibility: this.accessibility,
                seo: this.seo,
                bestPractices: this.bestPractices,
                average: (this.performance + this.accessibility + this.seo + this.bestPractices) / 4
            };
        }
    },
    
    // Test Coverage Metrikleri
    testCoverage: {
        total: 0,
        covered: 0,
        percentage: 0,
        
        // Test coverage hesapla
        calculateCoverage: function() {
            this.percentage = this.total > 0 ? (this.covered / this.total) * 100 : 0;
            return this.percentage;
        }
    },
    
    // Linter Metrikleri
    linter: {
        errors: 0,
        warnings: 0,
        totalIssues: 0,
        
        // Linter sorunlarını hesapla
        calculateIssues: function() {
            this.totalIssues = this.errors + this.warnings;
            return this.totalIssues;
        }
    },
    
    // Performance Metrikleri
    performance: {
        fcp: 0, // First Contentful Paint
        lcp: 0, // Largest Contentful Paint
        fid: 0, // First Input Delay
        cls: 0, // Cumulative Layout Shift
        
        // Performance skorunu hesapla
        calculateScore: function() {
            // Web Vitals skorları (0-100)
            const fcpScore = this.fcp < 1800 ? 100 : Math.max(0, 100 - ((this.fcp - 1800) / 100));
            const lcpScore = this.lcp < 2500 ? 100 : Math.max(0, 100 - ((this.lcp - 2500) / 100));
            const fidScore = this.fid < 100 ? 100 : Math.max(0, 100 - ((this.fid - 100) / 10));
            const clsScore = this.cls < 0.1 ? 100 : Math.max(0, 100 - (this.cls * 1000));
            
            return {
                fcp: fcpScore,
                lcp: lcpScore,
                fid: fidScore,
                cls: clsScore,
                average: (fcpScore + lcpScore + fidScore + clsScore) / 4
            };
        }
    },
    
    // Oyun Performans Metrikleri
    gameMetrics: {
        loadTime: 0,
        renderTime: 0,
        memoryUsage: 0,
        frameRate: 0,
        
        // Oyun performansını hesapla
        calculateGamePerformance: function() {
            return {
                loadTime: this.loadTime,
                renderTime: this.renderTime,
                memoryUsage: this.memoryUsage,
                frameRate: this.frameRate,
                performanceScore: this.frameRate > 30 ? 100 : (this.frameRate / 30) * 100
            };
        }
    },
    
    // Metrikleri topla ve raporla
    generateReport: function() {
        const lighthouseScore = this.lighthouse.calculateScore();
        const testCoverage = this.testCoverage.calculateCoverage();
        const linterIssues = this.linter.calculateIssues();
        const performanceScore = this.performance.calculateScore();
        const gamePerformance = this.gameMetrics.calculateGamePerformance();
        
        return {
            timestamp: new Date().toISOString(),
            lighthouse: lighthouseScore,
            testCoverage: testCoverage,
            linterIssues: linterIssues,
            performance: performanceScore,
            gamePerformance: gamePerformance,
            overallScore: this.calculateOverallScore(lighthouseScore, testCoverage, linterIssues, performanceScore, gamePerformance)
        };
    },
    
    // Genel skor hesapla
    calculateOverallScore: function(lighthouse, testCoverage, linterIssues, performance, gamePerformance) {
        const lighthouseWeight = 0.3;
        const testWeight = 0.2;
        const linterWeight = 0.1;
        const performanceWeight = 0.25;
        const gameWeight = 0.15;
        
        const lighthouseScore = lighthouse.average;
        const testScore = testCoverage;
        const linterScore = linterIssues === 0 ? 100 : Math.max(0, 100 - (linterIssues * 5));
        const performanceScore = performance.average;
        const gameScore = gamePerformance.performanceScore;
        
        return Math.round(
            (lighthouseScore * lighthouseWeight) +
            (testScore * testWeight) +
            (linterScore * linterWeight) +
            (performanceScore * performanceWeight) +
            (gameScore * gameWeight)
        );
    },
    
    // Metrikleri başlat
    init: function() {
        console.log('Metrik sistemi başlatıldı');
        this.startPerformanceMonitoring();
    },
    
    // Performance monitoring başlat
    startPerformanceMonitoring: function() {
        // First Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.performance.fcp = entry.startTime;
                        console.log('FCP:', this.performance.fcp);
                    }
                }
            });
            observer.observe({ entryTypes: ['paint'] });
        }
        
        // Memory usage
        if ('memory' in performance) {
            setInterval(() => {
                this.gameMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
            }, 1000);
        }
        
        // Frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        const countFrames = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                this.gameMetrics.frameRate = frameCount;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        };
        
        requestAnimationFrame(countFrames);
    }
};

// Metrik sistemi global olarak erişilebilir yap
window.metricsSystem = metricsSystem;

// Sayfa yüklendiğinde metrik sistemi başlat
document.addEventListener('DOMContentLoaded', () => {
    metricsSystem.init();
});

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = metricsSystem;
} 