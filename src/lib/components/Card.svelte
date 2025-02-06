<script>
    import { formatDate, formatYear } from '$lib/utils'
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

    {#if post.meta.type == 'comic'}
        <div class = 'paper'></div>
    {/if}


    <div
        class = 'post {post.meta.type}'
    >

    {#if post.meta.color}
        <div class = 'color' style = 'background: #{post.meta.color}'></div>
    {/if}

    {#if post.meta.card}
        <!--
        <img class = 'thumbnail' src = '/card/{post.meta.card}.png' alt = 'Image'>
        -->

        <div class = 'thumbnail' style = 'background-image: url("/card/{post.meta.card}.png")'></div>
    {/if}

    {#if post.meta.type == 'blog'}

            <div class = 'bar'></div>

            <div class = 'expo'>
                <h3 class = 'series'> {post.meta.series} </h3>
                <h1 class="title"> {post.meta.title} </h1>
                <p class="description"> {post.meta.description} </p>
                <h2 class="date"> {formatYear(formatDate(post.meta.date))} </h2>
            </div>

            <div class = 'prose prose-text'>
                <svelte:component this={post.content} />
            </div>

    {:else if post.meta.type == 'comic'}

            <div class = 'prose prose-image'>
                <svelte:component this={post.content} />
            </div>

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="description">{post.meta.description}</p>
                <h2 class="date"> {formatDate(post.meta.date)} </h2>
            </div>

     {:else if post.meta.type == 'gallery'}

             <div class = 'prose prose-image'>
                <svelte:component this={post.content} />
             </div>

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="description">{post.meta.description}</p>
                <h2 class="date"> {formatYear(formatDate(post.meta.date))} </h2>
            </div>

    {:else if post.meta.type == 'game'}

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="description">{post.meta.description}</p>
                <h2 class="date"> {formatDate(post.meta.date)} </h2>
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

            <div class = 'play'>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M97.5361 56.4061L32.5073 18.6191C30.5073 17.4569 28 18.8998 28 21.213V96.787C28 99.1002 30.5073 100.543 32.5073 99.3809L97.5361 61.5939C99.5265 60.4373 99.5265 57.5627 97.5361 56.4061Z" fill="white"/>
                </svg>
            </div>

    {:else}

            <div class = 'expo'>
                <h1 class="title">{post.meta.title}</h1>
                <p class="description">{post.meta.description}</p>
                <h2 class="date"> {formatDate(post.meta.date)} </h2>
            </div>

    {/if}

    <div class = 'gradient'></div>

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


            display: none;
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

            display: none;
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
		width: 340px;
		border-radius: 12px;
		box-shadow: 0 25px 50px rgba(#030025, 0.2);
        aspect-ratio: 5/4;
		opacity: 1;
		transition: 0.1s ease;
		color: #030025;
		position: relative;
        border: 2px solid rgba(white, 0);
        backdrop-filter: blur(10px);
		overflow: hidden;

        .thumbnail{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
            height: 100%;
			z-index: -1;
			border-radius: 0;
            background-size: cover;
            background-position: center center;
            transform: none;
            transition: 0.2s ease;
		}

        .color{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            opacity: 0.8;
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
                max-inline-size: 100%;
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

            .description{
                color: rgba(black, 0.5);
                font-weight: 500;
            }

            .date{
                color: rgba(black, 0.4);
                font-size: 13px;
                font-weight: 600;
                letter-spacing: -0.5px;
                background: rgba(white, 0.5);
                padding: 4px 8px;
                border-radius: 8px;
                width: fit-content;
                margin-top: 8px;

                position: absolute;
                bottom: 6px;
                right: 6px;
            }
		}


		&.game{
			color: white;
			background: white;
			aspect-ratio: 1.1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
            border-radius: 20px;
            border: none;
            //border: 2px solid rgba(#6355FF, 0.15);

            //box-shadow: 0 20px 40px rgba(black, 0.1);

            .color{
                display: none;
            }

            .thumbnail{
                top: 4%;
                left: 4%;
                width: 92%;
                aspect-ratio: 5/4;
                height: auto;
                border-radius: 18px 8px 50px 12px;
                border: 1px solid rgba(white, 0);
                box-shadow: 0 8px 16px rgba(black, 0.1), inset 0 -10px 15px rgba(black, 0.02);
            }

			.expo{
				//opacity: 0;
                //transform: translateX(-20px);
                transition: 0.2s ease;
				background-image: linear-gradient(to top, rgba(white, 1) 50%, rgba(white, 0));

                //background: rgba(white, .2);
               // width: fit-content;

                //margin: 12px;
                border-radius: 0 12px 0 0;

                color: black;
                padding: 80px 20px 16px 80px;


				h1{
                    font-size: 26px;
                    font-weight: 800;
                    line-height: 100%;
                    letter-spacing: -0.3px;
                    margin: 0;
					//text-shadow: 0 10px 25px rgba(black, .5);
                    //color: white;
				}
                .description{
                    margin: 0;
                    margin-top: 4px;
                }
                .date{
                    display: none;
                }

                .tags{
                    display: none;
                }
			}

            .play{
                position: absolute;
                bottom: 16px;
                left: 16px;
                width: 50px;
                height: 50px;
                border-radius: 50px;
                z-index: 3;

                display: flex;
                justify-content: center;
                align-items: center;

                background: #6355FF;
                border: 2px solid rgba(white, 0.1);

                box-shadow: 0 4px 12px rgba(#030025, 0.25), inset 0 -4px 8px rgba(black, 0.1);
                transition: 0.2s ease;

                svg{
                    height: 28px;
                    transition: 0.2s ease;
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

            &:hover{
                /*
                .thumbnail{
                    top: 0%;
                    left: 0%;
                    width: 100%;
                    height: 70%;
                   // transform: scale(1.03) translateY(-90px);
                }
                   */

                .expo{
                    opacity: 1;
                    transform: translateY(0px);
                }
                .play{
                    transform: scale(1.1);

                   svg{
                        height: 32px;
                   }
                }
            }
		}


        &.comic{
			color: white;
			background: none;
			aspect-ratio: 10/12;
			//display: flex;
			//flex-direction: column;
			//justify-content: flex-end;
            .thumbnail{
                z-index: 1;
                transition: 0.5s ease;
                border: 1px solid rgba(white, 0.5);
                box-shadow: -5px 5px 25px rgba(black, 0.75);
            }
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
            .prose{
                z-index: -1;
                transform: none;
                transition: 5s ease;

            }

            &:hover{
                .thumbnail{
                    border-radius: 12px;
                   // left: -90%;
                    //top: 1%;
                    //transform: rotate(-5deg);
                    opacity: 0;
                }
                .expo{
                    opacity: 1;
                    //transform: translateY(0px);
                }
                .prose{
                    transition: 30s ease;
                    transform: translateY(-50%);
                }
            }
		}

		&.blog{
			aspect-ratio: 1;
			background: rgba(white, 0.8);
            border-radius: 8px;
            border: 2px solid rgba(#FF2E65, 0.15);

            .bar{
                width: 100%;
                height: 18px;
                background: rgba(#FF2E65, 0.8);
                transition: 0.2s ease;
                //display: none;
            }

            .expo{
                h3{
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 6px;
                    color: #FF2E65;
                }
                h1{
                    font-family: 'DM Serif Display', sans-serif;
                    font-weight: 900;
                    font-size: 32px !important;
                    letter-spacing: .1px;
                    color: rgba(black, 0.8);
                }
            }

            .prose{
                padding: 0 24px;
                margin-top: -16px;
                margin: auto;
            }

            .gradient{
                position: absolute;
                left: 0;
                bottom: -2px;
                width: 100%;
                height: 72px;
                background-image: linear-gradient(to top, rgba(white, 1) 10%, rgba(white, 0));
            }

            &:hover{
                .bar{
                    height: 4px;
                }
            }
		}

        &.gallery{
            aspect-ratio: 4/5;

            .prose{
                margin: auto;
                margin-top: 16px;
                width: 90%;
                aspect-ratio: 9.8/10;
                overflow: hidden;
            }
            .thumbnail{
                //display: none;
                width: auto;
                height: auto;
                aspect-ratio: 1;
                z-index: 1;
                transition: 0.4s ease;
                backdrop-filter: blur(20px);
                width: 100%;
                background-size: contain;
            }
            .expo{
                z-index: 2;
                position: relative;
                background: white;
            }

            &:hover{
                .thumbnail{
                    //top: 10%;
                    opacity: 0;
                }
            }

        }

        &.web{
            aspect-ratio: .95;
            height: fit-content !important;

            .color{
                display: none;
            }
            .thumbnail{
                top: 15px;
                left: 5%;
                width: 90%;
                height: auto;
                aspect-ratio: 5/4;
                border-radius: 8px;
                position: relative;
                box-shadow: 0 10px 25px rgba(#030025, 0.3);
                //border: 3px solid red;
                transition: 0.2s ease;
            }
            .expo{
                margin-top: 16px;
                padding: 20px;
            }
            &:hover{
                .thumbnail{
                    transform: scale(1.05);
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


    @media screen and (max-width: 800px){

        .post{
            width: 90vw !important;
            margin-bottom: 40px;
        }

    }


    @media screen and (max-width: 800px){

        .post{
        }

    }


</style>