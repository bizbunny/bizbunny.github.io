$(document).ready(function(){
    // Get filter from URL (e.g., ?filter=code)
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');

    // Set initial active state
    updateActiveStates(urlFilter || 'all');
    
    // Apply initial filter if specified
    if (urlFilter) {
        applyFilter(urlFilter);
    }

    // Handle filter button clicks
    $(".nav-item[data-filter]").click(function(e) {
        e.preventDefault();
        const filterValue = $(this).attr("data-filter");
        
        // Update URL
        const newUrl = filterValue === 'all' 
            ? '/index.html' 
            : `/index.html?filter=${filterValue}`;
        history.pushState(null, null, newUrl);
        
        // Apply filter and update active states
        applyFilter(filterValue);
        updateActiveStates(filterValue);
    });

    // Handle browser navigation (back/forward)
    window.addEventListener('popstate', function() {
        const newParams = new URLSearchParams(window.location.search);
        const newFilter = newParams.get('filter') || 'all';
        applyFilter(newFilter);
        updateActiveStates(newFilter);
    });

    // Filter function
    function applyFilter(filterValue) {
        if (filterValue === "all") {
            $(".filter").slideDown("fast");
        } else {
            $(".filter").not(`.${filterValue}`).slideUp("fast");
            $(`.filter.${filterValue}`).slideDown("fast");
        }
    }

    // Update active navigation states
    function updateActiveStates(activeFilter) {
        // Remove active class from all nav items
        $(".nav-item").removeClass('active');
        
        // Add active class to the correct item
        if (activeFilter === 'all') {
            $('.nav-item[data-filter="all"]').addClass('active');
        } else {
            $(`.nav-item[data-filter="${activeFilter}"]`).addClass('active');
        }
    }
});