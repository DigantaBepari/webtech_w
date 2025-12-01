document.getElementById("addBtn").addEventListener("click", addBook);

function addBook() {
    let title = document.getElementById("title").value.trim();
    let year = document.getElementById("year").value.trim();
    let currentYear = new Date().getFullYear();

    if (!/^[A-Za-z]+$/.test(title)) {
        alert("Title must contain only alphabets and cannot be empty.");
        return;
    }

    if (!/^\d{4}$/.test(year) || year < 1900 || year > currentYear) {
        alert("Year must be four-digit and between 1900 and " + currentYear);
        return;
    }

    let table = document.getElementById("bookTable");
    let row = table.insertRow();

    if (year < 2000) {
        row.classList.add("light-gray");
    } else {
        row.classList.add("light-green");
    }

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.textContent = title;
    cell2.textContent = year;

    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
}
