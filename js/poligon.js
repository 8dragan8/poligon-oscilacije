import { TimelineMax, TweenLite } from "gsap"

export class poligon {
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
		return 0.5 * this.a * (1 / Math.sin(Math.PI / this.n))
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
			let alfa = ((2 * Math.PI) / this.n) * i + rotateOff
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
		let tacke = ``
		this.koordinate.forEach((tacka, i) => {
			if (i == 0) {
				tacke += `M ${tacka.x},${tacka.y} `
			}
			else if (i + 1 == this.koordinate.length) {
				tacke += `${tacka.x},${tacka.y} z`
			}
			else {
				tacke += `L ${tacka.x},${tacka.y} `
			}
		})
		let path = document.createElementNS(`http://www.w3.org/2000/svg`, `path`)
		path.classList = `kvadrat`
		path.setAttribute(`d`, tacke)
		path.style.stroke = `${this.colour}`
		path.id = `motion${this.n}`
		return path
	}
	get atom() {
		let atom = document.createElementNS(`http://www.w3.org/2000/svg`, `circle`)
		atom.setAttribute(`cx`, this.koordinate[0].x)
		atom.setAttribute(`cy`, this.koordinate[0].y)
		atom.setAttribute(`r`, 6)
		atom.style.fill = `${this.colour}`
		atom.classList = `kruzic`
		atom.id = `kruzic${this.n}`
		return atom
	}
	anime(atom, brzina, easeDr) {
		let tl = new TimelineMax({ repeat: -1 })
		for (let i = 1; i < this.koordinate.length; i++) {
			tl.add(TweenLite.to(atom, brzina, {
				ease: easeDr,
				x: this.koordinate[i].x - this.koordinate[0].x,
				y: this.koordinate[i].y - this.koordinate[0].y
			}))
		}
		tl.add(TweenLite.to(atom, brzina, { x: 0, y: 0, ease: easeDr }))
		// tl.render()
		// console.log(kruzic1.cx)
		return tl
	}
}
