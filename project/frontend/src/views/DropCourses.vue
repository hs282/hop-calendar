<template>
    <div>
        <h1 style="padding-left: 50px">Drop Courses</h1><br>
        <form style="padding-left: 100px">
            <input type="checkbox"> EN.601.104 Computer Ethics
            <p style="padding-left: 17px">
                W 4:30PM - 6:30PM, T. Leschke
            </p>
            <input type="checkbox"> EN.601.467 Introduction to Human Language Technology
            <p style="padding-left: 17px">
                TTh 9:00AM - 10:15AM, P. Koehn
            </p>
            <input type="checkbox"> AS.210.111 Spanish Elements 
            <p style="padding-left: 17px">
                MWF 9:00AM - 9:50am, M. Tracy
            </p>
            <input type="checkbox"> AS.020.329 Microbiology
            <p style="padding-left: 17px">
                TTh 10:30AM - 11:45AM, E. Fisher
            </p>
        </form>
        
        <p style="padding-left: 300px">
            <el-button style="background-color:#008CBA; color:white" @click="drop">
                Drop
            </el-button>
        </p>
    </div>
</template>

<script>
    export default {
      
    }
</script>

<style scoped>

</style>