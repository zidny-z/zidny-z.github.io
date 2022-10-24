// responsive navbar
function navbarClass() {
	var x = document.getElementById("topNavbarId");
	if (x.className === "topNavbar") {
		x.className += " responsive";
	} else {
		x.className = "topNavbar";
	}
}

// main js CRUS DOM

const localStorageKey = "DATA_BUKU";
let data = [];
localStorage.setItem(localStorageKey, JSON.stringify(data));

let domJudul = document.querySelector("#inputBookTitle");
let domPenulis = document.querySelector("#inputBookAuthor");
let domTahun = document.querySelector("#inputBookYear");
let domSelesai = document.querySelector("#inputBookIsComplete");
let domBlumBaca = document.querySelector("#tabelBelumBaca");
let domSudahBaca = document.querySelector("#tabelSudahBaca");
bacaData();

function tambahData() {
	const dataRow = {
		id: +new Date(),
		title: domJudul.value,
		author: domPenulis.value,
		year: domTahun.value,
		isComplete: domSelesai.checked,
	};
	data.push(dataRow);
}

function clearTable() {
	domBlumBaca.innerHTML = `<tr><th>Judul</th>
							<th>Penulis</th>
							<th>Tahun</th>
							<th>Aksi</th>
						</tr>`;
	domSudahBaca.innerHTML = `<tr><th>Judul</th>
							<th>Penulis</th>
							<th>Tahun</th>
							<th>Aksi</th>
						</tr>`;
}

function bacaData() {
	clearTable();
	dataGet = JSON.parse(localStorage.getItem(localStorageKey));
	// isiData();
	if (dataGet.length == 0) {
		console.log("data kosong");
	} else {
		dataBlum = dataGet.filter(dataGet => dataGet["isComplete"] == false);

		dataTerbaca = dataGet.filter(dataGet => dataGet["isComplete"] == true);

		if (dataBlum != null) {
			let outputBlum = "";
			for (var i = 0; i < dataBlum.length; i++) {
				outputBlum += `<tr><td>${dataBlum[i]["title"]}</td><td>${dataBlum[i]["author"]}</td><td>${dataBlum[i]["year"]}</td>
				<td class="aksi">
				<button class="grey" onclick="Sudahkan(${dataBlum[i]["id"]})">Sudah Dibaca</button>
				<button class="red" onclick="hapusData(${dataBlum[i]["id"]})">Hapus</button>
				</td></tr>`;
			}
			domBlumBaca.innerHTML += outputBlum;
		}

		if (dataTerbaca != null) {
			let outputBaca = "";
			for (var i = 0; i < dataTerbaca.length; i++) {
				outputBaca += `<tr><td>${dataTerbaca[i]["title"]}</td><td>${dataTerbaca[i]["author"]}</td><td>${dataTerbaca[i]["year"]}</td>
                    <td class="aksi">
                    <button class="grey" onclick="Belumkan(${dataTerbaca[i]["id"]})">Belum Dibaca</button>
                    <button class="red" onclick="hapusData(${dataTerbaca[i]["id"]})">Hapus</button>
                    </td></tr>`;
			}
			domSudahBaca.innerHTML += outputBaca;
		}
	}
}

// button isi form
document.getElementById("inputBook").addEventListener("submit", e => {
	e.preventDefault();
	tambahData();
	localStorage.setItem(localStorageKey, JSON.stringify(data));
	bacaData();
});

function hapusData(x) {
	let confirmation = confirm("Anda yakin ingin menghapus data tersebut?");
	if (confirmation == true) {
		dataGet = JSON.parse(localStorage.getItem(localStorageKey));
		dataGet = dataGet.filter(function (value) {
			return value.id != x;
		});
		data = data.filter(function (value) {
			return value.id != x;
		});
		localStorage.setItem(localStorageKey, JSON.stringify(dataGet));

		bacaData();
	}
}

function Sudahkan(x) {
	dataGet = JSON.parse(localStorage.getItem(localStorageKey));
	dataHasil = dataGet.filter(function (value) {
		return value.id == x;
	});
	dataHasil[0]["isComplete"] = true;
	let index = dataGet.findIndex(item => item.id == x);
	dataGet[index] = dataHasil[0];
	data = dataGet;
	localStorage.setItem(localStorageKey, JSON.stringify(dataGet));
	bacaData();
}

function Belumkan(x) {
	dataGet = JSON.parse(localStorage.getItem(localStorageKey));
	dataHasil = dataGet.filter(function (value) {
		return value.id == x;
	});
	dataHasil[0]["isComplete"] = false;
	let index = dataGet.findIndex(item => item.id == x);
	dataGet[index] = dataHasil[0];
	data = dataGet;
	localStorage.setItem(localStorageKey, JSON.stringify(dataGet));
	bacaData();
}

// find manual dah susah bgt pake bacaData()
document.getElementById("searchSubmit").addEventListener("submit", e => {
	e.preventDefault();

	let inputan = document.getElementById("searchBookTitle").value;

	dataGet = JSON.parse(localStorage.getItem(localStorageKey));
	dataGet = dataGet.filter(function (value) {
		return value.title.toLowerCase().includes(inputan.toLowerCase());
	});
	clearTable();
	// isiData();
	if (dataGet.length == 0) {
		alert("Data Tidak ditemukan");
	} else {
		dataBlum = dataGet.filter(dataGet => dataGet["isComplete"] == false);
		dataTerbaca = dataGet.filter(dataGet => dataGet["isComplete"] == true);

		if (dataBlum != null) {
			let outputBlum = "";
			for (var i = 0; i < dataBlum.length; i++) {
				outputBlum += `<tr><td>${dataBlum[i]["title"]}</td><td>${dataBlum[i]["author"]}</td><td>${dataBlum[i]["year"]}</td>
				<td class="aksi">
				<button class="grey" onclick="Belumkan(${dataBlum[i]["id"]})">Sudah Dibaca</button>
				<button class="red" onclick="hapusData(${dataBlum[i]["id"]})">Hapus</button>
				</td></tr>`;
			}
			domBlumBaca.innerHTML += outputBlum;
		}

		if (dataTerbaca != null) {
			let outputBaca = "";
			for (var i = 0; i < dataTerbaca.length; i++) {
				outputBaca += `<tr><td>${dataTerbaca[i]["title"]}</td><td>${dataTerbaca[i]["author"]}</td><td>${dataTerbaca[i]["year"]}</td>
                    <td class="aksi">
                    <button class="grey" onclick="Sudahkan(${dataTerbaca[i]["id"]})">Belum Dibaca</button>
                    <button class="red" onclick="hapusData(${dataTerbaca[i]["id"]})">Hapus</button>
                    </td></tr>`;
			}
			domSudahBaca.innerHTML += outputBaca;
		}
	}
});
