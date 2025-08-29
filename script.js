// Sample data for media content
const sampleMedia = [
    {
        id: 1,
        title: "Amazing Nature Documentary: Secrets of the Forest",
        creator: "Nature Channel",
        views: "2.3M",
        date: "3 days ago",
        duration: "45:32",
        thumbnail: "https://via.placeholder.com/320x180/1a5b3a/ffffff?text=Forest+Documentary",
        category: "Education"
    },
    {
        id: 2,
        title: "Understanding Quantum Physics - A Beginner's Guide",
        creator: "Science Explorer",
        views: "1.8M",
        date: "1 week ago",
        duration: "28:15",
        thumbnail: "https://via.placeholder.com/320x180/2a4a6b/ffffff?text=Quantum+Physics",
        category: "Education"
    },
    {
        id: 3,
        title: "Cooking Perfect Pasta: Chef's Secrets Revealed",
        creator: "Culinary Masters",
        views: "892K",
        date: "5 days ago",
        duration: "12:45",
        thumbnail: "https://via.placeholder.com/320x180/6b4a2a/ffffff?text=Pasta+Cooking",
        category: "Cooking"
    },
    {
        id: 4,
        title: "Epic Gaming Montage: Best Moments 2024",
        creator: "Gaming Pro",
        views: "3.2M",
        date: "2 days ago",
        duration: "18:20",
        thumbnail: "https://via.placeholder.com/320x180/4a2a6b/ffffff?text=Gaming+Montage",
        category: "Gaming"
    },
    {
        id: 5,
        title: "Travel Vlog: Hidden Gems of Tokyo",
        creator: "World Wanderer",
        views: "1.5M",
        date: "1 week ago",
        duration: "22:10",
        thumbnail: "https://via.placeholder.com/320x180/6b2a4a/ffffff?text=Tokyo+Travel",
        category: "Travel"
    },
    {
        id: 6,
        title: "AI and Machine Learning Explained Simply",
        creator: "Tech Insights",
        views: "2.1M",
        date: "4 days ago",
        duration: "35:45",
        thumbnail: "https://via.placeholder.com/320x180/2a6b4a/ffffff?text=AI+ML+Guide",
        category: "Technology"
    },
    {
        id: 7,
        title: "Classical Music for Focus and Productivity",
        creator: "Music Academy",
        views: "756K",
        date: "6 days ago",
        duration: "120:00",
        thumbnail: "https://via.placeholder.com/320x180/4a6b2a/ffffff?text=Classical+Music",
        category: "Music"
    },
    {
        id: 8,
        title: "Football Highlights: Championship Finals",
        creator: "Sports Central",
        views: "4.5M",
        date: "1 day ago",
        duration: "15:30",
        thumbnail: "https://via.placeholder.com/320x180/6b5a2a/ffffff?text=Football+Finals",
        category: "Sports"
    },
    {
        id: 9,
        title: "Digital Art Tutorial: Creating Stunning Landscapes",
        creator: "Art Studio",
        views: "623K",
        date: "1 week ago",
        duration: "42:18",
        thumbnail: "https://via.placeholder.com/320x180/5a2a6b/ffffff?text=Digital+Art",
        category: "Art"
    },
    {
        id: 10,
        title: "Breaking News: Latest Technology Breakthroughs",
        creator: "News Network",
        views: "1.9M",
        date: "2 hours ago",
        duration: "8:45",
        thumbnail: "https://via.placeholder.com/320x180/2a5a6b/ffffff?text=Tech+News",
        category: "News"
    },
    {
        id: 11,
        title: "Comedy Stand-Up: Hilarious Life Observations",
        creator: "Comedy Central",
        views: "2.8M",
        date: "3 days ago",
        duration: "25:12",
        thumbnail: "https://via.placeholder.com/320x180/6b4a5a/ffffff?text=Comedy+Show",
        category: "Entertainment"
    },
    {
        id: 12,
        title: "Space Exploration: Journey to Mars",
        creator: "Space Documentary",
        views: "3.7M",
        date: "5 days ago",
        duration: "58:30",
        thumbnail: "https://via.placeholder.com/320x180/4a3a6b/ffffff?text=Mars+Journey",
        category: "Science"
    }
];

// DOM elements
let sidebar = null;
let sidebarToggle = null;
let searchInput = null;
let searchBtn = null;
let contentGrid = null;
let currentFilter = 'All';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    sidebar = document.getElementById('sidebar');
    sidebarToggle = document.getElementById('sidebarToggle');
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    contentGrid = document.getElementById('contentGrid');

    // Set up event listeners
    setupEventListeners();
    
    // Load initial content based on page
    loadPageContent();
    
    // Set up page-specific functionality
    setupPageSpecific();
});

function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
}

function toggleSidebar() {
    if (sidebar) {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    }
}

function handleSearch() {
    const query = searchInput ? searchInput.value.trim() : '';
    if (query) {
        // Redirect to search page with query parameter
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

function handleResize() {
    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove('open');
    }
}

function loadPageContent() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'index':
        case 'trending':
            loadMediaGrid(sampleMedia);
            break;
        case 'categories':
            setupCategoryFilters();
            loadMediaGrid(sampleMedia);
            break;
        case 'search':
            loadSearchResults();
            break;
        case 'player':
            loadRelatedVideos();
            break;
        case 'channel':
            setupChannelPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (filename === '' || filename === 'index.html') return 'index';
    if (filename === 'trending.html') return 'trending';
    if (filename === 'categories.html') return 'categories';
    if (filename === 'search.html') return 'search';
    if (filename === 'player.html') return 'player';
    if (filename === 'channel.html') return 'channel';
    
    return 'index';
}

function createMediaCard(media) {
    return `
        <div class="media-card" onclick="goToPlayer(${media.id})">
            <div class="thumbnail-container">
                <img src="${media.thumbnail}" alt="${media.title}" loading="lazy">
                <div class="duration-badge">${media.duration}</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${media.title}</h3>
                <p class="card-creator" onclick="goToChannel(event, '${media.creator}')">${media.creator}</p>
                <div class="card-stats">
                    <span class="views">${media.views} views</span>
                    <span>•</span>
                    <span class="date">${media.date}</span>
                </div>
            </div>
        </div>
    `;
}

function createRelatedCard(media) {
    return `
        <div class="related-card" onclick="goToPlayer(${media.id})">
            <div class="related-thumbnail">
                <img src="${media.thumbnail}" alt="${media.title}" loading="lazy">
                <div class="duration-badge">${media.duration}</div>
            </div>
            <div class="related-content">
                <h4 class="related-title">${media.title}</h4>
                <p class="related-creator">${media.creator}</p>
                <div class="related-stats">${media.views} views • ${media.date}</div>
            </div>
        </div>
    `;
}

function loadMediaGrid(mediaList) {
    if (!contentGrid) return;
    
    if (mediaList.length === 0) {
        contentGrid.innerHTML = '<div class="loading">No content found</div>';
        return;
    }
    
    const cardsHTML = mediaList.map(createMediaCard).join('');
    contentGrid.innerHTML = cardsHTML;
    
    // Add staggered animation
    const cards = contentGrid.querySelectorAll('.media-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function setupCategoryFilters() {
    const categoryPills = document.querySelectorAll('.category-pill');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Filter content
            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    currentFilter = category;
    
    let filteredMedia;
    if (category === 'All') {
        filteredMedia = sampleMedia;
    } else {
        filteredMedia = sampleMedia.filter(media => media.category === category);
    }
    
    loadMediaGrid(filteredMedia);
}

function loadSearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    
    if (searchInput) {
        searchInput.value = query;
    }
    
    // Update search header
    const searchHeader = document.querySelector('.search-header p');
    if (searchHeader) {
        searchHeader.textContent = `About ${sampleMedia.length} results for "${query}"`;
    }
    
    // Filter results based on query
    let filteredResults = sampleMedia;
    if (query) {
        filteredResults = sampleMedia.filter(media => 
            media.title.toLowerCase().includes(query.toLowerCase()) ||
            media.creator.toLowerCase().includes(query.toLowerCase()) ||
            media.category.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    loadMediaGrid(filteredResults);
    
    // Setup search filters
    setupSearchFilters();
}

function setupSearchFilters() {
    const filterBtns = document.querySelectorAll('.search-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would filter by type (All, Videos, Channels, Playlists)
            // For now, we'll just show all videos
        });
    });
}

function loadRelatedVideos() {
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) return;
    
    // Get random related videos (excluding current video)
    const relatedVideos = sampleMedia
        .filter(media => media.id !== 1) // Exclude current video
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
    
    const relatedHTML = relatedVideos.map(createRelatedCard).join('');
    relatedGrid.innerHTML = relatedHTML;
    
    // Setup player controls
    setupPlayerControls();
}

function setupPlayerControls() {
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Toggle play/pause state
            const icon = this.querySelector('svg path');
            if (icon) {
                const isPlaying = icon.getAttribute('d').includes('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
                if (isPlaying) {
                    // Change to play icon
                    icon.setAttribute('d', 'M8 5v14l11-7z');
                } else {
                    // Change to pause icon
                    icon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
                }
            }
        });
    }
    
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const progressFill = this.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${pos * 100}%`;
            }
        });
    }
    
    // Setup action buttons
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
            } else if (this.textContent.includes('12.5K')) {
                this.classList.add('liked');
            }
        });
    });
}

function setupChannelPage() {
    const channelTabs = document.querySelectorAll('.channel-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Setup tab switching
    channelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            channelTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabName = this.textContent.toLowerCase();
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Load channel videos
    const channelGrid = document.getElementById('channelGrid');
    if (channelGrid) {
        // Filter videos by channel (Nature Channel in this case)
        const channelVideos = sampleMedia.filter(media => 
            media.creator === 'Nature Channel'
        );
        
        const cardsHTML = channelVideos.map(createMediaCard).join('');
        channelGrid.innerHTML = cardsHTML;
    }
    
    // Setup follow button
    const followBtn = document.querySelector('.follow-btn');
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.backgroundColor = 'var(--bg-tertiary)';
                this.style.color = 'var(--text-primary)';
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = 'var(--accent-primary)';
                this.style.color = 'white';
            }
        });
    }
}

function setupPageSpecific() {
    const currentPage = getCurrentPage();
    
    // Setup trending page filters
    if (currentPage === 'trending') {
        const filterBtns = document.querySelectorAll('.trending-filters .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Here you would filter by time period
                // For demo, we'll just shuffle the content
                const shuffled = [...sampleMedia].sort(() => Math.random() - 0.5);
                loadMediaGrid(shuffled);
            });
        });
    }
}

// Navigation functions
function goToPlayer(mediaId) {
    window.location.href = `player.html?v=${mediaId}`;
}

function goToChannel(event, creatorName) {
    event.stopPropagation(); // Prevent card click
    window.location.href = `channel.html?c=${encodeURIComponent(creatorName)}`;
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

function timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}

// Enhanced interactions
function addHoverEffects() {
    // Add dynamic hover effects to cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.media-card')) {
            e.target.closest('.media-card').style.transform = 'translateY(-8px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.media-card')) {
            e.target.closest('.media-card').style.transform = 'translateY(0)';
        }
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    setupLazyLoading();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC to close sidebar on mobile
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && sidebar && !sidebar.classList.contains('open')) {
            // Swipe left - open sidebar
            sidebar.classList.add('open');
        } else if (diff < 0 && sidebar && sidebar.classList.contains('open')) {
            // Swipe right - close sidebar
            sidebar.classList.remove('open');
        }
    }
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            }, 0);
        });
    }
}

measurePerformance();