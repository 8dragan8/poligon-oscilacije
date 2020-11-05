// import { exportSpecifier } from "babel-types"

exports.bojaRND = function() {
	let hex = `000000` + Math.floor(Math.random() * 0xffffff).toString(16)
	return `#` + hex.slice(-6)
}
exports.bojaHslaH = function(range, red) {
	let h = (360 / range) * red
	let s = Math.floor(Math.random() * 100)
	let l = Math.floor(Math.random() * 100)
	let a = Math.random()
	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}
exports.bojaHslaS = function(range, red) {
	let h = Math.floor(Math.random() * 360)
	let s = (100 / range) * red
	let l = Math.floor(Math.random() * 100)
	let a = Math.random()
	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}
exports.bojaHslaA = function(range, red) {
	let h = Math.floor(Math.random() * 360)
	let s = Math.floor(Math.random() * 100)
	let l = Math.floor(Math.random() * 100)
	let a = (1 / range) * red
	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}
exports.bojaHsla = function(range, red) {
	let h = (360 / range) * red
	let s = (100 / range) * red
	let l = 60
	let a = (1 / range) * red
	return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

exports.bojaHEX = function(range, i) {
	let frequency = 2*Math.PI/range
	let r = Math.ceil(Math.sin(frequency * i + 0) * 127 + 128)
	let g = Math.ceil(Math.sin(frequency * i + 2) * 127 + 128)
	let b = Math.ceil(Math.sin(frequency * i + 4) * 127 + 128)
	let b1 = new boja(r,g,b)
	return b1.hex
}

class boja {
	constructor(r,g,b) {
		this.r = r,
		this.g = g,
		this.b = b
	}
	get hex(){
		// return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
		return `#` + byte2Hex(this.r) + byte2Hex(this.g) + byte2Hex(this.b)
	}
	get rgb(){
		return `rgb(${this.r.toString(10)},${this.g.toString(10)},${this.b.toString(10)})`
	}
}

function byte2Hex(n) {
	var nybHexString = `0123456789ABCDEF`
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1)
}