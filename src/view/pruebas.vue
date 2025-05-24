<script setup lang="ts">

</script>

<template>
    <div class="cont">
        <header>Header</header>
        <main>
            <div>
                <p>Desplegable con <strong>optgroup</strong></p>
                <select>
                    <optgroup label="Grupo 1">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </optgroup>
                    <optgroup label="Grupo 2">
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </optgroup>
                    <optgroup label="Grupo 3">
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                    </optgroup>
                </select>
            </div>
            <div class="editable mt-5">
                <strong>Editable CSS</strong>
                <pre contenteditable class="border text-start">
                    .editable {
                        background-color: black;
                        color: red;
                        font-size: 20px;
                    }
                </pre>
                <!-- <style contenteditable style="display: block">
                    .editable {
                        background-color: black;
                        color: red;
                        font-size: 20px;
                    }
                </style> -->
            </div>
            <div class="contHoverme mt-5 flex justify-center">
                <p class="hoverme relative">Hover me</p>
            </div>
        </main>
        <footer>Footer</footer>
    </div>
</template>

<style lang="css" scoped>
header,
main,
footer {
    padding: 20px 10px;
    font-size: 20px;
}

header,
footer {
    text-align: center;
}

header {
    background-color: rgb(255, 0, 0, 0.4);
}

main {
    background-color: rgb(255, 255, 0, 0.4);
}

footer {
    background-color: rgb(100, 255, 0, 0.4);
}

div.cont {
    display: grid;
    min-height: 100dvh;
    grid-template-rows: auto 1fr auto;
}

select {
    background-color: white;
    padding: 0 5px 0;
    width: 200px;
    height: 35px;
    border: black solid 1px;
    border-radius: 5px;
}

optgroup {
    background-color: rgb(100, 255, 0, 0.4);
    color: rgb(0, 150, 0);
}

option {
    background-color: white;
    color: black;
}

.hoverme {
    font-weight: bold;
    cursor: default;
}

.hoverme::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: black;
    transform: scaleX(0);
    transition: transform 0.3s;
}

.hoverme:hover::after {
    transform: scaleX(1);
}
</style>