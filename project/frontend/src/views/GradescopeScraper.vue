
<template>
    <div style="height : 100vh; display:flex; justify-content:center; align-items:center;">
        <el-card style="height: 500px; width: 500px; display:flex; justify-content:center; align-items:center;">
            <h1>Update your tasks!!</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="type" label="gradescope" id="gradescope">Gradescope</el-radio>
                    <el-radio v-model="type" label="blackboard" id="blackboard">Blackboard</el-radio>
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
                    const response = await axios.post(`${BASE_URL}/gradescope_scraper`,
                    {
                        username: this.email,
                        password: this.password,
                        type: this.type
                    });
                } catch (err) {
                    this.$message({
                        message: 'Incorrect username or password.',
                        type: 'warning'
                    });
                }
                this.$router.push('/home')
            },
        },
    }
</script>

<style scoped>

</style>
