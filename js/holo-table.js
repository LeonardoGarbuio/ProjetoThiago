export class HoloTable {
    constructor() {
        this.container = document.getElementById('cyberHud');
        this.wrapper = document.getElementById('cyberHudWrapper');

        if (!this.container || !this.wrapper) return;

        this.init();
    }

    init() {
        // Track mouse movement over the table wrapper
        this.wrapper.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Reset when mouse leaves
        this.wrapper.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.wrapper.getBoundingClientRect();

        // Calculate mouse position relative to center of table (range: -1 to 1)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Tilt Intensity
        const maxTilt = 15; // Max degrees

        // Invert X for natural feel, keep Y same
        const rotateY = x * maxTilt * 2;
        const rotateX = -y * maxTilt * 2;

        this.container.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    }

    handleMouseLeave() {
        // Return to flat state gently
        this.container.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
}

// Auto-init if on valid page
document.addEventListener('DOMContentLoaded', () => {
    new HoloTable();
});
