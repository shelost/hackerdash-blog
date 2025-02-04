<script>
    import { formatDate } from '$lib/utils'
    import { goto } from '$app/navigation';
    import "material-icons/iconfont/material-icons.css";

    export let post


    function titleCase(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    function handleClick(post, event) {
		let elem = event.currentTarget
		let rect = elem.getBoundingClientRect();

        /*
        elem.style.transition = '0.7s cubic-bezier(0.22, 1, 0.36, 1)'
        elem.style.position = 'fixed'
        elem.style.top = rect.top + 'px'
        elem.style.left = rect.left + 'px'
        elem.style.width = rect.width + 'px'
        elem.style.height = rect.height + 'px'
        elem.style.zIndex = '3'

        setTimeout(() => {
            elem.classList.add('modal')
        }, 200);
        */

        // goto(`/${post.slug}`)
    }

    let icon = 'sports_esports'
    let theme = '#6355FF'
    let card = post.meta.card ? post.meta.card : ''

    switch(post.meta.type){
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

</script>


<div class = 'card' on:mouseover on:click>

    <div class = 'label'>
        <span class="material-icons" style = 'color: {theme}'>
            { icon }
        </span>
        <h3> {titleCase(post.meta.type)} </h3>
    </div>

    {#if post.meta.type == 'blog'}
        <div class = 'paper'></div>
    {/if}

    <div
        class = 'post {post.meta.type}'
    >

    {#if post.meta.card}
        <img class = 'thumbnail' src = '/card/{post.meta.card}.png' alt = 'Image'>
    {/if}

    {#if post.meta.color}
        <div class = 'color' style = 'background: #{post.meta.color}'></div>
    {/if}

    {#if post.meta.type == 'blog'}

            <div class = 'bar'></div>

            <div class = 'expo'>
                <h3 class = 'series'> {post.meta.series} </h3>
                <h1 class="title">{post.meta.title}</h1>
                <p class="date">{formatDate(post.meta.date)}</p>
                <p class="description">{post.meta.type}</p>

                <div class = 'prose prose-text'>
                    <svelte:component this={post.content} />
                </div>
            </div>

    {:else if post.meta.type == 'comic'}

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="date">{formatDate(post.meta.date)}</p>
                <p class="description">{post.meta.type}</p>

                <div class = 'prose text'>
                    <svelte:component this={post.content} />
                </div>
            </div>

     {:else if post.meta.type == 'gallery'}

             <div class = 'prose prose-image'>
                    <svelte:component this={post.content} />
                </div>

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="date">{formatDate(post.meta.date)}</p>
                <p class="description">{post.meta.type}</p>
            </div>

    {:else if post.meta.type == 'game'}



            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="date">{formatDate(post.meta.date)}</p>
                <p class="description">{post.meta.type}</p>
                <div class = 'tags'>
                    {#each post.meta.categories as tag}
                        <div class = 'tag'>
                            <h3> {tag} </h3>
                        </div>
                    {/each}
                </div>
                {#if post.meta.rating}
                    <div class = 'rating'>
                        {#each {length: post.meta.rating} as _, i}
                            <span class="material-icons">
                                star
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>

    {:else}

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="date">{formatDate(post.meta.date)}</p>
                <p class="description">{post.meta.type}</p>
            </div>

    {/if}

    </div>



</div>

<!--
<div class = 'main'>
    <div class = 'container'>
    </div>
</div>
-->


<style lang="scss">

    //@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Lora:ital,wght@0,400..700;1,400..700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

	.main {
		position: fixed !important; /* Ensures it floats over previous page */
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: none;
		align-items: center;
		justify-content: center;
        background: rgba(black, 0.5);

        .container{
            position: relative;
            width: calc(95% - 400px);
            max-width: 1440px;
            height: calc(100vh - 85px);
            max-height: 1080px;
        }
	}

    .card{
        position: relative;
        width: fit-content;

        .label{
            position: absolute;

            top: -2px;
            left: -3px;

            z-index: 1;
            border-radius: 8px;
            padding: 6px 8px;
            color: #030025;
            background: rgba(white, 0.9);
            backdrop-filter: blur(4px);
            //border: 2px solid black;
            box-shadow: 0 4px 20px rgba(#00106D, 0.25), inset 0 -2px 3px rgba(black, 0.08);
            transition: 0.2s ease;


            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            span{
                font-size: 16px;
                color: black;
            }
            h3{
                color: #151c40;
                font-size: 13.5px;
                font-weight: 700;
                letter-spacing: -0.4px;
            }
        }

        .paper{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(white, 0.75);
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(#030025, 0.1), inset 0 -2px 3px rgba(black, 0.08);
            transform: rotate(5deg);
            transition: 0.2s ease;
            //border: 5px solid red;
        }

        &:hover{
            .label{
                transform: translateY(-10px);
                opacity: 0;
            }
            .paper{
                transform: rotate(3deg) scale(1.01);
            }
        }
    }



    .post {
		width: 360px;
		border-radius: 16px;
		box-shadow: 0 15px 40px rgba(black, 0.15);
        aspect-ratio: 5/4;

		opacity: 1;
		transition: 0.1s ease;
		color: #030025;
		position: relative;

        border: 2px solid rgba(white, 0.1);
        backdrop-filter: blur(10px);
		overflow: hidden;


        .thumbnail{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			z-index: -1;
			border-radius: 0;
            transition: 0.2s ease;
		}

        .color{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

		.expo{
			padding: 24px;

			h1{
               // font-family: 'DM Serif Display', sans-serif;
				font-size: 28px;
				line-height: 90%;
				font-weight: 700;
				margin-bottom: 8px;
				text-align: left;
			}


            /*
			h1{
				font-family: 'DM Serif Display', sans-serif;
				font-weight: 900;
				font-size: 32px !important;
				letter-spacing: .1px;
				color: rgba(black, 0.8);
			}
            */

			p{
				font-size: 14px;
				font-weight: 300;
				letter-spacing: -0.25px;
			}

            .date{
                color: rgba(black, 0.5);
                font-weight: 100;
                letter-spacing: -0.4px;
            }

			.description{
				display: none;
			}
		}


		&.game{
			color: white;
			background: none;
			aspect-ratio: 5/4;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
            border-radius: 28px;
            border: 6px solid rgba(white, 0);


			.expo{
				//opacity: 0;
                //transform: translateY(10px);
                transition: 0.2s ease;
				background-image: linear-gradient(to top, rgba(#030025, 0.5), rgba(#030025, 0));

                background: white;

				h1{
                    font-weight: 800;
					//text-shadow: 0 10px 25px rgba(black, .5);
                    color: #030025;
				}
                .date{
                    display: none;
                }

                .tags{
                    display: none;
                }
			}

            .rating{
                display: none;
                gap: 2px;
                background: rgba(white, 0.9);
                border-radius: 12px;
                width: fit-content;
                padding: 4px 6px;
                color: #ffce00;
                span{
                    font-size: 22px;
                }
            }

            /*
            .expo{
				opacity: 0;
                transform: translateY(10px);
                transition: 0.2s ease;
				background: rgba(white, 1);
                //color: black;
                margin: 8px;
                border-radius: 18px;
				h1{
					text-shadow: 0 10px 25px rgba(black, .5);
				}
                .date{
                    display: none;
                }
			}
                */

            &:hover{
                .thumbnail{
                    transform: scale(1.05);
                }
                .expo{
                    opacity: 1;
                    transform: translateY(0px);
                }
            }
		}


        &.comic{
			color: white;
			background: none;
			aspect-ratio: 10/12;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			.expo{
				opacity: 0;
                transform: translateY(10px);
                transition: 0.2s ease;
				background-image: linear-gradient(to top, rgba(#030025, 0.5), rgba(#030025, 0));
				h1{
					text-shadow: 0 10px 25px rgba(black, .5);
				}
                .date{
                    display: none;
                }
                .prose{
                    display: none;
                }
			}
            &:hover{
                .expo{
                    opacity: 1;
                    transform: translateY(0px);
                }
            }
		}

		&.blog{
			aspect-ratio: 1;
			background: rgba(white, 0.8);
            border-radius: 8px;

            .bar{
                width: 100%;
                height: 36px;
                background: rgba(#FF2E65, 0.8);
                //display: none;
            }

			h3{
				font-size: 14px;
				font-weight: 600;
				margin-bottom: 4px;
			}

			h1{
				font-family: 'DM Serif Display', sans-serif;
				font-weight: 900;
				font-size: 32px !important;
				letter-spacing: .1px;
				color: rgba(black, 0.8);
			}
		}

        &.gallery{

            aspect-ratio: 4/5;

            .prose{
                margin: auto;
                width: 90%;
                aspect-ratio: 1;
                overflow: hidden;
                border: 2px solid red;


            }
            .thumbnail{
                display: none;
            }
            .expo{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 50%;
                //background-image: linear-gradient(to top, rgba(white, 1) 40%, rgba(white, 0));
            }



        }

        &.web{
            height: fit-content !important;
            .thumbnail{
                position: relative;
                border: 3px solid red;
            }
            &:hover{
                .prose{
                    transition: 0.2s ease;
                    //transform: scale(1.02);
                }
            }
        }

        .tags{
            display: flex;
            gap: 8px;
            margin-top: 14px;
            .tag{
                background: rgba(white, 0.1);
                padding: 4px 8px 6px 8px;
                border-radius: 10px;
                box-shadow: 0 6px 12px rgba(black, 0.1);
                h3{
                    font-size: 12.5px;
                    font-weight: 600;
                    color: rgba(white, 0.9);
                }
            }
        }

		&:hover{
			opacity: 1;
			transform: scale(1.03);
			//animation: float 0.5s ease-in-out infinite alternate-reverse;
		}

        &.modal{
            transition: 0.7s cubic-bezier(0.22, 1, 0.36, 1);
            position: fixed;
            top: 10px;
            left: 10px;
            width: 700px;
            height: 3000px;
            max-height: calc(90vh - 60px);
            z-index: 3;
        }
	}

</style>