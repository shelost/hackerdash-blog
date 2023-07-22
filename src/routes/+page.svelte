<script lang = "js">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { onMount } from 'svelte'
	export let data

	onMount(() => {

			function C() {
				e.globalCompositeOperation = 'source-over'
				e.fillStyle = 'rgba(8,8,12,0.65)'
				e.fillRect(0, 0, f, p)
				e.globalCompositeOperation = 'lighter'
				x = q - u
				y = r - v
				u = q
				v = r
				for (
					var d = 0.86 * f, l = 0.125 * f, m = 0.5 * f, t = Math.random, n = Math.abs, o = z;
					o--;

				) {
					var h = A[o],
						i = h.x,
						j = h.y,
						a = h.a,
						b = h.b,
						c = i - q,
						k = j - r,
						g = Math.sqrt(c * c + k * k) || 0.001,
						c = c / g,
						k = k / g
					if (w && g < m)
						var s = 14 * (1 - g / m),
							a = a + (c * s + 0.5 - t()),
							b = b + (k * s + 0.5 - t())
					g < d && ((s = 0.0014 * (1 - g / d) * f), (a -= c * s), (b -= k * s))
					g < l && ((c = 2.6e-4 * (1 - g / l) * f), (a += x * c), (b += y * c))
					a *= B
					b *= B
					c = n(a)
					k = n(b)
					g = 0.5 * (c + k)
					0.1 > c && (a *= 3 * t())
					0.1 > k && (b *= 3 * t())
					c = 0.45 * g
					c = Math.max(Math.min(c, 3.5), 0.4)
					i += a
					j += b
					i > f ? ((i = f), (a *= -1)) : 0 > i && ((i = 0), (a *= -1))
					j > p ? ((j = p), (b *= -1)) : 0 > j && ((j = 0), (b *= -1))
					h.a = a
					h.b = b
					h.x = i
					h.y = j
					e.fillStyle = '#ff0051'
					e.beginPath()
					e.arc(i, j, c, 0, D, !0)
					e.closePath()
					e.fill()
				}
			}
			function E(d) {
				d = d ? d : window.event
				q = d.clientX - m.offsetLeft - n.offsetLeft
				r = d.clientY - m.offsetTop - n.offsetTop - 1000
			}
			function F() {
				w = !0
				return !1
			}
			function G() {
				return (w = !1)
			}
			function H() {
				this.color =
					'rgb(' +
					Math.floor(255 * Math.random()) +
					',' +
					Math.floor(255 * Math.random()) +
					',' +
					Math.floor(255 * Math.random()) +
					')'
				this.b = this.a = this.x = this.y = 0
				this.size = 1
			}
			var D = 2 * Math.PI,
				f = 1e3,
				p = 560,
				z = 300,
				B = 0.96,
				A = [],
				o,
				e,
				n,
				m,
				q,
				r,
				x,
				y,
				u,
				v,
				w

			function init() {
				/*try{var nlng=navigator.language||navigator.userLanguage;var lng=nlng.substr(0, 2).toLowerCase();if(lng=="ru"||lng=="uk"||lng=="be")document.getElementById("flw").innerHTML=': <a href="http://www.twitter.com/spielzeugz" target="_blank">Twitter</a> / <a href="http://plus.google.com/116743952899287181520" target="_blank">G+</a> / <a href="http://vk.com/id266298870">VK</a>';}catch(e){}*/
				o = document.getElementById('mainCanvas')
				if (o.getContext) {
					m = document.getElementById('outer')
					n = document.getElementById('canvasContainer')
					e = o.getContext('2d')
					for (var d = z; d--; ) {
						var l = new H()
						l.x = 0.5 * f
						l.y = 0.5 * p
						l.a = 34 * Math.cos(d) * Math.random()
						l.b = 34 * Math.sin(d) * Math.random()
						A[d] = l
					}
					q = u = 0.5 * f
					r = v = 0.5 * p
					document.onmousedown = F
					document.onmouseup = G
					document.onmousemove = E
					setInterval(C, 30)

					console.log('yo')
				} else
					document.getElementById('output').innerHTML =
						'Sorry, needs a recent version of Chrome, Firefox, Opera, Safari, or Internet Explorer 9.'
			}

			init()

	})
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>



<div id="splash" class="section center">
	<div id="canvasContainer">
		<canvas id="mainCanvas" width = "1000" height = "560">
		</canvas>
	</div>

	<div class="expo">
		<h1>Your life in an app.</h1>

		<h2>(as an Indie Hacker)</h2>

		<p>Coming Soon</p>

		<div id="socials">
			<a href="https://twitter.com/peyostudio">
				<img src="twitter.svg" class="icon" alt="icon" />
			</a>
			<a href="https://linkedin.com/in/peyostudio">
				<img src="linkedin.svg" class="icon" alt="icon" />
			</a>
			<a href="https://medium.com/@peyostudio">
				<img src="medium.svg" class="icon" alt="icon" />
			</a>
			<a href="https://instagram.com/peyostudio">
				<img src="instagram.svg" class="icon" alt="icon" />
			</a>
		</div>
	</div>
</div>

<!--
<h1>Blog</h1>
<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
-->

<style>

	#mainCanvas{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -2;
	}


	#socials {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin-top: 30px;
	}

	.icon {
		height: 44px;
		filter: invert(100%);
	}

	#splash {
		width: 100vw;
		height: 60vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.expo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-top: 350px;
	}

	.expo h1 {
		font-size: 64px;
		font-weight: 600;
		letter-spacing: -3px;
		color: white;
		margin-bottom: 10px;
	}

	.expo h2 {
		font-size: 24px;
		font-weight: 500;
		letter-spacing: -1px;
		color: white;
		margin-bottom: 10px;
	}

	/* Blog */

	.posts {
		display: grid;
		gap: var(--size-7);
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90vw;
	}

	.post {
		width: 900px;
		max-inline-size: 90%;
		color: black;

		border-radius: 20px;
		background: white;

		padding: 20px;
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: 40px;
		font-weight: 400;
		text-transform: capitalize;
		color: black;
	}

	.date {
		font-size: 16px;
		color: var(--text-2);
	}

	.description {
		font-size: 16px;
		font-weight: 300;
		margin-top: var(--size-3);
	}
</style>
