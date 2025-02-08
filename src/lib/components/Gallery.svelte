<script>
    import { writable } from 'svelte/store'
    import { activeImage, showPreview } from '$lib/store';
    import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

    export let images = []
    export let col = 3

    let Preview

    let preview = writable(false)
    let active = writable(null)

    function handleClick(event, image, index){

        showPreview.set(true)
        activeImage.set(image)
        console.log(event, image, index)
    }

    function closeModal(event) {
		// Only close the modal if the click was on the background (not the modal itself)
		if (event.target.id === 'pop') {
			showPreview.set(false)
		}else{
			//goto(`/${$selected.slug}`, {noScroll: true})
		}
	}

</script>


<div class = 'gallery grid col-{col}' in:fade>

    {#each images as image, index}

        <div class = 'elem'
            in:fly={{y: 50, delay: 200+index*50}}
            on:click = {(event) => {handleClick(event, image, index)}}
        >
            <img src = '../img/{image.url}.png' alt = 'Image'>
            <p> {image.caption} </p>
        </div>

    {/each}

</div>


<style lang="scss">

    .gallery{
		display: flex;
		//justify-content: space-between;
		//flex-wrap: wrap;
		//width: 120%;
		//transform: translateX(-9%);
        //border: 1px solid red;
		margin: 48px 0;
        display: grid;
        grid-template-columns: repeat(3, 32%);
        column-gap: 2%;
        row-gap: 8px;
        transition: 0.2s ease;

        &.col-2{
            grid-template-columns: repeat(2, calc(49%));
            //gap: 24px;
        }

        &.col-4{
            grid-template-columns: repeat(4, calc(23.5%));
            //gap: 24px;
        }

        .elem{
            width: 100%;
            margin-bottom: 0;
            transition: 0.2s ease;
            img{
                box-shadow: none;
                border-radius: 6px;
                margin-bottom: 6px;

                box-shadow: 0 6px 12px rgba(black, 0.05);
                border: 1px solid rgba(white, 0.4);
            }
            p{
                color: rgba(black, 0.5);
                font-size: 13px;
                font-weight: 500;
                margin: 0;
            }

            &:hover{
                opacity: 0.95;
            }
        }
	}


    @media screen and (max-width: 800px){
        .gallery{
            //border: 2px solid red;
        }
    }

</style>