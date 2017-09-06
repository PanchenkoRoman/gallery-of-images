function paginateChildren(parentElement) {
    var page = 1,
        currentElements,
        offsetStart,
        offsetEnd,
        currentPage = 1,
        elementsPerPage = 12,
        elements = parentElement.find($('.card')),
        nmbrOfPages = Math.ceil(elements.length / elementsPerPage);

    function displayNav() {
        var htmlNav = '<div class="paginationNav pull-right">';
        htmlNav += '<a href="#" class="prev"><i class="fa fa-angle-left fa-lg"></i></a>';
        htmlNav += '<span>' + currentPage +'</span>';
        htmlNav += '<a href="#" class="next active"><i class="fa fa-angle-right fa-lg"></i></a>';
        htmlNav += '</div>';
        if (!$(parentElement).find('.paginationNav').length) {
            $(parentElement).append(htmlNav);
        }
    };
    $(parentElement).on('click', '.paginationNav a.prev', function (e) {
        e.preventDefault();
        page = currentPage > 1 ? parseInt(currentPage) - 1 : 1;
        displayPage(page);
    });
    $(parentElement).on('click', '.paginationNav a.next', function (e) {
        e.preventDefault();
        page = currentPage < nmbrOfPages ? parseInt(currentPage) + 1 : nmbrOfPages;
        displayPage(page);
    });
    var displayPage = function (page) {
        if (currentPage != page || page == 1) {
            currentPage = parseInt(page);
            $('.paginationNav span', parentElement).html(currentPage);
            var prevButton = $('.paginationNav a.prev');
            var nextButton = $('.paginationNav a.next');
            if (currentPage == 1 && nmbrOfPages > 1) {
                if (prevButton.hasClass('active')) {
                    prevButton.removeClass('active');
                }
                nextButton.addClass('active');
            } else if (currentPage > 1 && currentPage < nmbrOfPages) {
                prevButton.addClass('active');
                nextButton.addClass('active');
            } else if (nmbrOfPages > 1 && currentPage == nmbrOfPages) {
                prevButton.addClass('active');
                if (nextButton.hasClass('active')) {
                    nextButton.removeClass('active');
                }
            }
            offsetStart = (page - 1) * elementsPerPage;
            offsetEnd = page * elementsPerPage;
            if (currentElements) {
                currentElements.hide();
            } else {
                elements.hide();
            }
            currentElements = elements.slice(offsetStart, offsetEnd);
            currentElements.fadeIn();
        }
    };
    if (page.length <= 0 || page < 1 || page > nmbrOfPages) {
        page = 1;
    }
    displayPage(page);
    if (nmbrOfPages > 1) {
        displayNav();
    }
}

