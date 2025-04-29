$(document).ready(function(){
    // Get filter from URL (e.g., ?filter=code)
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');

    // If URL has a filter, apply it immediately
    if (urlFilter) {
        applyFilter(urlFilter);
        highlightActiveNav(urlFilter);
    }

    // When clicking filter buttons
    $(".button").click(function(){
        const filterValue = $(this).attr("data-filter");
        
        // Skip if already active
        if ($(this).hasClass('active')) return;

        applyFilter(filterValue);
        highlightActiveNav(filterValue);
        
        // Update URL (without reloading)
        history.pushState(null, null, `?filter=${filterValue}`);
    });
    
    // Apply filter to project grid
    function applyFilter(filterValue) {
        if (filterValue === "all") {
            $(".filter").slideDown("1000");
        } else {
            $(".filter").not(`.${filterValue}`).slideUp("1000");
            $(`.filter.${filterValue}`).slideDown("1000");
        }
    }

    // Highlight the active nav item
    function highlightActiveNav(filterValue) {
        $(".button").removeClass('active');
        $(`.button[data-filter="${filterValue}"]`).addClass('active');
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        const newParams = new URLSearchParams(window.location.search);
        const newFilter = newParams.get('filter') || 'all';
        applyFilter(newFilter);
        highlightActiveNav(newFilter);
    });
});