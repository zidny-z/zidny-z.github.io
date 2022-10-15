console.log("uwa");
// responsive navbar
function navbarClass() {
	var x = document.getElementById("topNavbarId");
	if (x.className === "topNavbar") {
		x.className += " responsive";
	} else {
		x.className = "topNavbar";
	}
}

function show() {
	var titik2 = document.getElementById("titik2");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");

	if (titik2.style.display === "none") {
		titik2.style.display = "inline";
		btnText.innerHTML = "<b>Lihat Selengkapnya</b>";
		moreText.style.display = "none";
	} else {
		titik2.style.display = "none";
		btnText.innerHTML = "<b>Lihat Lebih Sedikit</b>";
		moreText.style.display = "inline";
	}
}
