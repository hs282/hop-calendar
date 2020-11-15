
<template>
    <div style="height : 100vh; display:flex; justify-content:center; align-items:center;">
        <el-card style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;">
            <h1>Hop Calendar</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="role" label="student" id="student">Student</el-radio>
                    <el-radio v-model="role" label="instructor" id="instructor">Instructor</el-radio>
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
    import axios from 'axios'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                role: 'student',
                email: 'janedoe',
                password: 'hellokitty'
            }
        },
        methods: {
            ...mapActions([
                'setUser'
            ]),
            async login() {
                //FOR INSTRUCTOR
                //DEFAULT LOGIN IS 'janedoe', 'hellokitty', student role.
                //that is the only registered user in the database.
                try {
                    const response = await axios.post('http://localhost:3000/login',
                    {
                        username: this.email,
                        password: this.password,
                        role: this.role
                    });
                    this.$router.push('/home')
                    const user = response.data
                    const object = { id: user.id, name: user.name, courses: user.courses, role: this.role}
                    this.setUser(JSON.stringify(object));
                } catch (err) {
                    this.$message({
                        message: 'Incorrect username or password.',
                        type: 'warning'
                    });
                }
            }
        },
    }
</script>

<style scoped>

</style>
