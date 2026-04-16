document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme when button is clicked
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                theme = 'dark';
            }
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    renderPlot();
});

function renderPlot() {
    const container = document.getElementById('plot-container');
    if (!container) return;

    // Generate data for a damped sine wave
    const x = [];
    const y = [];
    for (let i = 0; i < 100; i++) {
        const t = i / 10;
        x.push(t);
        y.push(Math.exp(-0.1 * t) * Math.sin(t));
    }

    const trace = {
        x: x,
        y: y,
        mode: 'lines',
        type: 'scatter',
        name: 'Damped Sine Wave',
        line: {
            color: '#0D8ABC',
            width: 3
        }
    };

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const layout = {
        title: 'Damped Harmonic Oscillator',
        xaxis: {
            title: 'Time (t)'
        },
        yaxis: {
            title: 'Amplitude'
        },
        paper_bgcolor: isDark ? '#1e1e1e' : '#ffffff',
        plot_bgcolor: isDark ? '#1e1e1e' : '#ffffff',
        font: {
            color: isDark ? '#e0e0e0' : '#333333'
        },
        margin: { t: 40, r: 20, b: 40, l: 40 }
    };

    const config = {
        responsive: true
    };

    Plotly.newPlot(container, [trace], layout, config);
}
