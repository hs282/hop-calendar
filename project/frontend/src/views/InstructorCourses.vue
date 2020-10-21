<template>
    <div>
        <h1 style="padding-left: 50px">My Courses</h1><br>
        <ul style="padding-left:100px">
            <h2>Object Oriented Software Engineering</h2><br>
            <input type="checkbox"> 10/25: Midterm 1
            <p style="padding-left: 17px">
                Review chapters 1-10 of textbook!
            </p>
            <input type="checkbox"> 10/30: HW3 due
            <p style="padding-left: 17px">
                <a href="https://darvishdarab.github.io/cs421_f20/docs/hw/hw3/">Link to HW3</a>
            </p>
            <el-button style="background-color:#008CBA; color:white" @click="addtask">
                Add task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="deletetask">
                Delete task
                </el-button>
            <el-button style="background-color:#008CBA; color:white" @click="edittask">
                Edit task
                </el-button>
            <br><br><br>

            <h2>General Biology</h2><br>
            <input type="checkbox"> 11/4: Genetics Quiz<br><br>
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