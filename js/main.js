// var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight
/* eslint-disable no-unused-vars */
class poligon {
	constructor(ancorT, a, n, colour) {

		this.ancorT = ancorT
		this.a = a
		this.n = n
		this.colour = colour
		this.r = this.gabarit

	}

	//opisani krug odredjuje gabarit poligona
	get gabarit() {
		// return this.a / (2 * Math.sin(Math.PI / this.n))
		return (0.5 * this.a) * (1 / Math.sin((Math.PI / this.n)))

	}

	get koordinate() {
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

			koordinate.push({ x: x, y: y })

		}
		let temp1 = koordinate.slice(ofset)
		let temp2 = koordinate.slice(0, ofset)

		return temp1.concat(temp2)
		// return koordinate
	}

	get svg() {
		let tacke = ''

		this.koordinate.forEach((tacka, i) => {
			if (i == 0) {
				tacke += `M ${tacka.x},${tacka.y} `

			} else if (i + 1 == this.koordinate.length) {

				tacke += `${tacka.x},${tacka.y} z`
			} else {
				tacke += `L ${tacka.x},${tacka.y} `

			}

		})

		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.classList = 'kvadrat'
		path.setAttribute('d', tacke)
		path.style.stroke = `${this.colour}`
		path.id = `motion${this.n}`


		return path
	}
	get atom() {

		let atom = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		atom.setAttribute('cx', this.koordinate[0].x, 'cy', this.koordinate[0].y, 'r', 6)
		atom.setAttribute('cx', this.koordinate[0].x)
		atom.setAttribute('cy', this.koordinate[0].y)
		atom.setAttribute('r', 6)
		// atom.setAttribute('fill', this.colour)
		atom.style.fill = `${this.colour}`
		atom.classList = 'kruzic'
		atom.id = `kruzic${this.n}`

		return atom

	}

	anime(atom, brzina) {
		let tl = new TimelineMax(
			{ repeat: -1 }
		)
		// let easeDr = Linear.easeNone
		// let easeDr = Power1.easeInOut
		let easeDr = Power2.easeInOut
		// let easeDr = Power3.easeInOut
		// let easeDr = Power4.easeInOut
		// let easeDr = Circ.easeInOut
		// let easeDr = Elastic.easeIn.config(1, 0.3)

		for (let i = 1; i < this.koordinate.length; i++) {

			tl.add(TweenLite.to(atom, brzina, { ease: easeDr, x: this.koordinate[i].x - this.koordinate[0].x, y: this.koordinate[i].y - this.koordinate[0].y }))
		}
		tl.add(TweenLite.to(atom, brzina, { x: 0, y: 0, ease: easeDr }))
		// tl.render()
		// console.log(kruzic1.cx)

		return tl
	}

}
// parametri

let brojPoligona = 16
let brzina = 1
let tl = new TimelineMax({ repeat: -1 })



let bojaPozadine = document.getElementById('boja-pozadine')

let slider = document.getElementById('slider')
let slidLabel = document.getElementById('slidLabel')
let speed = document.getElementById('speed')
let speedLabel = document.getElementById('speedLabel')
let poliOnOff = document.getElementById('inpPoliChBx')
let fwdBTN = document.getElementById('fwd')
let pauseBTN = document.getElementById('pause')
let revBTN = document.getElementById('rev')

slidLabel.innerHTML = brojPoligona
speedLabel.innerHTML = 'x' + brzina

init(brojPoligona, brzina)
poliOnOff.onchange = function () {

	let klasaPath = ''

	let cssovi = document.styleSheets
	for (let i = 0; i < cssovi.length; i++) {
		let klase = cssovi[i].rules

		for (let j = 0; j < klase.length; j++) {
			console.log(klase[j].selectorText)
			if (klase[j].selectorText == 'path') {
				
				klasaPath=klase[j]
				
			}
			
		}
		
	}
	console.log(klasaPath)
	// console.log(this.checked)
	if (this.checked) {
		klasaPath.style['strokeWidth'] = '2px'
	}
	else if (!this.checked) {
		klasaPath.style['strokeWidth'] = '0px'

	}

}

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


	console.log(poligoni[1])
	// console.log(poligoni[1].svg1)
	// console.log(poligoni[1].atom1)
	// console.log(poligoni[1].anime1)


	let animacija = document.getElementsByClassName('animacija')
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.setAttribute('viewBox', '0 0 1000 1000')
	animacija[0].innerHTML = ''
	animacija[0].appendChild(svg)
	let insSvg = document.getElementsByTagName('svg')
	insSvg[0].innerHTML = ''

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
		let brzina = 20 / n / x * speedIndex
		console.log(`brzina = (20/(${n} * ${x}) * ${speedIndex}`)
		console.log(`brzina = ${brzina}`)
		x--

		insSvg[0].append(poligon.atom)
		let atom = `#kruzic${poligon.n}`

		// poligon.anime(atom, brzina).kill
		tl.add(poligon.anime(atom, brzina), 0)
			.play()


		// console.log(poligon.atom)

	}

}
fwdBTN.onclick = function () {
	tl.play()
}
pauseBTN.onclick = function () {
	tl.pause()
}
revBTN.onclick = function () {
	tl.reverse()
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