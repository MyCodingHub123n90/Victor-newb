// ===== PORTFOLIO =====
const Portfolio = {
    projects: [
        { title: 'E-Commerce Platform', category: 'Web App', tech: 'React, Node.js', image: '🛍️' },
        { title: 'AI Chatbot', category: 'AI/ML', tech: 'Python, TensorFlow', image: '🤖' },
        { title: 'Mobile Fitness App', category: 'Mobile', tech: 'Flutter, Firebase', image: '🏃' },
        { title: 'Blockchain Wallet', category: 'Web3', tech: 'Solidity, Web3.js', image: '⛓️' }
    ],

    init() {
        this.renderProjects();
    },

    renderProjects() {
        const container = document.getElementById('portfolioGrid');
        if (!container) return;

        container.innerHTML = this.projects.map(project => `
            <div class="card" style="cursor:pointer;">
                <div style="font-size:48px;text-align:center;margin-bottom:12px;">${project.image}</div>
                <h3 style="font-weight:600;margin-bottom:4px;">${project.title}</h3>
                <div style="color:var(--text-secondary);font-size:14px;margin-bottom:4px;">${project.category}</div>
                <div style="font-size:13px;color:var(--accent);">${project.tech}</div>
            </div>
        `).join('');
    }
};