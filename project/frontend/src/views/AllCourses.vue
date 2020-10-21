<template>
    <div>
        <h1 style="padding-left: 50px">All Courses</h1><br>
        <form style="padding-left: 100px">
            <input type="checkbox"> AS.010.101 Introduction to Art History
            <p style="padding-left: 17px">
                MW 12:00PM - 1:15PM, M. Feldman
            </p>
            <input type="checkbox"> AS.020.151 General Biology
            <p style="padding-left: 17px">
                TTh 12:00PM - 1:15PM, C. Roberson
            </p>
            <input type="checkbox"> EN.520.447 Information Theory
            <p style="padding-left: 17px">
                WF 12:00PM - 1:15PM, J. Prince
            </p>
            <input type="checkbox"> EN.601.315 Databases
            <p style="padding-left: 17px">
                TTh 3:00PM - 4:15PM, D. Yarowsky
            </p>
            <input type="checkbox"> EN.601.340 Web Security
            <p style="padding-left: 17px">
                TTh 12:00PM - 1:15PM, Y. Cao
            </p>
            <input type="checkbox"> EN.601.418 Operating Systems
            <p style="padding-left: 17px">
                TTh 1:30PM - 2:45PM, P. Huang
            </p>
            <input type="checkbox"> EN.601.428 Compilers and Interpreters
            <p style="padding-left: 17px">
                MW 12:00PM - 1:15PM, D. Hovemeyer
            </p>
            <input type="checkbox"> EN.601.104 Computer Ethics
            <p style="padding-left: 17px">
                W 4:30PM - 6:30PM, T. Leschke
            </p>
        </form>
        
        <p style="padding-left: 300px">
            <el-button style="background-color:#008CBA; color:white" @click="add">
                Add
            </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="backtohome">
                Back to Home
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