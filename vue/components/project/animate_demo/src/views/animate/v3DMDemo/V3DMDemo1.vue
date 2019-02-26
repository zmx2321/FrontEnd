<template>
    <section class="main_cont">
        <model-collada
                :rotation="rotation"
                @on-load="onLoad"
                src="../../assets/static/models/collada/elf/elf.dae"></model-collada>
</section>
</template>

<script>
    import { ModelCollada } from 'vue-3d-model'

    export default {
        name: "v3DMDemo1",

        data: {
            return: {
                rotation: {
                    x: -Math.PI / 2,
                    y: 0,
                    z: 0
                }
            }
        },
        methods: {
            onLoad () {
                this.rotate();
            },
            rotate () {
                this.rotation.z += 0.01;
                requestAnimationFrame( this.rotate );
            }
        },
        components: {
            ModelCollada
        }
    }
</script>

<style scoped>

</style>