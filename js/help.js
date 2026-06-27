// Help Page JavaScript

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle clicked FAQ
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Search Functionality
document.getElementById('searchHelp')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Category Navigation
function showTopic(topic) {
    const topics = {
        'getting-started': 'How do I start learning to code?',
        'html-css': 'What programming languages do you cover?',
        'javascript': 'What programming languages do you cover?',
        'python': 'What programming languages do you cover?',
        'troubleshooting': 'How can I get help with my code?',
        'account': 'Account & Settings'
    };
    
    const searchBox = document.getElementById('searchHelp');
    if (searchBox && topics[topic]) {
        searchBox.value = topics[topic];
        searchBox.dispatchEvent(new Event('input'));
        
        // Scroll to FAQ
        document.querySelector('.faq-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log('💚 VictorNewb Help Center Loaded!');