"use strict";

//const $main = document.getElementById("main");
const $root = document.getElementById("root");

let cards = "";

fetch("./json/file.json")
	.then((res) => res.json())
	.then((info) => {
		info.sort((a, b) => a.student.localeCompare(b.student));
		for (let i = 0; i < info.length; i++) {
			cards += `
         <div class="card" style="width: 18rem; margin: 10px;">
			
                <img src="https://github.com/${info[i].usernameGithub}.png"
                     class="card-img-top"
                     alt="Imagen de perfil de ${info[i].student}"
                     onerror="this.onerror=null;this.src='./assets/no_img.jpg';">
				
                <div class="card-body">
                    <h5 class="card-title">${info[i].student}</h5>
                    <h5 class="card-title"><strong>CODE:</strong> ${info[i].code}</h5>
                </div>
                <div class="card-body">
				<a href="https://github.com/${
					info[i].usernameGithub
				}" target="_blank" class="card-link">
					<i class="bi bi-github btn btn-dark"></i>
				</a>
				<span class="card-text">${info[i].intensity}</span>
				<span class="card-text">
				${info[i].projects
					.map((p) => {
						if (p.name === "bit-1" && p.score.length > 1) {
							const suma = p.score.reduce((acc, val) => acc + val, 0);
							const promedio = (suma / 2).toFixed(1);
							return `<div><strong>${p.name}:</strong> ${promedio}</div>`;}
						else if (p.name === "bit-1" && p.score > 5) {	
							const promedio = (p.score[0] / 2).toFixed(1);
							return `<div><strong>${p.name}:</strong> ${promedio}</div>`;
						} else {
							return `<div><strong>${p.name}:</strong> ${p.score.join(", ")}</div>`;
						}
					})
					.join("")}
				</span>
								
                </div>
            </div>

            `;
		}
		//cards += `</div>`;
		$root.innerHTML = cards;
	})
	.catch((error) => {
		console.log("Error al cargar el archivo JSON:", error);
	});



