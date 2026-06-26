// ===== DASHBOARD =====
const Dashboard = {
    init() {
        this.renderStats();
        this.renderRecentActivity();
        this.updateGreeting();
    },

    updateGreeting() {
        const nameEl = document.getElementById('dashboardUserName');
        if (nameEl && Auth.currentUser) {
            nameEl.textContent = Auth.currentUser.name;
        }
    },

    renderStats() {
        const stats = [
            { icon: '👥', label: 'Total Users', value: '1,284', change: '+12%' },
            { icon: '💰', label: 'Revenue', value: '$1,000,000', change: '+8.3%' },
            { icon: '📦', label: 'Orders', value: '356', change: '+5.7%' },
            { icon: '⭐', label: 'Rating', value: '4.8', change: '+0.2' }
        ];

        const container = document.getElementById('dashboardStats');
        if (!container) return;

        container.innerHTML = stats.map(stat => `
            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:start;">
                    <div>
                        <div class="card-title">${stat.label}</div>
                        <div class="card-value">${stat.value}</div>
                        <div style="color:#22c55e;font-size:14px;margin-top:4px;">${stat.change}</div>
                    </div>
                    <div class="card-icon">${stat.icon}</div>
                </div>
            </div>
        `).join('');
    },

    renderRecentActivity() {
        const activities = [
            { user: 'Alice Johnson', action: 'made a purchase', time: '2 min ago' },
            { user: 'Bob Smith', action: 'posted a new project', time: '15 min ago' },
            { user: 'Carol White', action: 'joined the community', time: '1 hour ago' },
            { user: 'David Brown', action: 'left a review', time: '3 hours ago' }
        ];

        const container = document.getElementById('dashboardActivity');
        if (!container) return;

        container.innerHTML = activities.map(act => `
            <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color);">
                <div class="post-avatar" style="width:36px;height:36px;font-size:14px;">${act.user[0]}</div>
                <div>
                    <div style="font-weight:500;">${act.user}</div>
                    <div style="font-size:14px;color:var(--text-secondary);">
                        ${act.action} <span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${act.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
};