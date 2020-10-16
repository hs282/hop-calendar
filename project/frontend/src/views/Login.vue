<template>
    <div style="height : 100vh; display:flex; justify-content:center; align-items:center;">
        <el-card style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;">
            <h1>Hop Calendar</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="role" label="student">Student</el-radio>
                    <el-radio v-model="role" label="instructor">Instructor</el-radio>
                </el-form-item>
                <el-form-item label="JHED ID">
                    <el-input v-model="email"></el-input>
                </el-form-item>
                <el-form-item label="HopCal Password">
                    <el-input v-model="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="login">
                Login
            </el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                role: 'student',
                email: '',
                password: '',
            }
        },
        methods: {
            login() {
                
            }
        },
    }
</script>

<style scoped>

</style>