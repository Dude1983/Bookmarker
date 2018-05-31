
var saveButton = document.getElementById("saveBookmarkBtn")

saveButton.addEventListener('click', saveBookmark);


function saveBookmark(e) {

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    siteName: siteName,
    siteUrl : siteUrl
  }

  if (localStorage.getItem("bookmarks") === null ) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear Form
  document.getElementById('bookmarkForm').reset();

  fetchBookmarks();

  e.preventDefault();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i=0; i < bookmarks.length; i++) {
    if (bookmarks[i].siteUrl == url) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  var bookmarksResults = document.getElementById("results");
  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var siteName = bookmarks[i].siteName;
    var siteUrl = bookmarks[i].siteUrl;

    bookmarksResults.innerHTML += '<div class="column">' +
                                  '<h1 class="title">' + siteName + '</h1>' +
                                  '<a target="_blank" href="' + siteUrl + '" class="button is-primary">Visit Site</a><span>&nbsp</span>' +
                                  '<a onclick="deleteBookmark(\''+siteUrl+'\')" href="#" class="button is-danger">Delete</a>' +
                                  '</div>' +
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("URL must be of format: https://www.xxx.com")
    return false;
  }

  return true;
}
