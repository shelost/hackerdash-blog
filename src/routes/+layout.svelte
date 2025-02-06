<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'
	import PageTransition from './transition.svelte'
	import { expandedPost, showHeader } from '$lib/store';
	import { onMount } from 'svelte'

	import 'open-props/style'
	import 'open-props/normalize'
	import 'open-props/buttons'
	import '../app.css'

	export let data

	let show = false

	setTimeout(() => {
		show = true
	}, 100);

	onMount(() => {

function Id(arg){
	return document.getElementById(arg)
}

function Class(arg){
	return document.getElementsByClassName(arg)
}

//________________________________ Interaction ________________________________//

let XP = 1, YP = 1
let MX = 0, MY = 0
let in_window = true

window.addEventListener('mousemove', e => {
	in_window = true
	MX = e.clientX
	MY = e.clientY
	let xc = window.innerWidth / 2
	let yc = window.innerHeight / 2
	XP = 1 + (xc - MX) / (xc * 20)
	YP = 1 + (MY - yc) / (yc*20)
})

window.addEventListener('mouseleave', e => {
	in_window = false
	console.log('yo')
})


window.addEventListener('mouseenter', e => {
	in_window = true
})

document.addEventListener("mouseleave", e => {
	if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight))
	{
		in_window = false
	}
});

function hover(x, y, w, h) {
	if (MX > x && MX < x + w && MY > y && MY < y + h) {
		return true
	}
	return false
}

//________________________________ Canvas ________________________________//

const canvas = Id('canvas');
const backdrop = Id('bgcanvas');
const ctx = canvas.getContext('2d');
const btx = backdrop.getContext('2d');

let height = window.innerHeight
let width = window.innerWidth
let ratio = window.innerWidth / window.innerHeight
let r1 = 0
let r2 = 0
let step = 0.5
let angle = 0
let loc = []

//________________________________ Loop ________________________________//

let loop = () => {

	//document.body.style.cursor = 'none'
	backdrop.width = window.innerWidth
	backdrop.height = window.innerHeight

	// canvas
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	let hovering = false

	for (let i = 0; i < Class('hoverable').length; i++) {
		let div = Class('hoverable')[i]
		let rect = div.getBoundingClientRect()
		if (hover(rect.x, rect.y, rect.width, rect.height)) {
			hovering = div
		}
	}

	if (hovering) {
		r2 = 12
		r1 += step
		if (r1 > 25 || r1 < 15) {
			step = step * -1
		}
	} else {
		r2 = 8
		r1 = 15
	}

	if (in_window) {
		ctx.globalAlpha = 1
		ctx.fillStyle = '#030025'
		ctx.beginPath()
		ctx.arc(MX, MY, r2, 0, Math.PI * 2)
		ctx.closePath()

		ctx.globalAlpha = 1
		ctx.shadowColor = 'white'
		ctx.shadowBlur = 15;
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0
		ctx.fill()
	}

	if (in_window) {

		for (let i = 0; i <3; i++){

			if (loc[i] == undefined) {
				loc[i] = [0,0,0,0]
			}

			let c = loc[i]

			let dx = MX - c[0]
			let dy = MY - c[2]

			let theta = Math.atan(dy / dx)
			let speed = 1.6 - 0.6*i

			let xs = speed * Math.abs(Math.cos(theta))
			let ys = speed * Math.abs(Math.sin(theta))

			if (dx > 1) {
				c[1] += xs
			} else if (dx < - 1){
				c[1] -= xs
			} else {
				c[1] *= 0.2
			}

			if (dy > 1) {
				c[3] += ys
			} else if (dy < -1){
				c[3] -= ys
			} else {
				c[3] *= 0.2
			}

			c[0] += c[1]
			c[2] += c[3]

			c[1] *= 0.9
			c[3] *= 0.9

			let a = (angle + i) * ((-1) ** (i))
			let r = 30+40*i

			btx.globalAlpha = 0.3 - 0.1 * i
			btx.globalAlpha = 1
			btx.lineWidth = 0;
			btx.lineCap = 'round'
			btx.fillStyle = 'rgba(255,255,255, 0.1)'
			btx.shadowOffsetX = 10;
			btx.shadowOffsetY = 10;
			//btx.fillStyle = 'black'

			btx.shadowColor = 'blue'
			switch (i){
				case 1:
					btx.shadowColor = 'red'
					break
				case 2:
					btx.shadowColor = 'gold'
					break
				default:
					break
			}

			btx.shadowBlur = 70;
			btx.strokeStyle = 'rgba(255,255,255,1)'
			btx.beginPath()
			btx.arc(c[0], c[2], r, 0, Math.PI*2)
			btx.closePath()
			//btx.stroke()
			btx.fill()

		}
		ctx.globalAlpha = 1;
	}

	//ctx.globalAlpha = 0.5;
	//ctx.fillStyle = 'red'
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	angle += 0.1;

	// pieces

	width = window.innerWidth
	height = window.innerHeight
	ratio = window.innerWidth / window.innerHeight
	let vw = window.innerWidth / 100
	let vh = window.innerHeight / 100
	let xw = (window.innerWidth - 1000) / 100
	let yw = (window.innerHeight - 600)/100
	let scale = Math.log10(window.innerWidth / 500)


	for (let i = 0; i < Class('piece').length; i++){
		let div = Class('piece')[i]
	// div.style.transform = `scale(${scale})`
	}

	window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

});

</script>

<div class="layout">

	<Header />

	<main>
		<video id = 'video' autoplay muted loop>
			<source src="platformr.mp4" type="video/mp4">
		</video>

		<div id = 'background' style = 'background-image: url("samhan.png")'>
		</div>

		<canvas id="bgcanvas">
		</canvas>

		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
		<canvas id="canvas">
		</canvas>


	</main>


</div>

<style lang="scss">


	#bgcanvas{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -2;
	}

	#background{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -2;
		background-size: cover;
		background-position: center;
		opacity: 0.1;
		//filter: contrast(1000%);
	}

	#video{
		position: fixed;
		top: 0vh;
		left: 0;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		z-index: -3;
		opacity: 0.1;
		//filter: grayscale(100%);
		display: none;
	}

	#canvas{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		pointer-events: none;
	}

	.layout {
		height: 100%;
		width: 100vw;
		max-inline-size: 1440px;
		//padding-inline: var(--size-7);
	}

	main {
		/*
		position: fixed;
		top: 0vh;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		//border: 2px solid red;
		//padding-block: var(--size-9);
		*/
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
