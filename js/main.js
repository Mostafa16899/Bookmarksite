var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var nameMessage = document.getElementById("nameMessage");
var urlMessage = document.getElementById("urlMessage");
var siteArr = [];

// Regular expressions for input validation
var nameRegex = /^[a-zA-Z0-9\s\-_]{3,50}$/;
var urlRegex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.[a-z]{2,}(\.[a-z]{2,})?(\/\S*)?$/;

// Load existing bookmarks from localStorage
let database = localStorage.getItem("allsite");
if (database != null) {
    siteArr = JSON.parse(database);
    displaySites();
}


function showNameMessage() {
    const nameMessage = document.getElementById("nameMessage");
    const overlay = document.getElementById("overlay");

    nameMessage.classList.remove("d-none");
    overlay.classList.remove("d-none");

    overlay.addEventListener("click", hideNameMessage);
}

function hideNameMessage() {
    const nameMessage = document.getElementById("nameMessage");
    const overlay = document.getElementById("overlay");

    nameMessage.classList.add("d-none");
    overlay.classList.add("d-none");

    overlay.removeEventListener("click", hideNameMessage);
}

// Modify validateName to show the message
function validateName() {
    if (nameRegex.test(siteName.value.trim())) {
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
        hideNameMessage();
        return true;
    } else {
        siteName.classList.add("is-invalid");
        showNameMessage();
        return false;
    }
}


// Validate site URL
function validateURL() {
    let urlValue = siteUrl.value.trim();

    // Add `http://` if missing
    if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
        urlValue = "http://" + urlValue;
        siteUrl.value = urlValue;
    }

    if (urlRegex.test(urlValue)) {
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid");
        hideNameMessage();
        return true;
    } else {
        siteUrl.classList.add("is-invalid");
        showNameMessage();
        return false;
    }
}

// Add a new bookmark
function addBookmark() {
    if (!validateName() || !validateURL()) return;

    let newBookmark = {
        siteName: siteName.value.trim(),
        siteURL: siteUrl.value.trim(),
    };

    siteArr.unshift(newBookmark);
    localStorage.setItem("allsite", JSON.stringify(siteArr));

    clearInputs();
    displaySites();
}

// Display all bookmarks
function displaySites() {
    let bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = "";

    siteArr.forEach((bookmark, index) => {
        bookmarkList.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.siteName}</td>
        <td>
          <a href="${bookmark.siteURL}" target="_blank" class="btn btn-success ">
            Visit
          </a>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteSite(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
    });
}

// Clear input fields
function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
    siteName.classList.remove("is-valid", "is-invalid");
    siteUrl.classList.remove("is-valid", "is-invalid");
}

// Delete a bookmark
function deleteSite(index) {
    siteArr.splice(index, 1);
    localStorage.setItem("allsite", JSON.stringify(siteArr));
    displaySites();
}
