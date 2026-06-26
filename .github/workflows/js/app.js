// ===== APP - MAIN ENTRY =====
const VictorNewbApp = {
    init() {
        // Inject all page HTML
        this.injectPages();
        
        // Initialize router
        VictorNewbRouter.init();

        // Theme toggle
        this.setupThemeToggle();

        // Logout handler
        this.setupLogout();

        console.log('🚀 VictorNewb v1.0 loaded successfully!');
        console.log('👤 Logged in as:', Auth.currentUser?.name || 'Guest');
    },

    injectPages() {
        const container = document.getElementById('pageContainer');
        
        container.innerHTML = `
            <!-- DASHBOARD -->
            <div id="dashboardPage" class="page active">
                <div class="page-header">
                    <h2>📊 Dashboard</h2>
                    <p>Welcome back, <span id="dashboardUserName">${Auth.currentUser?.name || 'User'}</span>!</p>
                </div>
                <div id="dashboardStats" class="grid-4" style="margin-bottom:32px;"></div>
                <div class="card">
                    <h3 style="margin-bottom:16px;">Recent Activity</h3>
                    <div id="dashboardActivity"></div>
                </div>
            </div>

            <!-- SOCIAL -->
            <div id="socialPage" class="page">
                <div class="page-header">
                    <h2>👥 Social Feed</h2>
                    <p>Connect and share with the community</p>
                </div>
                <div class="card" style="margin-bottom:24px;">
                    <form id="socialForm">
                        <textarea placeholder="What's on your mind, ${Auth.currentUser?.name || 'Victor'}?" rows="3"></textarea>
                        <button type="submit" class="btn btn-primary" style="margin-top:12px;">Post ✨</button>
                    </form>
                </div>
                <div id="socialFeed"></div>
            </div>

            <!-- PORTFOLIO -->
            <div id="portfolioPage" class="page">
                <div class="page-header">
                    <h2>🎨 Portfolio</h2>
                    <p>Showcasing my best work</p>
                </div>
                <div id="portfolioGrid" class="grid-2"></div>
            </div>

            <!-- ECOMMERCE -->
            <div id="ecommercePage" class="page">
                <div class="page-header">
                    <h2>🛒 Store</h2>
                    <p>Browse and buy awesome products</p>
                </div>
                <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;">
                    <div>
                        <h3 style="margin-bottom:16px;">Products</h3>
                        <div id="productGrid" class="grid-2"></div>
                    </div>
                    <div>
                        <div class="card" style="position:sticky;top:24px;">
                            <h3 style="margin-bottom:12px;">🛍️ Cart</h3>
                            <div id="cartItems"></div>
                            <div id="cartTotal" style="font-weight:700;font-size:18px;margin:12px 0;">Total: $0.00</div>
                            <button class="btn btn-primary" onclick="Ecommerce.checkout()" style="width:100%;">
                                Checkout →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GAME -->
            <div id="gamePage" class="page">
                <div class="page-header">
                    <h2>🎮 Tic-Tac-Toe</h2>
                    <p>Challenge yourself or a friend!</p>
                </div>
                <div class="game-container">
                    <div id="gameStatus" class="game-status">Player X's turn</div>
                    <div id="gameScores" style="margin-bottom:12px;">🏆 X: 0 | O: 0</div>
                    <div id="gameBoard" class="game-board"></div>
                    <button id="gameReset" class="btn btn-outline" style="margin-top:16px;">🔄 New Game</button>
                </div>
            </div>
        `;
    },

    setupThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        // Check saved theme
        const saved = localStorage.getItem('victornewb-theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('victornewb-theme', next);
        });
    },

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Auth.logout();
            });
        }
    }
};