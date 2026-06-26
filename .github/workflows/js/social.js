// ===== SOCIAL =====
const Social = {
    posts: [
        {
            id: 1,
            user: 'Victor Newb',
            username: '@victornewb',
            content: '🚀 Just launched VictorNewb! A multi-purpose platform with social, dashboard, portfolio, e-commerce, and games. Check it out!',
            time: '5 min ago',
            likes: 24,
            comments: 8
        },
        {
            id: 2,
            user: 'Tech Enthusiast',
            username: '@techie',
            content: 'Building the future, one line of code at a time. 💻✨',
            time: '1 hour ago',
            likes: 42,
            comments: 12
        }
    ],

    init() {
        this.renderPosts();
        this.setupPostForm();
    },

    renderPosts() {
        const container = document.getElementById('socialFeed');
        if (!container) return;

        container.innerHTML = this.posts.map(post => `
            <div class="post">
                <div class="post-header">
                    <div class="post-avatar">${post.user[0]}</div>
                    <div>
                        <div class="post-user">${post.user}</div>
                        <div class="post-time">${post.username} · ${post.time}</div>
                    </div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button onclick="Social.likePost(${post.id})">❤️ ${post.likes}</button>
                    <button>💬 ${post.comments}</button>
                    <button>🔗 Share</button>
                </div>
            </div>
        `).join('');
    },

    setupPostForm() {
        const form = document.getElementById('socialForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('textarea');
            if (input.value.trim()) {
                const currentUser = Auth.currentUser;
                this.posts.unshift({
                    id: Date.now(),
                    user: currentUser ? currentUser.name : 'Anonymous',
                    username: currentUser ? '@' + currentUser.username : '@anonymous',
                    content: input.value,
                    time: 'Just now',
                    likes: 0,
                    comments: 0
                });
                this.renderPosts();
                input.value = '';
                Auth.showNotification('✅ Post published successfully!');
            }
        });
    },

    likePost(id) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            post.likes++;
            this.renderPosts();
        }
    }
};