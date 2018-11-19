// var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight
/* eslint-disable no-unused-vars */
class poligon {
	constructor(ancorT, a, n, colour) {

		this.ancorT = ancorT
		this.a = a
		this.n = n
		this.colour = colour
		this.r = this.gabarit
		this.koordinate = this.koordin
	}

	//opisani krug odredjuje gabarit poligona
	get gabarit() {
		// return this.a / (2 * Math.sin(Math.PI / this.n))
		return (0.5 * this.a) * (1 / Math.sin((Math.PI / this.n)))

	}

	get koordin() {
		let koordinate = []
		let r = this.gabarit
		let n = this.n
		let ofset = Math.floor(n / 2) + 1


		for (let i = 0; i < this.n; i++) {
			let rotateOff = Math.PI / -2
			if (this.n % 2 == 0) {
				rotateOff -= Math.PI / this.n
			}
			let alfa = (((2 * Math.PI) / this.n) * i) +
				rotateOff
			// console.log('rotateOFF ' + i + ': ' + rotateOff * (180 / Math.PI))
			// console.log('alfa ' + i + ': ' + alfa * (180 / Math.PI))
			let x = this.ancorT[0] + Math.floor(r * Math.cos(alfa))
			let y = this.ancorT[1] + Math.floor(r * Math.sin(alfa))

			koordinate.push([x, y])

		}
		let temp1 = koordinate.slice(ofset)
		let temp2 = koordinate.slice(0, ofset)

		return temp1.concat(temp2)
		// return koordinate
	}

	get svg() {
		let tacke = ''
		// this.koordin.forEach(tacka => {

		// 	tacke += `${tacka[0]},${tacka[1]} `
		// })
		this.koordin.forEach((tacka, i) => {
			if (i == 0) {
				tacke += `M ${tacka[0]},${tacka[1]} `

			} else if (i + 1 == this.koordin.length) {

				tacke += `${tacka[0]},${tacka[1]} z`
			} else {
				tacke += `L ${tacka[0]},${tacka[1]} `

			}

		})

		let svg = `<path class='kvadrat' d='${tacke}' style='stroke:${this.colour};' id='motion${this.n}'/>`

		return svg
	}
}
// parametri

let brojPoligona = 32
let brzina = 1



let bojaPozadine = document.getElementById('boja-pozadine')

let slider = document.getElementById('slider')
let slidLabel = document.getElementById('slidLabel')
let speed = document.getElementById('speed')
let speedLabel = document.getElementById('speedLabel')
let poliOnOff = document.getElementById('inpPoliChBx')

slidLabel.innerHTML = brojPoligona
speedLabel.innerHTML = 'x' + brzina

init(brojPoligona, brzina)
poliOnOff.onchange = function () {
	console.log(this.checked)
	if (this.checked) {
		document.styleSheets[0].rules[5].style['strokeWidth'] = '2px'
	}
	else if (!this.checked) {
		document.styleSheets[0].rules[5].style['strokeWidth'] = '0px'

	}

}

// bojaPozadine.onchange = function () {
// 	let body = document.getElementsByTagName('body')
// 	body[0].setAttribute('style', `background-color: ${this.value};`)
// }
speed.onchange = function () {
	brzina = Number(this.value)
	speedLabel.innerHTML = 'x' + brzina
	init(brojPoligona, brzina)
}

slider.onchange = function () {
	brojPoligona = Number(this.value)
	slidLabel.innerHTML = brojPoligona
	init(brojPoligona, brzina)
}

function init(brojPoligona, speedIndex) {
	let centar = [500, 500]
	let poligoni = []
	let skala = 1000 * Math.sin((Math.PI / (brojPoligona + 2)))

	for (let i = 3; i < brojPoligona; i++) {

		let bojaPoli = bojaHsla(brojPoligona, brojPoligona - i)
		poligoni.push(new poligon(centar, skala, i, bojaPoli))

	}


	// console.log(`brojPoligona+2: ${brojPoligona+2}`)
	// console.log(`brojPoligona: ${brojPoligona}`)
	// console.log(`Skala: ${skala}`)


	let animacija = document.getElementsByClassName('animacija')
	animacija[0].innerHTML = '<svg viewBox=\'0 0 1000 1000\'></svg>'
	let insSvg = document.getElementsByTagName('svg')
	insSvg[0].innerHTML = ''

	// console.log(insSvg)
	let x = poligoni.length + 1

	for (let i = poligoni.length - 1; i >= 0; i--) {

		insSvg[0].innerHTML += poligoni[i].svg

	}

	for (let i = 0; i < poligoni.length; i++) {

		let n = poligoni[i].n
		let brzina = ((n / x) + 1) * speedIndex

		x--

		let bojaKrug = bojaHsla(poligoni.length + 1, poligoni.length + 1 - i)

		insSvg[0].innerHTML += `<circle cx='0' cy='0' r="6" fill='${bojaKrug}'class='kruzic'>
								<animateMotion dur="${brzina}s" repeatCount="indefinite" id="${poligoni[i].n}">
									<mpath xlink:href="#motion${poligoni[i].n}"/>
								</animateMotion>
							</circle>`

	}
}

function bojaRND() {
	let hex = '000000' + (Math.floor(Math.random() * 0xffffff)).toString(16)
	return '#' + hex.slice(-6)
}

function bojaHslaH(range, red) {
	let h = 360 / range * red
	let s = Math.floor(Math.random() * 100)
	let l = Math.floor(Math.random() * 100)
	let a = Math.random()

	return `hsla(${h}, ${s}%, ${l}%, ${a})`

}

function bojaHslaS(range, red) {
	let h = Math.floor(Math.random() * 360)
	let s = 100 / range * red
	let l = Math.floor(Math.random() * 100)
	let a = Math.random()

	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

function bojaHslaA(range, red) {

	let h = Math.floor(Math.random() * 360)
	let s = Math.floor(Math.random() * 100)
	let l = Math.floor(Math.random() * 100)
	let a = 1 / range * red

	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

function bojaHsla(range, red) {

	let h = 360 / range * red
	let s = 100 / range * red
	let l = 60
	let a = 1 / range * red

	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}