<script>
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

    //console.log(images)

</script>


<div class = 'gallery col-{col}' in:fade>

    {#each images as image, index}

        <div class = 'elem' in:fly={{y: 50, delay: 200+index*100}}>
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
		margin: 48px 0;
        display: grid;
        grid-template-columns: repeat(3, calc(33% - 8px));
        gap: 16px;

        &.col-2{
            grid-template-columns: repeat(2, calc(50% - 12px));
            gap: 24px;
        }

        .elem{
            width: 100%;
            margin-bottom: 16px;
            img{
                box-shadow: none;
                border-radius: 6px;
                margin-bottom: 6px;

                box-shadow: 0 8px 16px rgba(black, 0.05);
                border: 1px solid rgba(white, 0.4);
            }
            p{
                color: rgba(black, 0.5);
                font-size: 13px;
                font-weight: 500;
                margin: 0;
            }
        }
	}

    @media screen and (max-width: 800px){
        .gallery{
            border: 2px solid red;
        }
    }

</style>