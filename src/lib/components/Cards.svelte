<script>
    import { writable } from 'svelte/store'
    import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { onMount, tick } from 'svelte'
    import { goto } from '$app/navigation';
	import bricks from 'bricks.js';
	import Card from '$lib/components/Card.svelte'
    import Image from "svelte-image";
	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	export let data

    let selected = writable(null)
    let modal = writable(false)

    let Grid;
    let Bricks;
    let Flow;
    let Modal;
    let Banner;

	onMount(async () => {
        await tick();

		window.addEventListener('scroll', handleScroll);
		setTimeout(() => {
			Bricks = bricks({
                container: document.getElementById('cards'),
                packed: 'data-packed',
                sizes: sizes
            });
			Bricks.pack()
			Bricks.update()
			setTimeout(() => {
				Bricks.pack()
			}, 100);
			Bricks.resize(true);
			return () => {
				grid.resize(false);
			};
		}, 100);
		setTimeout(() => {
			Bricks = bricks({
                container: document.getElementById('cards'),
                packed: 'data-packed',
                sizes: sizes
            });
			Bricks.pack()
		}, 300);
        setTimeout(() => {

			Bricks.pack()
            setTimeout(() => {
                Bricks.update()
            }, 100);
		}, 1000);


        setTimeout(() => {
            updateBricks()
        }, 2000);

        window.addEventListener('resize', updateBricks);
        document.addEventListener('DOMContentLoaded', updateBricks);
	});

    $: if (data.posts && Bricks) {
        tick().then(() => {
            Bricks.pack();
        });
        updateBricks()
        setTimeout(() => {
            updateBricks()
        }, 2000);
    }

    setTimeout(() => {
        updateBricks()
    }, 2000);
    setTimeout(() => {
        updateBricks()
    }, 4000);

    let sizes = [
        { columns: 1, gutter: 0},
        { mq: '800px', columns: 2, gutter: 20 },
        { mq: '1024px', columns: 3, gutter: 48 }
	]

    function titleCase(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    function initBricks(){
        if (Grid){
            Bricks = bricks({
                container: Grid,
                packed: 'data-packed',
                sizes: sizes
            });
            Bricks.pack()
        }
    }

    function updateBricks(){
        if (Bricks) {
            Bricks.pack();
            tick().then(() => {
                Bricks.pack();
            });
        }else{
            initBricks()
        }
    }

    function handleScroll(){
		if (Flow){
			Flow.style.opacity = 0
		}
	}

    let icon = 'sports_esports'
    let theme = '#6355FF'


    function handleHover(post, event) {
       // console.log(post, event)
		selected.set(post)
		let elem = event.currentTarget;
		let rect = elem.getBoundingClientRect();
		// Wait for modal to be created

        switch($selected.meta.type){
            case 'game':
                icon = 'sports_esports'
                theme = '#6355FF'
                break
            case 'blog':
                icon = 'feed'
                theme = '#FF2E65'
                break
            case 'gallery':
                icon = 'collections'
                theme = '#F959FF'
                break
            case 'comic':
                icon = 'question_answer'
                theme = '#FF7559'
                break
            case 'web':
                icon = 'computer'
                theme = '#0C75ED'
                break
            default:
                break
        }

        if (Flow) {
				Flow.style.top = `${rect.top}px`;
				Flow.style.left = `${rect.left}px`;
				Flow.style.width = `${rect.width}px`;
				Flow.style.height = `${rect.height}px`;
				Flow.style.opacity = .2;
				if (elem.classList.contains('blog')){
					Flow.style.opacity = .4
				}
			}
	}

    function closeModal(event) {
		// Only close the modal if the click was on the background (not the modal itself)
		if (event.target.id === 'pop') {
			modal.set(false)
		}else{
			goto(`/${$selected.slug}`, {noScroll: true})
		}
	}

    function handleClick(post, event) {
		// goto(`/blog/${post.slug}`, {noScroll: true})
		let elem = event.currentTarget
		let rect = elem.getBoundingClientRect();
		modal.set('true')
		// Wait for modal to be created
		setTimeout(() => {
			let rect2 = Modal.getBoundingClientRect()
            Flow.style.opacity = 1

            console.log(Banner)
			setTimeout(() => {
				Flow.style.transition = '0.3s cubic-bezier(0.22, 1, 0.36, 1)'
				Flow.style.top = `${rect2.top+75}px`
				Flow.style.left = `${rect2.left}px`
				Flow.style.width = `${rect2.width}px`
				Flow.style.height = `${rect2.height}px`
				Flow.style.opacity = 1

                setTimeout(() => {
                      Flow.style.top = `${rect2.top}px`
                }, 100);
				setTimeout(() => {
					Flow.style.opacity = 0

				}, 500);

			}, 100);
		}, 50);
	}

</script>

<div id = 'cards' bind:this={Grid}>
    {#each data.posts as post, i}
        <div in:fly={{y: 100, delay: i*150}}>
            <Card post={post}
                on:mouseover={(event) => handleHover(post, event)}
                on:click={(event) => handleClick(post, event)}
            />
        </div>
    {/each}
</div>

<div id="flow-container">
    <div id = 'flow' bind:this={Flow}></div>
</div>

{#if $modal}

	<div id = 'dark' transition:fade={{duration: 200}} ></div>
	<div id = 'pop' on:click={closeModal}>
        <div id = 'modal' bind:this={Modal} in:fade={{delay: 300}}>
			{#if $selected.meta.banner}

				<img in:scale = {{ start: .8, delay: 200}} src = '/banner/{$selected.meta.banner}.png' loading='lazy' class = 'banner' alt = 'Image'>
                <!--
                <div class = 'banner'>
                    <Image
                        src="/banner/{$selected.meta.banner}.png"
                        alt="Image"
                        lazy
                        height=290
                        width="720"
                        placeholder="blur"
                        bind:this={Banner}
                    />
                </div>
                -->

			{/if}
			<div class = 'content'>
                <h1 in:fly = {{y: 100, delay: 100}}> { $selected ? $selected.meta.title : 'Title' } </h1>
                <div class = 'label'>
                    <span class="material-icons" style = 'color: {theme}'>
                        { icon }
                    </span>
                    <h3> {titleCase( $selected ? $selected.meta.type : 'Type' )} </h3>
                </div>
                <p in:fly = {{y: 100, delay: 200}}>  { $selected ? $selected.meta.description : 'Description' } </p>
                <div class="tags">
                	{#each $selected.meta.categories as category}
                		<div class = 'tag'>
                			<h3>
                				{category}
                			</h3>
                		</div>
                	{/each}
                </div>
                <div class="prose" in:fly = {{y: 100, delay: 300}}>
                	<svelte:component class = 'mode' this={$selected.content} />
                </div>
                {#if $selected.meta.url}
                	<a href = '{$selected.meta.url}'>
                		<button>
                			<h1>
                				Visit
                			</h1>
                		</button>
                	</a>
                {/if}
			</div>
		</div>
	</div>

{/if}


<style lang="scss">

    #flow-container{
		z-index: 2;
	}

	#main{
		width: 100vw;
		padding-bottom: 100px;
	}

	#flow{
		position: fixed;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 10px;
		pointer-events: none;
		will-change: transform, opacity;
		transition: 0.2s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: 0 5px 10px rgba(black, 0.1);
	}

    #dark{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(black, 0.4);
        transition: 0.4s ease;
		z-index: 3;
	}

    #pop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(black, 0.1);
		z-index: 4;

		display: flex;
		justify-content: center;
		align-items: center;

		#modal{

			width: 720px;
			height: 720px;
			max-height: 85%;
			border-radius: 12px;
			transition: 0.2s ease;
			z-index: 4 !important;
			background: white;
			overflow-y: scroll;
			transform: translateY(16px);
			box-shadow: 0 15px 60px rgba(black, .25), inset 0px -15px 20px rgba(black, 0.08);
            border: 1px solid rgba(black, 0.2);

            /*
			img{
				border: 0;
				border-radius: 0;
			}
                */

            .banner{
                width: 100%;
                height: 290px;
                overflow-y: hidden;
               img{
                    width: 100%;
                    height: 290px;
                    object-fit: cover;
               }
            }

            .wrapper{
                border: 2px solid blue;
            }

            .prose{
                pointer-events: none;
            }

			.content{
				padding: 32px;

				h1{
					font-family: 'DM Serif Display', sans-serif;
					font-size: 52px;
					font-weight: 900;
					line-height: 98%;
					letter-spacing: 0;
                    max-inline-size: 100%;
				}

				h2{
					font-size: 24px;
					font-weight: 500;
				}

				p{
					margin-top: 12px;
					letter-spacing: -0.15px;
					font-size: 14px;
					font-weight: 300;
				}

				.tags{
					display: flex;
					gap: 10px;
					margin-top: 20px;
					.tag{
						padding: 8px 10px;
						border-radius: 12px;
						background: rgba(#030025, 0.1);
						h3{
							font-size: 14px;
							font-weight: 500;
						}
					}
				}

                .label{
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 6px 10px;
                    box-shadow: 0 4px 8px rgba(black, 0.1);
                    width: fit-content;
                    border-radius: 8px;
                    margin: 16px 0 16px 0;
                    span{
                        font-size: 16px;
                    }
                    h3{
                        font-size: 16px;
                        font-weight: 700;
                    }
                }

				button{
					background: #030025;
					color: white;

					border: none;
					outline: none;

					padding: 12px 30px;
					border-radius: 8px;

					margin-top: 24px;

					h1{
						font-size: 20px;
						font-weight: 700;
						text-shadow: none;
					}
				}
			}
		}
	}

    @media screen and (max-width: 800px){

        #cards{
            width: 100%;
            //border: 2px solid red;
        }

    }

</style>