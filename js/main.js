// var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight
/* eslint-disable no-unused-vars */

import {
	TimelineMax,
	Linear,
	Power4,
	SteppedEase,
	SlowMo,
	Circ,
	Elastic
} from "gsap"
import { poligon } from "./poligon"
import { bojaHsla, bojaHEX } from "./bojaRND"

// parametri

let brojPoligona = 16
let brzina = 1
let tl = new TimelineMax({ repeat: -1 })
let vrstaKretanja = Linear.easeNone

let bojaPozadine = document.getElementById(`boja-pozadine`)

let slider = document.getElementById(`slider`)
let slidLabel = document.getElementById(`slidLabel`)
let speed = document.getElementById(`speed`)
let speedLabel = document.getElementById(`speedLabel`)
let poliOnOff = document.getElementById(`inpPoliChBx`)
let fwdBTN = document.getElementById(`fwd`)
let pauseBTN = document.getElementById(`pause`)
let revBTN = document.getElementById(`rev`)
let kretanje = document.getElementById(`eases`)

slidLabel.innerHTML = brojPoligona
speedLabel.innerHTML = `x` + brzina

init(brojPoligona, brzina)

kretanje.onchange = function() {
	switch (this.value) {
	case `1`:
		vrstaKretanja = Linear.easeNone
		console.log(this.value)
		break
	case `2`:
		vrstaKretanja = Power4.easeInOut
		console.log(this.value)
		break
	case `3`:
		vrstaKretanja = SteppedEase.config(3)
		console.log(this.value)
		break
	case `4`:
		vrstaKretanja = SteppedEase.config(2)
		console.log(this.value)
		break
	case `5`:
		vrstaKretanja = SlowMo.ease.config(0.1, 1, false)
		console.log(this.value)
		break
	case `6`:
		vrstaKretanja = Circ.easeInOut
		console.log(this.value)
		break
	case `7`:
		vrstaKretanja = Elastic.easeIn.config(2, 0.75)
		console.log(this.value)
		break
	}
	init(brojPoligona, brzina)
}

poliOnOff.onchange = function() {
	let klasaPath = ``

	let cssovi = document.styleSheets
	for (let i = 0; i < cssovi.length; i++) {
		let klase = cssovi[i].rules

		for (let j = 0; j < klase.length; j++) {
			console.log(klase[j].selectorText)
			if (klase[j].selectorText == `path`) {
				klasaPath = klase[j]
			}
		}
	}
	console.log(klasaPath)
	// console.log(this.checked)
	if (this.checked) {
		klasaPath.style[`strokeWidth`] = `2px`
	} else if (!this.checked) {
		klasaPath.style[`strokeWidth`] = `0px`
	}
}

speed.onchange = function() {
	brzina = Number(this.value)
	speedLabel.innerHTML = `x` + brzina
	init(brojPoligona, brzina)
}

slider.onchange = function() {
	brojPoligona = Number(this.value)
	slidLabel.innerHTML = brojPoligona
	init(brojPoligona, brzina)
}

function init(brojPoligona, speedIndex) {
	let centar = [500, 500]
	let poligoni = []
	let skala = 1000 * Math.sin(Math.PI / (brojPoligona + 2))

	for (let i = 3; i < brojPoligona; i++) {
		let bojaPoli = bojaHEX(brojPoligona, brojPoligona - i)
		poligoni.push(new poligon(centar, skala, i, bojaPoli))
	}

	// console.log(poligoni[1])
	// console.log(poligoni[1].svg1)
	// console.log(poligoni[1].atom1)
	// console.log(poligoni[1].anime1)

	let animacija = document.getElementsByClassName(`animacija`)
	let svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`)
	svg.setAttribute(`viewBox`, `0 0 1000 1000`)
	animacija[0].innerHTML = ``
	animacija[0].appendChild(svg)
	let insSvg = document.getElementsByTagName(`svg`)
	insSvg[0].innerHTML = ``

	// console.log(insSvg)
	let x = poligoni.length + 1

	for (let i = poligoni.length - 1; i >= 0; i--) {
		insSvg[0].appendChild(poligoni[i].svg)
	}

	tl.kill()
	for (let i = 0; i < poligoni.length; i++) {
		let poligon = poligoni[i]

		let n = poligon.n
		// let brzina = ((n / x) + 1) * speedIndex
		// let brzina = 20 / n / x * speedIndex
		let brzina = ((poligoni.length + 3) / n / x) * speedIndex
		// console.log(`brzina = (${poligoni.length+3}/(${n} * ${x}) * ${speedIndex}`)
		// console.log(`brzina = ${brzina}`)
		x--

		insSvg[0].append(poligon.atom)
		let atom = `#kruzic${poligon.n}`

		// poligon.anime(atom, brzina).kill
		tl.add(poligon.anime(atom, brzina, vrstaKretanja), 0).play()

		// console.log(poligon.atom)
	}
}
fwdBTN.onclick = function() {
	tl.play()
}
pauseBTN.onclick = function() {
	tl.pause()
}
revBTN.onclick = function() {
	tl.reverse()
}
