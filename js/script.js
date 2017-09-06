var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://unsplash.it/list', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {

        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        var obj = JSON.parse(xhr.responseText);
        var fil = document.getElementById('fil');
        var filterAuthor = document.getElementById('filterAuthor');

        showImages(obj);

        fil.onclick = function (event) {
            var target = event.target;
            list.innerHTML = null;

            if (target.className === 'point medium') {
                var filtered = obj.filter(function (img) {
                    return img.width < 1499 && 800 < img.width;
                })
                showImages(filtered);
                paginateChildren($('.container-card'));
            } else if (target.className === 'point small') {
                filtered = obj.filter(function (img) {
                    return 799 > img.width;
                })
                showImages(filtered)
                paginateChildren($('.container-card'));
            } else if (target.className === 'point large') {
                filtered = obj.filter(function (img) {
                    return 1500 < img.width;
                })
                showImages(filtered);
                paginateChildren($('.container-card'));
            }
        }
        fil.addEventListener('click', active);
        filterAuthor.addEventListener('click', active);
        paginateChildren($('.container-card'));
        showAuthors(uniqAuthors(obj), document.getElementsByClassName('filter-author')[0]);

        filterAuthor.onclick = function (event) {
            var target = event.target;
            list.innerHTML = null;
            var filt = obj.filter(function (img) {
                return target.innerText === img.author;
            });
            showImages(filt);
            paginateChildren($('.container-card'));
        }
    }
}
xhr.send();

var list = document.getElementById('list'),
    modal = document.getElementById('myModal'),
    modalImg = document.getElementById("img01"),
    span = document.getElementsByClassName("close")[0],
    filterTitle = document.getElementsByClassName('filter-title');

function showImages(obj) {
    for (var i = 0; i < obj.length; i++) {
        var div = list.appendChild(document.createElement('div'));
        div.className = 'card';
        var card = obj[i].post_url.split('/')[4];
        div.innerHTML = "<img class=\"photo\" src = https://source.unsplash.com/" + card + ">";
        if (i === 19) {
            break
        }
    }
}

list.onclick = function (event) {
    var target = event.target;
    if (target.className === 'photo') {
        modal.style.display = "block";
        modalImg.src = target.src;
    }
}

span.onclick = function () {
    modal.style.display = "none";
}

function uniqAuthors(arr) {
    var newObj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i].author;
        newObj[str] = true;
    }
    return Object.keys(newObj);
}

function showAuthors(func, elem) {
    for (var i = 0; i < func.length; i++) {
        var div = document.createElement('div');
        div.className = 'point';
        div.innerHTML = func[i];
        elem.appendChild(div);
    }
}

function active(event) {
    var target = event.target;
    var name = this.children;
    for (var i = 0; i < name.length; i++) {
        name[i].classList.remove('point-active');
    }
    target.classList.add('point-active');
}

filterTitle[0].addEventListener('click', function () {
    var elements = this.nextElementSibling;
    elements.classList.toggle('toggle');
});

filterTitle[1].addEventListener('click', function () {
    var elements = this.nextElementSibling;
    elements.classList.toggle('toggle');
});



