<script>

    export let data

    let playing = true
    let activeSong = false

    const Songs = [
        {
            title: 'Track 1',
            artist: 'Beethoven',
            src: 'audio/concerto.mp3'
        }
    ]

</script>


<div id = 'player'>

    <audio id="audio" controls autoplay>
        <source src="audio/concerto.mp3" id="source" />
    </audio>

    <div class = 'flex'>
        <div id = 'waveform'>
          <div class="wave wave1">
          </div>
          <div class="wave wave2">
          </div>
          <div class="wave wave3">
          </div>
        </div>
        <h3 id ='title'> Concerto </h3>
      </div>


      <!--
    <div id = 'button'>
        <svg id = 'play' width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M97.5361 56.4061L32.5073 18.6191C30.5073 17.4569 28 18.8998 28 21.213V96.787C28 99.1002 30.5073 100.543 32.5073 99.3809L97.5361 61.5939C99.5265 60.4373 99.5265 57.5627 97.5361 56.4061Z" fill="white"/>
        </svg>
    </div>

    <h1> Music </h1>
    -->

</div>


<style lang="scss">

    #player{
        position: fixed;
        bottom: 18px;
        right: 18px;

        background: #030025;
        width: 300px;
        height: 48px;
        padding: 12px 0 14px 14px;
        border-radius: 24px;
        color: white;

        box-shadow: 0 10px 30px rgba(#030025, 0.5), inset 0 -5px 10px rgba(white, 0.25);

        border: 1px solid rgba(white, 0.5);

        display: flex;
        align-items: center;
        gap: 8px;

        transition: 0.2s ease;

        #title{
            display: none;
        }


        #button{
            width: 24px;
            height: 24px;
            background: rgba(white, 0.2);
            border-radius: 16px;

            display: flex;
            justify-content: center;
            align-items: center;

            svg{
                height: 18px;
                color: black;
            }
        }

        h1 {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0px;
        }

        &:hover{
            transform: scale(1.04);
        }
    }


    :root {
        --m: 2;
        --wavefreq: calc(100ms * var(--m));
    }

    #waveform {
        display: flex;
        gap: 5px;
        .wave {
            animation: waveform var(--wavefreq) ease-in-out infinite forwards;
            background-color: white;
            border-radius: 15px;
            width: 3px;
            height: 8px;
            background-image: linear-gradient(to bottom, #0095ff, #00ff73);
        }
        .wave1 {
            --wavefreq: calc(200ms * var(--m));
            &.paused {
                --wavefreq: 0 !important;
                animation: none !important;
                transform: none !important;
                background: yellow !important;
                border: 5px solid green !important;
            }
        }
        .wave2 {
            --wavefreq: calc(300ms * var(--m));
        }
        .wave3 {
            --wavefreq: calc(400ms * var(--m));
        }
    }

  @keyframes waveform {
  0% {
    transform: scaleY(.5);
  }
  50% {
    transform: scaleY(1.5);
  }
  100% {
    transform: scaleY(.5);
  }
}


    @media screen and (max-width: 800px){
        #player{
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 60px;
            border-radius: 12px 12px 0 0;

            &:hover{
                transform: none;
            }
        }
    }


</style>