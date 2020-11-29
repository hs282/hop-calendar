
<template>
    <div style="height : 100vh; display:flex; justify-content:center; align-items:center;">
        <el-card style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;">
            <h1>Update your tasks!!</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="role" label="gradescope" id="gradescope">Gradescope</el-radio>
                    <el-radio v-model="role" label="blackboard" id="blackboard">Blackboard</el-radio>
                </el-form-item>
                <el-form-item label="JHED ID">
                    <el-input v-model="email" id="input_email"></el-input>
                </el-form-item>
                <el-form-item label="JHED Password">
                    <el-input v-model="password" id="input_pw"></el-input>
                </el-form-item>
            </el-form>
            <el-button id="update" @click="update()">
                Update
            </el-button>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import {BASE_URL} from '../api.js'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        methods: {
            ...mapActions([
                'setUser'
            ]),
            async update() {
                try {
                    const response = await axios.post(`${BASE_URL}/login`,
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
            },
        },
    }
</script>

<style scoped>

</style>
