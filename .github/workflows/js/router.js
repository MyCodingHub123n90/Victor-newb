// ===== ROUTER =====
const VictorNewbRouter = {
    currentPage: 'dashboard',
    pages: {},

    init() {
        // Register all pages
        document.querySelectorAll('.nav-links li').forEach(item => {
            const page = item.dataset.page;
            this.pages[page] = document.getElementById(`${page}Page`);
            
            item.addEventListener('click', () => {
                this.navigateTo(page);
            });
        });

        // Load initial page
        this.navigateTo('dashboard');
    },

    navigateTo(page) {
        // Update nav
        document.querySelectorAll('.nav-links li').forEach(el => {
            el.classList.toggle('active', el.dataset.page === page);
        });

        // Show page
        Object.keys(this.pages).forEach(key => {
            const el = this.pages[key];
            if (el) {
                el.classList.toggle('active', key === page);
            }
        });

        this.currentPage = page;
        
        // Trigger page-specific init
        if (page === 'dashboard' && typeof Dashboard !== 'undefined') {
            Dashboard.init();
        } else if (page === 'social' && typeof Social !== 'undefined') {
            Social.init();
        } else if (page === 'portfolio' && typeof Portfolio !== 'undefined') {
            Portfolio.init();
        } else if (page === 'ecommerce' && typeof Ecommerce !== 'undefined') {
            Ecommerce.init();
        } else if (page === 'game' && typeof Game !== 'undefined') {
            Game.init();
        }
    }
};