const SELECT = document.getElementById("categories");
const IMAGE_ELEMENT = document.getElementById("image");
document.addEventListener("DOMContentLoaded", () => {
	addDropdowns();
	pullRandom();
});
const API = "https://nekos.life/api/v2";
const CATEGORIES = {
	"randomHentaiGif": {
		"name": "Random Hentai GIF",
		"endpoint": "/img/Random_hentai_gif"
	},
	"pussy": {
		"endpoint": "/img/pussy"
	},
	"nekoGif": {
		"name": "Neko GIF",
		"endpoint": "/img/nsfw_neko_gif"
	},
	"neko": {
		"endpoint": "/img/lewd"
	},
	"lesbian": {
		"endpoint": "/img/les"
	},
	"kuni": {
		"endpoint": "/img/kuni"
	},
	"cumsluts": {
		"name": "Cum Sluts",
		"endpoint": "/img/cum"
	},
	"classic": {
		"endpoint": "/img/classic"
	},
	"boobs": {
		"endpoint": "/img/boobs"
	},
	"bJ": {
		"endpoint": "/img/bj"
	},
	"anal": {
		"endpoint": "/img/anal"
	},
	"avatar": {
		"endpoint": "/img/nsfw_avatar"
	},
	"yuri": {
		"endpoint": "/img/yuri"
	},
	"trap": {
		"endpoint": "/img/trap"
	},
	"tits": {
		"endpoint": "/img/tits"
	},
	"girlSoloGif": {
		"name": "Solo Girl GIF",
		"endpoint": "/img/solog"
	},
	"girlSolo": {
		"name": "Solo Girl",
		"endpoint": "/img/solo"
	},
	"smallBoobs": {
		"name": "Small Boobs",
		"endpoint": "/img/smallboobs"
	},
	"pussyWankGif": {
		"name": "Pussy Wank GIF",
		"endpoint": "/img/pwankg"
	},
	"pussyArt": {
		"name": "Pussy Art",
		"endpoint": "/img/pussy_jpg"
	},
	"kemonomimi": {
		"endpoint": "/img/lewdkemo"
	},
	"kitsune": {
		"endpoint": "/img/lewdk"
	},
	"keta": {
		"endpoint": "/img/keta"
	},
	"holo": {
		"endpoint": "/img/hololewd"
	},
	"holoEro": {
		"name": "Holo Ero",
		"endpoint": "/img/holoero"
	},
	"hentai": {
		"endpoint": "/img/hentai"
	},
	"futanari": {
		"endpoint": "/img/futanari"
	},
	"femdom": {
		"endpoint": "/img/femdom"
	},
	"feetGif": {
		"name": "Feet GIF",
		"endpoint": "/img/feetg"
	},
	"eroFeet": {
		"name": "Ero Feet",
		"endpoint": "/img/erofeet"
	},
	"feet": {
		"endpoint": "/img/feet"
	},
	"ero": {
		"endpoint": "/img/ero"
	},
	"eroKitsune": {
		"name": "Ero Kitsune",
		"endpoint": "/img/erok"
	},
	"eroKemonomimi": {
		"name": "Ero Kemonomimi",
		"endpoint": "/img/erokemo"
	},
	"eroNeko": {
		"name": "Ero Neko",
		"endpoint": "/img/eron"
	},
	"eroYuri": {
		"name": "Ero Yuri",
		"endpoint": "/img/eroyuri"
	},
	"cumArts": {
		"name": "Cum Arts",
		"endpoint": "/img/cum_jpg"
	},
	"blowJob": {
		"name": "Blowjob",
		"endpoint": "/img/blowjob"
	},
	"pussyGif": {
		"name": "Pussy GIF",
		"endpoint": "/img/pussy"
	}
};

function addDropdowns() {
	Object.keys(CATEGORIES).sort((element1, element2) => {
		let obj1 = CATEGORIES[element1];
		let obj2 = CATEGORIES[element2];
		let text1 = typeof obj1.name == "undefined" ?  element1.toUpperCase() : obj1.name.toUpperCase();
		let text2 = typeof obj2.name == "undefined" ?  element2.toUpperCase() : obj2.name.toUpperCase();
		return (text1 < text2) ? -1 : (text1 > text2) ? 1 : 0;
	}).forEach((key) => {
		let categoryObj = CATEGORIES[key];
		let categoryElement = document.createElement("option");
		categoryElement.innerText = categoryObj["name"] || uppercaseFirst(key);
		categoryElement.value = key;
		SELECT.appendChild(categoryElement);
	});
}

function randomKey(object) {
	let keys = Object.keys(object);
	return keys[Math.floor(Math.random() * keys.length)];
}

function uppercaseFirst(value) {
	if(typeof value != "string") value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function pullRandom() {
	let category = randomKey(CATEGORIES);
	SELECT.value = category;
	pull(category);
}

function pullImage() {
	pull(SELECT.value);
}

function pull(type) {
	if(!type || typeof CATEGORIES[type] == "undefined") return;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			draw(JSON.parse(xhr.responseText)["url"]);
		}
	};
	xhr.open('GET', API + CATEGORIES[type].endpoint, false);
	xhr.send();
}

function draw(url) {
	IMAGE_ELEMENT.src = url;
}
