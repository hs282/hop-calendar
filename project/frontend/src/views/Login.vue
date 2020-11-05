
<template>
    <div style="height : 100vh; display:flex; justify-content:center; align-items:center;">
        <el-card style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;">
            <h1>Hop Calendar</h1>
            <el-form>
                <el-form-item action='/login'>
                    <input type="radio" name="userType" v-model="role" label="student" id="student">Student<br>
                    <input type="radio" name="userType" v-model="role" label="instructor" id="instructor">Instructor
                </el-form-item>
                <el-form-item label="JHED ID">
                    <el-input v-model="email" id="input_email"></el-input>
                </el-form-item>
                <el-form-item label="HopCal Password">
                    <el-input v-model="password" id="input_pw"></el-input>
                </el-form-item>
            </el-form>
            <el-button id="login" @click="login()">
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
                let username = document.getElementById("input_email").value;
                let password = document.getElementById("input_pw").value;
                let role = "student";
                if (document.getElementById("instructor").checked) {
                    role = "instructor";
                }
                fetch(`http://localhost:8080/login?username=${username}&password=${password}&role=${role}`, {
                    method: 'GET'
                    }   
                ).then(res => window.location.reload());
                if (document.getElementById("instructor").checked) {
                    this.$router.push('/instructorcourses')
                } else {
                    this.$router.push('/')
                }
            }
        },
    }
</script>

<style scoped>

</style>
