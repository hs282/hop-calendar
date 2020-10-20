<template>
    <div>
        <h1 style="padding-left: 50px">Drop Courses</h1><br>
        <!--<li v-for="course in courses">
            {{ course.name }}
        </li>-->
        <form style="padding-left: 100px">
            <input type="checkbox"> Data Structures<br><br>
            <input type="checkbox"> Computer Ethics<br><br>
            <input type="checkbox"> Java<br><br>
            <input type="checkbox"> Intermediate Programming<br><br>
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