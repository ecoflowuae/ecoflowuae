
// Function to handle catalogue item clicks
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to catalogue items
    const catalogueItems = document.querySelectorAll('.catalogue-item');
    catalogueItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const file = this.getAttribute('data-file');
            if (file) {
                // Create a temporary link for downloading
                const link = document.createElement('a');
                link.href = file;
                link.download = file;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show download confirmation
                showDownloadToast('Catalogue downloaded successfully!');
            }
        });
    });

    // Add click event listeners to catalogue cards
    const catalogueCards = document.querySelectorAll('.catalogue-item-card');
    catalogueCards.forEach(card => {
        card.addEventListener('click', function() {
            const file = this.getAttribute('data-file');
            const title = this.querySelector('h4').textContent;
            if (file) {
                // Create a temporary link for downloading
                const link = document.createElement('a');
                link.href = file;
                link.download = file;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show download confirmation
                showDownloadToast(`${title} downloaded successfully!`);
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add active class to current page in navigation
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link');
    const menuLength = menuItems.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].classList.add('active');
        }
    }
    
    // Handle dropdown submenus on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('show');
                }
            }
        });
    });
});

// Function to show download toast notification
function showDownloadToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3');
    toast.style.zIndex = '11';
    
    toast.innerHTML = `
        <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas fa-download me-2 text-primary"></i>
                <strong class="me-auto">Download</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show the toast
    const toastEl = new bootstrap.Toast(document.getElementById('liveToast'));
    toastEl.show();
    
    // Remove toast after it's hidden
    document.getElementById('liveToast').addEventListener('hidden.bs.toast', function () {
        toast.remove();
    });
}
