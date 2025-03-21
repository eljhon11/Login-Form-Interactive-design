document.addEventListener('DOMContentLoaded', function() {
    // Interactive background
    const background = document.querySelector('.background');
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = 0.03 * (index + 1);
            const offsetX = (x - 0.5) * speed * 100;
            const offsetY = (y - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.2}deg)`;
        });
    });
    
    // Password toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const loginBtn = document.querySelector('.login-btn');
    
    // Input focus effects
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Simple validation on blur
            if (this.value.trim() === '') {
                this.parentElement.classList.add('error');
                
                // Create error message if it doesn't exist
                if (!this.parentElement.querySelector('.error-message')) {
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = `${this.getAttribute('placeholder')} is required`;
                    this.parentElement.appendChild(errorMsg);
                }
            } else {
                this.parentElement.classList.remove('error');
                
                // Remove error message if it exists
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
                
                // Add success class
                this.parentElement.classList.add('success');
            }
        });
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if form is valid
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.parentElement.classList.add('error');
                
                // Create error message if it doesn't exist
                if (!input.parentElement.querySelector('.error-message')) {
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = `${input.getAttribute('placeholder')} is required`;
                    input.parentElement.appendChild(errorMsg);
                }
                
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading state
            loginBtn.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                
                // Show success message
                showSuccessMessage();
            }, 2000);
        }
    });
    
    // Success message
    function showSuccessMessage() {
        // Create success message if it doesn't exist
        if (!document.querySelector('.success-message')) {
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <div class="success-icon"></div>
                <h3>Login Successful!</h3>
                <p>You will be redirected to the dashboard shortly.</p>
            `;
            
            document.querySelector('.login-container').appendChild(successMsg);
        }
        
        // Show success message
        setTimeout(() => {
            document.querySelector('.success-message').classList.add('show');
        }, 100);
        
        // Redirect after a delay (simulated)
        setTimeout(() => {
            document.querySelector('.success-message').innerHTML += '<p>Redirecting...</p>';
            
            // In a real application, you would redirect to another page
            // window.location.href = 'dashboard.html';
        }, 3000);
    }
    
    // Social login buttons hover effect
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function() {
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${0}px`;
            ripple.style.top = `${0}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add particle effect to the background
    createParticles();
});

// Particle effect
function createParticles() {
    const particleCount = 50;
    const background = document.querySelector('.background');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        background.appendChild(particle);
    }
}

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);