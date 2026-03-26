// Close gombok hozzáadása a meglévő elemekhez
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
// Close gomb működése
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        var price = div.getAttribute("data-price");
        if (price) {
            updateTotal(-parseInt(price));
        }
        div.style.display = "none";
    }
}
// Dupla kattintásra kihúzás (megvéve)
var list = document.querySelector('ul');
list.addEventListener('dblclick', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);
// Összár frissítése
function updateTotal(amount) {
    var totalElement = document.getElementById("totalPrice");
    var currentTotal = parseInt(totalElement.textContent) || 0;
    totalElement.textContent = currentTotal + amount;
}
// Új elem hozzáadása
function newElement() {
    var itemValue = document.getElementById("itemInput").value;
    var priceValue = document.getElementById("priceInput").value;
    var selectedCategoryId = document.getElementById("categorySelect").value;
    if (itemValue === '') {
        alert("Add meg a termék nevét!");
        return;
    }
    var price = priceValue ? parseInt(priceValue) : 0;
    var li = document.createElement("li");
    li.setAttribute("data-price", price);
    var itemText = document.createTextNode(itemValue);
    li.appendChild(itemText);
    // Ár megjelenítése
    if (price > 0) {
        var priceSpan = document.createElement("span");
        priceSpan.className = "item-price";
        priceSpan.textContent = " - " + price + " Ft";
        li.appendChild(priceSpan);
    }
    // Hozzáadás a kiválasztott kategóriához
    var targetCategory = document.getElementById(selectedCategoryId);
    var innerList = targetCategory.querySelector(".daycontent");
    if (innerList) {
        innerList.appendChild(li);
    }
    // Összár frissítése
    updateTotal(price);
    // Input mezők ürítése
    document.getElementById("itemInput").value = "";
    document.getElementById("priceInput").value = "";
    // Close gomb hozzáadása
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    span.onclick = function() {
        var itemPrice = this.parentElement.getAttribute("data-price");
        if (itemPrice) {
            updateTotal(-parseInt(itemPrice));
        }
        this.parentElement.style.display = "none";
    };
}
// Kategóriák lenyitása kattintásra 
var categories = document.querySelectorAll("ul > li");
for (let i = 0; i < categories.length; i++) {
    if (categories[i].innerText.trim() !== "") {
        var innerList = document.createElement("ul");
        innerList.className = "daycontent";
        categories[i].appendChild(innerList);
        categories[i].addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.toggle("open");
            }
        });
    }
}