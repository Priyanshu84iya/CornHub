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
    console.log('CornHub app initializing...');
    
    // Get DOM elements
    sidebar = document.getElementById('sidebar');
    sidebarToggle = document.getElementById('sidebarToggle');
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    contentGrid = document.getElementById('contentGrid');

    // Log element status
    console.log('Elements found:', {
        sidebar: !!sidebar,
        sidebarToggle: !!sidebarToggle,
        searchInput: !!searchInput,
        searchBtn: !!searchBtn,
        contentGrid: !!contentGrid
    });

    // Set up event listeners
    setupEventListeners();
    
    // Load initial content based on page
    loadPageContent();
    
    // Set up page-specific functionality
    setupPageSpecific();
    
    console.log('CornHub app initialized successfully!');
});

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Sidebar toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sidebar toggle clicked');
            toggleSidebar();
        });
        console.log('Sidebar toggle listener added');
    } else {
        console.warn('Sidebar toggle or sidebar element not found');
    }

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Search button clicked');
            handleSearch();
        });
        console.log('Search button listener added');
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Search input Enter pressed');
                handleSearch();
            }
        });
        console.log('Search input listener added');
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                console.log('Closing sidebar - clicked outside');
                sidebar.classList.remove('open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    console.log('All event listeners set up');
}

function toggleSidebar() {
    console.log('Toggle sidebar called, window width:', window.innerWidth);
    
    if (sidebar) {
        if (window.innerWidth <= 768) {
            const isOpen = sidebar.classList.contains('open');
            sidebar.classList.toggle('open');
            console.log('Mobile sidebar toggled:', !isOpen ? 'opened' : 'closed');
        } else {
            const isCollapsed = sidebar.classList.contains('collapsed');
            sidebar.classList.toggle('collapsed');
            console.log('Desktop sidebar toggled:', !isCollapsed ? 'collapsed' : 'expanded');
        }
    } else {
        console.error('Sidebar element not found');
    }
}

function handleSearch() {
    const query = searchInput ? searchInput.value.trim() : '';
    console.log('Search initiated with query:', query);
    
    if (query) {
        // Redirect to search page with query parameter
        const searchUrl = `search.html?q=${encodeURIComponent(query)}`;
        console.log('Redirecting to:', searchUrl);
        window.location.href = searchUrl;
    } else {
        console.log('Empty search query, no action taken');
        // Optionally show a message or highlight the search input
        if (searchInput) {
            searchInput.focus();
            searchInput.style.borderColor = 'var(--accent-primary)';
            setTimeout(() => {
                searchInput.style.borderColor = '';
            }, 2000);
        }
    }
}

function handleResize() {
    console.log('Window resized to:', window.innerWidth + 'x' + window.innerHeight);
    
    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove('open');
        console.log('Mobile sidebar closed due to resize');
    }
    
    // Update grid layout based on screen size
    updateGridLayout();
}

function updateGridLayout() {
    if (!contentGrid) return;
    
    const screenWidth = window.innerWidth;
    let columns;
    
    if (screenWidth <= 480) {
        columns = 1;
    } else if (screenWidth <= 768) {
        columns = 2;
    } else if (screenWidth <= 1024) {
        columns = 3;
    } else if (screenWidth <= 1200) {
        columns = 4;
    } else {
        columns = 5;
    }
    
    contentGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    console.log('Grid layout updated to', columns, 'columns');
}

function loadPageContent() {
    const currentPage = getCurrentPage();
    console.log('Loading content for page:', currentPage);
    
    switch (currentPage) {
        case 'index':
        case 'trending':
            console.log('Loading media grid with', sampleMedia.length, 'items');
            loadMediaGrid(sampleMedia);
            break;
        case 'categories':
            console.log('Setting up categories page');
            setupCategoryFilters();
            loadMediaGrid(sampleMedia);
            break;
        case 'search':
            console.log('Loading search results');
            loadSearchResults();
            break;
        case 'player':
            console.log('Setting up player page');
            loadRelatedVideos();
            break;
        case 'channel':
            console.log('Setting up channel page');
            setupChannelPage();
            break;
        default:
            console.log('Unknown page, loading default content');
            loadMediaGrid(sampleMedia);
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
    if (!media || !media.id) {
        console.error('Invalid media object:', media);
        return '';
    }
    
    return `
        <div class="media-card" data-id="${media.id}">
            <div class="thumbnail-container">
                <img src="${media.thumbnail}" alt="${escapeHtml(media.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/320x180/2A2A2E/F5F5F7?text=Video'">
                <div class="duration-badge">${media.duration}</div>
            </div>
            <div class="card-content">
                <h3 class="card-title" title="${escapeHtml(media.title)}">${escapeHtml(media.title)}</h3>
                <p class="card-creator" data-creator="${escapeHtml(media.creator)}">${escapeHtml(media.creator)}</p>
                <div class="card-stats">
                    <span class="views">${media.views} views</span>
                    <span>•</span>
                    <span class="date">${media.date}</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createRelatedCard(media) {
    if (!media || !media.id) {
        console.error('Invalid media object for related card:', media);
        return '';
    }
    
    return `
        <div class="related-card" data-id="${media.id}">
            <div class="related-thumbnail">
                <img src="${media.thumbnail}" alt="${escapeHtml(media.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/120x68/2A2A2E/F5F5F7?text=Video'">
                <div class="duration-badge">${media.duration}</div>
            </div>
            <div class="related-content">
                <h4 class="related-title" title="${escapeHtml(media.title)}">${escapeHtml(media.title)}</h4>
                <p class="related-creator">${escapeHtml(media.creator)}</p>
                <div class="related-stats">${media.views} views • ${media.date}</div>
            </div>
        </div>
    `;
}

function loadMediaGrid(mediaList) {
    console.log('Loading media grid with', mediaList.length, 'items');
    
    if (!contentGrid) {
        console.error('Content grid element not found');
        return;
    }
    
    if (mediaList.length === 0) {
        console.log('No media items to display');
        contentGrid.innerHTML = '<div class="loading">No content found</div>';
        return;
    }
    
    try {
        const cardsHTML = mediaList.map(createMediaCard).join('');
        contentGrid.innerHTML = cardsHTML;
        
        // Add staggered animation
        const cards = contentGrid.querySelectorAll('.media-card');
        console.log('Added', cards.length, 'media cards');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        console.log('Media grid loaded successfully');
    } catch (error) {
        console.error('Error loading media grid:', error);
        contentGrid.innerHTML = '<div class="loading">Error loading content</div>';
    }
}

function setupCategoryFilters() {
    const categoryPills = document.querySelectorAll('.category-pill');
    console.log('Setting up category filters, found', categoryPills.length, 'pills');
    
    if (categoryPills.length === 0) {
        console.warn('No category pills found');
        return;
    }
    
    categoryPills.forEach((pill, index) => {
        pill.addEventListener('click', function() {
            console.log('Category pill clicked:', this.textContent.trim());
            
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Filter content
            const category = this.textContent.trim();
            filterByCategory(category);
        });
        
        // Add keyboard navigation
        pill.setAttribute('tabindex', '0');
        pill.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log('Category filters set up successfully');
}

function filterByCategory(category) {
    console.log('Filtering by category:', category);
    currentFilter = category;
    
    let filteredMedia;
    if (category === 'All') {
        filteredMedia = sampleMedia;
    } else {
        filteredMedia = sampleMedia.filter(media => {
            return media.category && media.category.toLowerCase() === category.toLowerCase();
        });
    }
    
    console.log('Filtered results:', filteredMedia.length, 'items');
    loadMediaGrid(filteredMedia);
}

function loadSearchResults() {
    console.log('Loading search results page');
    
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q') || '';
        
        console.log('Search query from URL:', query);
        
        if (searchInput) {
            searchInput.value = query;
        }
        
        // Update search header
        const searchHeader = document.querySelector('.search-header p');
        if (searchHeader) {
            const resultCount = query ? 'About 1,247' : sampleMedia.length;
            searchHeader.textContent = `${resultCount} results${query ? ` for "${query}"` : ''}`;
        }
        
        // Filter results based on query
        let filteredResults = sampleMedia;
        if (query) {
            filteredResults = sampleMedia.filter(media => {
                const searchTerm = query.toLowerCase();
                return (
                    media.title.toLowerCase().includes(searchTerm) ||
                    media.creator.toLowerCase().includes(searchTerm) ||
                    media.category.toLowerCase().includes(searchTerm)
                );
            });
            
            console.log('Filtered search results:', filteredResults.length, 'items');
        }
        
        loadMediaGrid(filteredResults);
        
        // Setup search filters
        setupSearchFilters();
        
        console.log('Search results loaded successfully');
    } catch (error) {
        console.error('Error loading search results:', error);
        if (contentGrid) {
            contentGrid.innerHTML = '<div class="loading">Error loading search results</div>';
        }
    }
}

function setupSearchFilters() {
    const filterBtns = document.querySelectorAll('.search-filters .filter-btn');
    console.log('Setting up search filters, found', filterBtns.length, 'filter buttons');
    
    filterBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const filterType = this.textContent.trim();
            console.log('Search filter clicked:', filterType);
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would filter by type (All, Videos, Channels, Playlists)
            // For now, we'll just show all videos since we only have video content
            console.log('Applied filter:', filterType);
        });
        
        // Add keyboard navigation
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log('Search filters setup complete');
}

function loadRelatedVideos() {
    console.log('Loading related videos for player page');
    
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) {
        console.warn('Related grid element not found');
        return;
    }
    
    try {
        // Get random related videos (excluding current video)
        const relatedVideos = sampleMedia
            .filter(media => media.id !== 1) // Exclude current video
            .sort(() => Math.random() - 0.5)
            .slice(0, 8);
        
        console.log('Generated', relatedVideos.length, 'related videos');
        
        const relatedHTML = relatedVideos.map(createRelatedCard).join('');
        relatedGrid.innerHTML = relatedHTML;
        
        // Setup player controls
        setupPlayerControls();
        
        console.log('Related videos loaded successfully');
    } catch (error) {
        console.error('Error loading related videos:', error);
        relatedGrid.innerHTML = '<div class="loading">Error loading related videos</div>';
    }
}

function setupPlayerControls() {
    console.log('Setting up player controls');
    
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            console.log('Play button clicked');
            
            // Toggle play/pause state
            const icon = this.querySelector('svg path');
            if (icon) {
                const currentPath = icon.getAttribute('d');
                const isPlaying = currentPath.includes('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
                
                if (isPlaying) {
                    // Change to play icon
                    icon.setAttribute('d', 'M8 5v14l11-7z');
                    console.log('Changed to play icon');
                } else {
                    // Change to pause icon
                    icon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
                    console.log('Changed to pause icon');
                }
            }
        });
        console.log('Play button listener added');
    }
    
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const progressFill = this.querySelector('.progress-fill');
            
            if (progressFill) {
                const percentage = Math.max(0, Math.min(100, pos * 100));
                progressFill.style.width = `${percentage}%`;
                console.log('Progress set to:', percentage + '%');
            }
        });
        console.log('Progress bar listener added');
    }
    
    // Setup action buttons
    actionBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log('Action button clicked:', this.textContent.trim());
            
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                console.log('Removed like');
            } else if (this.textContent.includes('12.5K')) {
                this.classList.add('liked');
                console.log('Added like');
            }
        });
    });
    
    console.log('Player controls setup complete');
}

function setupChannelPage() {
    console.log('Setting up channel page');
    
    const channelTabs = document.querySelectorAll('.channel-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Found', channelTabs.length, 'channel tabs');
    
    // Setup tab switching
    channelTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            const tabText = this.textContent.toLowerCase().trim();
            console.log('Channel tab clicked:', tabText);
            
            // Remove active class from all tabs and contents
            channelTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${tabText}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Activated tab content:', tabText);
            } else {
                console.warn('Tab content not found for:', tabText);
            }
        });
        
        // Add keyboard navigation
        tab.setAttribute('tabindex', '0');
        tab.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Load channel videos
    const channelGrid = document.getElementById('channelGrid');
    if (channelGrid) {
        console.log('Loading channel videos');
        
        // Filter videos by channel (Nature Channel in this case)
        const channelVideos = sampleMedia.filter(media => 
            media.creator === 'Nature Channel'
        );
        
        console.log('Found', channelVideos.length, 'videos for this channel');
        
        if (channelVideos.length === 0) {
            // If no videos found for this specific channel, show some sample videos
            const sampleChannelVideos = sampleMedia.slice(0, 6);
            const cardsHTML = sampleChannelVideos.map(createMediaCard).join('');
            channelGrid.innerHTML = cardsHTML;
            console.log('Loaded sample videos for channel');
        } else {
            const cardsHTML = channelVideos.map(createMediaCard).join('');
            channelGrid.innerHTML = cardsHTML;
            console.log('Loaded channel-specific videos');
        }
    }
    
    // Setup follow button
    const followBtn = document.querySelector('.follow-btn');
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            console.log('Follow button clicked');
            
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.backgroundColor = 'var(--bg-tertiary)';
                this.style.color = 'var(--text-primary)';
                console.log('User followed channel');
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = 'var(--accent-primary)';
                this.style.color = 'white';
                console.log('User unfollowed channel');
            }
        });
        console.log('Follow button listener added');
    }
    
    console.log('Channel page setup complete');
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
    console.log('Navigating to player for media ID:', mediaId);
    
    if (!mediaId) {
        console.error('No media ID provided');
        return;
    }
    
    try {
        const playerUrl = `player.html?v=${mediaId}`;
        console.log('Redirecting to:', playerUrl);
        window.location.href = playerUrl;
    } catch (error) {
        console.error('Error navigating to player:', error);
    }
}

function goToChannel(event, creatorName) {
    console.log('Navigating to channel for creator:', creatorName);
    
    if (event) {
        event.stopPropagation(); // Prevent card click
    }
    
    if (!creatorName) {
        console.error('No creator name provided');
        return;
    }
    
    try {
        const channelUrl = `channel.html?c=${encodeURIComponent(creatorName)}`;
        console.log('Redirecting to:', channelUrl);
        window.location.href = channelUrl;
    } catch (error) {
        console.error('Error navigating to channel:', error);
    }
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
    // Wait for initial setup to complete
    setTimeout(() => {
        addHoverEffects();
        setupLazyLoading();
        
        // Ensure all interactive elements are properly set up
        setupInteractiveElements();
        
        console.log('🎨 Enhanced features initialized');
    }, 500);
});

// Setup all interactive elements
function setupInteractiveElements() {
    console.log('Setting up interactive elements...');
    
    // Add click handlers to all media cards using event delegation
    document.addEventListener('click', function(e) {
        // Handle media card clicks
        const mediaCard = e.target.closest('.media-card');
        if (mediaCard && !e.target.closest('.card-creator')) {
            const mediaId = mediaCard.getAttribute('data-id');
            if (mediaId) {
                console.log('Media card clicked, ID:', mediaId);
                goToPlayer(parseInt(mediaId));
            }
        }
        
        // Handle related card clicks
        const relatedCard = e.target.closest('.related-card');
        if (relatedCard && !mediaCard) { // Avoid double handling
            const mediaId = relatedCard.getAttribute('data-id');
            if (mediaId) {
                console.log('Related card clicked, ID:', mediaId);
                goToPlayer(parseInt(mediaId));
            }
        }
        
        // Handle creator clicks
        const creatorLink = e.target.closest('.card-creator');
        if (creatorLink) {
            e.stopPropagation();
            const creatorName = creatorLink.getAttribute('data-creator') || creatorLink.textContent.trim();
            console.log('Creator clicked:', creatorName);
            goToChannel(e, creatorName);
        }
    });
    
    // Add hover effects for better UX
    document.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.media-card, .related-card');
        if (card) {
            card.style.transform = 'translateY(-4px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.media-card, .related-card');
        if (card) {
            card.style.transform = 'translateY(0)';
        }
    });
    
    console.log('✅ Interactive elements setup complete');
}

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

// Test all functions
function testAllFunctions() {
    console.log('🧪 Testing all CornHub functions...');
    
    // Test data integrity
    console.log('📊 Sample media items:', sampleMedia.length);
    console.log('✅ Sample data loaded');
    
    // Test DOM elements
    const elements = {
        sidebar: document.getElementById('sidebar'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        searchInput: document.getElementById('searchInput'),
        searchBtn: document.getElementById('searchBtn'),
        contentGrid: document.getElementById('contentGrid')
    };
    
    console.log('🔍 DOM Elements check:');
    Object.entries(elements).forEach(([name, element]) => {
        console.log(`  ${name}: ${element ? '✅ Found' : '❌ Missing'}`);
    });
    
    // Test page detection
    const currentPage = getCurrentPage();
    console.log('📄 Current page detected:', currentPage);
    
    // Test utility functions
    try {
        const testCard = createMediaCard(sampleMedia[0]);
        console.log('🎴 Media card creation: ✅ Working');
    } catch (error) {
        console.log('🎴 Media card creation: ❌ Error:', error.message);
    }
    
    try {
        const testRelated = createRelatedCard(sampleMedia[1]);
        console.log('🔗 Related card creation: ✅ Working');
    } catch (error) {
        console.log('🔗 Related card creation: ❌ Error:', error.message);
    }
    
    // Test filtering
    try {
        const filtered = sampleMedia.filter(media => media.category === 'Education');
        console.log(`🔍 Category filtering: ✅ Working (${filtered.length} Education items)`);
    } catch (error) {
        console.log('🔍 Category filtering: ❌ Error:', error.message);
    }
    
    console.log('🎉 Function testing complete!');
}

// Global error handler
window.addEventListener('error', function(event) {
    console.error('🚨 Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled promise rejection:', event.reason);
});

measurePerformance();

// Run tests after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testAllFunctions, 1000); // Wait a second for everything to initialize
});