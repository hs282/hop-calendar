<template>
    <div>
        <h1 style="padding-left: 50px">My Courses</h1><br>
        <ul style="padding-left:100px">
            <h2>Object Oriented Software Engineering</h2><br>
            <input type="checkbox"> 10/25: Midterm 1<br><br>
            <input type="checkbox"> 10/30: HW3 due<br><br>
            <el-button style="background-color:#008CBA; color:white" @click="addtask">
                Add task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="deletetask">
                Delete task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="edittask">
                Edit task
                </el-button>
        </ul>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>