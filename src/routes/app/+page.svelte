


<script>

</script>


<div id = 'sidebar'>


    <div class = 'section'>

        <div class = 'section_title'>
            <h1 class = 'section_title_text'> Spaces </h1>
        </div>

        <div class = 'spaces'>

            <div class = 'space'>
                <img class = 'thumbnail' src = 'Hackerdash-mark.svg' alt = 'mark'>
                <h2 class = 'space-text'> Hackerdash </h2>
            </div>
            <div class = 'space active'>
                <img class = 'thumbnail' src = 'Hackerdash-mark.svg' alt = 'mark'>
                <h2 class = 'space-text'> Peyo Studio </h2>
            </div>
            <div class = 'space'>
                <img class = 'thumbnail' src = 'Hackerdash-mark.svg' alt = 'mark'>
                <h2 class = 'space-text'> The Mountain </h2>
            </div>
            <div class = 'space'>
                <img class = 'thumbnail' src = 'Hackerdash-mark.svg' alt = 'mark'>
                <h2 class = 'space-text'> The Mountain </h2>
            </div>

        </div>
    </div>


</div>

<style lang = "scss">

    #sidebar{
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 250px;
        background: white;
    }

    .spaces{

    }

    .section_title_text{
        color: #8495bd;
        font-size: 14px;
        font-weight: 400;
        padding: 10px 20px;
    }

    .space{
        display: flex;
        align-items: center;
        padding: 8px 10px;
        gap: 10px;
        margin: 5px 10px;
        border-radius: 5px;
        transition: 0.1s ease;
    }

    .space:hover{
        background: #EFF4FF;
    }

    .thumbnail{
        height: 24px;
        background: #F1F1F1;
        border-radius: 3px;
    }

    .active{
        background: #EFF4FF;
    }

    .space-text{
        font-size: 14px;
        font-weight: 400;
        letter-spacing: -0.4px;
        color: black;
        margin: 0;
    }

</style>