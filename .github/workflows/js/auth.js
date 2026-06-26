// ===== AUTH SYSTEM =====
const Auth = {
    currentUser: null,
    users: [],

    init() {
        // Load users from localStorage
        this.loadUsers();
        
        // Check if user is already logged in
        const session = localStorage.getItem('victornewb-session');
        if (session) {
            try {
                const user = JSON.parse(session);
                this.currentUser = user;
                this.showApp();
            } catch (e) {
                localStorage.removeItem('victornewb-session');
            }
        }
    },

    loadUsers() {
        try {
            const data = localStorage.getItem('victornewb-users');
            this.users = data ? JSON.parse(data) : [];
        } catch (e) {
            this.users = [];
        }
    },

    saveUsers() {
        localStorage.setItem('victornewb-users', JSON.stringify(this.users));
    },

    // ===== SIGNUP =====
    signup(event) {
        event.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const username = document.getElementById('signupUsername').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        const errorEl = document.getElementById('signupError');

        // Clear previous error
        errorEl.textContent = '';

        // Validation
        if (!name || !email || !username || !password || !confirm) {
            errorEl.textContent = '⚠️ Please fill in all fields';
            return false;
        }

        if (password.length < 6) {
            errorEl.textContent = '⚠️ Password must be at least 6 characters';
            return false;
        }

        if (password !== confirm) {
            errorEl.textContent = '⚠️ Passwords do not match';
            return false;
        }

        // Check if email already exists
        if (this.users.some(u => u.email === email)) {
            errorEl.textContent = '⚠️ This email is already registered';
            return false;
        }

        // Check if username already exists
        if (this.users.some(u => u.username === username)) {
            errorEl.textContent = '⚠️ This username is already taken';
            return false;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            username,
            password, // In production, this would be hashed!
            createdAt: new Date().toISOString(),
            avatar: name.charAt(0).toUpperCase()
        };

        // Save user
        this.users.push(newUser);
        this.saveUsers();

        // Auto-login
        this.currentUser = newUser;
        localStorage.setItem('victornewb-session', JSON.stringify(newUser));
        
        // Show success and redirect
        this.showApp();
        this.showNotification('🎉 Account created successfully! Welcome, ' + name + '!');
        
        return false;
    },

    // ===== LOGIN =====
    login(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorEl = document.getElementById('loginError');

        // Clear previous error
        errorEl.textContent = '';

        if (!email || !password) {
            errorEl.textContent = '⚠️ Please enter email and password';
            return false;
        }

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);

        if (!user) {
            errorEl.textContent = '⚠️ Invalid email or password';
            return false;
        }

        // Login success
        this.currentUser = user;
        localStorage.setItem('victornewb-session', JSON.stringify(user));
        
        this.showApp();
        this.showNotification('✅ Welcome back, ' + user.name + '!');
        
        return false;
    },

    // ===== LOGOUT =====
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('victornewb-session');
            this.currentUser = null;
            this.hideApp();
            this.showNotification('👋 Logged out successfully');
            // Reset forms
            document.getElementById('loginFormElement').reset();
            document.getElementById('signupFormElement').reset();
            document.getElementById('loginError').textContent = '';
            document.getElementById('signupError').textContent = '';
        }
    },

    // ===== UI HELPERS =====
    showApp() {
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
        
        // Update user info in sidebar
        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userEmail').textContent = this.currentUser.email;
            document.getElementById('userAvatar').textContent = this.currentUser.avatar || this.currentUser.name.charAt(0);
        }
        
        // Initialize app
        if (typeof VictorNewbApp !== 'undefined') {
            VictorNewbApp.init();
        }
    },

    hideApp() {
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('appContainer').style.display = 'none';
    },

    showLogin() {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('signupForm').classList.remove('active');
        document.getElementById('loginError').textContent = '';
        document.getElementById('signupError').textContent = '';
        document.getElementById('loginFormElement').reset();
        document.getElementById('signupFormElement').reset();
    },

    showSignup() {
        document.getElementById('signupForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('loginError').textContent = '';
        document.getElementById('signupError').textContent = '';
        document.getElementById('loginFormElement').reset();
        document.getElementById('signupFormElement').reset();
    },

    showNotification(message) {
        // Create notification element
        const existing = document.querySelector('.auth-notification');
        if (existing) existing.remove();

        const notif = document.createElement('div');
        notif.className = 'auth-notification';
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 16px 24px;
            background: var(--bg-secondary);
            border: 2px solid var(--accent);
            border-radius: 12px;
            color: var(--text-primary);
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(100px)';
            notif.style.transition = 'all 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
};

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// ===== INIT AUTH ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
