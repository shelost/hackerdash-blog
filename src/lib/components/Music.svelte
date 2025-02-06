<script>


    export let data


</script>


<div id = 'player'>

    <div id = 'button'>
        P
    </div>

    <h1> Music </h1>

</div>


<style lang="scss">

    #player{
        position: fixed;
        bottom: 30px;
        right: 30px;

        background: #030025;
        width: 200px;
        height: 48px;
        padding: 12px 0 14px 14px;
        border-radius: 12px;
        color: white;

        box-shadow: 0 10px 30px rgba(#030025, 0.5), inset 0 -5px 10px rgba(white, 0.25);

        border: 1px solid rgba(white, 0.5);

        display: flex;
        align-items: center;
        gap: 8px;

        transition: 0.2s ease;


        #button{
            width: 24px;
            height: 24px;
            background: rgba(white, 0.4);
            border-radius: 16px;
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

</style>