
<template>
    <div
        style="height : 100vh; display:flex; justify-content:center; align-items:center;"
    >
        
        <el-card
            style="height: 700px; width: 500px; display:flex; justify-content:center; align-items:center;"
        >
        <v-alert type="success" :value="alertVisible" >
            Account successfully created!
        </v-alert>

            <h1>Create Account for Hop Calendar</h1>
            <el-form>
                <el-form-item>
                    <el-radio v-model="role" label="student" id="student"
                        >Student</el-radio
                    >
                    <el-radio v-model="role" label="instructor" id="instructor"
                        >Instructor</el-radio
                    >
                </el-form-item>
                <el-form-item label="Username">
                    <el-input v-model="username" id="input_user"></el-input>
                </el-form-item>
                <el-form-item label="HopCal Password">
                    <el-input v-model="password" id="input_pw"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="name" id="input_name"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="email" id="input_email"></el-input>
                </el-form-item>
            </el-form>
            <!--<el-button id="create_account" @click="create_account()">
                Submit
            </el-button>-->
            <el-button id="validation" @click="validation">
                Submit
            </el-button>
            <el-button id="gotologin" @click="pushLogin">
                Back to Login
            </el-button>

            <el-dialog
                title="We have emailed you a code. Please enter it below."
                :visible.sync="dialogCodeVisible"
                width="30%"
            >
                <el-form>
                    <el-input
                        placeholder="Code"
                        v-model="inputCode"
                    ></el-input>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCodeVisible = false"
                        >Cancel</el-button
                    >
                    <el-button
                        type="primary"
                        @click="
                            dialogCodeVisible = false
                            verifyCode(inputCode)
                        "
                        >Enter</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script >
import axios from 'axios'
import {BASE_URL} from '../api.js'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            role: 'student',
            username: '',
            password: '',
            name: '',
            email: '',
            dialogCodeVisible: false,
            alertVisible: false,
            inputCode: '',
            code: '',
            
        }
    },
    methods: {
        ...mapActions(['setUser']),
        // i tried calling create_account() in validation() but it didn't work so i just copied and pasted the body into validation()
        // i'll refactor later

       /* async create_account() {
            try {
                const response = await axios.post(
                    `${BASE_URL}/create_account`,
                    {
                        username: this.username,
                        password: this.password,
                        role: this.role,
                        name: this.name,
                    }
                )
                this.$router.push('/')
            } catch (err) {
                this.$message({
                    message: 'Existing username',
                    type: 'warning',
                })
            }
        },*/
        pushLogin() {
            this.$router.push('/')
        },
        async validation() {

            // for now, students don't have to get authenticated. anyone who signs up as a student can create an account
            if (this.role == 'student') {
                try {
                const response = await axios.post(
                    `${BASE_URL}/create_account`,
                    {
                        username: this.username,
                        password: this.password,
                        role: this.role,
                        name: this.name,
                    }
                )
                this.alertVisible = true
                var r = this.$router
                setTimeout(function(){ r.push('/') }, 2000);
                } catch (err) {
                    this.$message({
                        message: 'Existing username',
                        type: 'warning',
                    })
                }
            } else {
                // call endpoint here to check if input email exists in db
        

                // this condition will be changed to check if input email is in the database as an admin email for at least one of the courses
                if (this.role=="instructor") {
                    // generate a code (random number from 10000 to 99999)
                    this.code = Math.floor(Math.random() * 90000) + 10000

                    // email this number to the instructor
                    
                    /* SmtpJS.com - v3.0.0 */
                    var Email = { send: function (a) { 
                        return new Promise(function (n, e) { 
                            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; 
                            var t = JSON.stringify(a); 
                            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { 
                                n(e) 
                                }) 
                            }) 
                        }, ajaxPost: function (e, n, t) { 
                                var a = Email.createCORSRequest("POST", e); 
                                a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { 
                                    var e = a.responseText; 
                                    null != t && t(e) 
                                }, 
                                a.send(n) 
                        }, ajax: function (e, n) { 
                                var t = Email.createCORSRequest("GET", e); 
                                t.onload = function () { 
                                    var e = t.responseText; 
                                    null != n && n(e) 
                                }, 
                                t.send() 
                        }, createCORSRequest: function (e, n) { 
                                var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
                        } 
                    };
                
                    Email.send({
                        Host : "smtp.gmail.com",
                        Username : "fantasticsniffle@gmail.com",
                        Password : "fan12345!",
                        To : this.email,
                        From : "fantasticsniffle@gmail.com",
                        Subject : "HopCalendar: Here's Your Code to Finish Setting Up Your Account",
                        Body : this.code
                    }).then(
                        //show dialog box to have instructor enter code
                        this.dialogCodeVisible = true
                    );

                } else {
                    alert("Invalid email")
                }
            }
        },
        async verifyCode(inputCode) {
            // create instructor account
            if (inputCode == this.code) {
                try {
                    const response = await axios.post(
                        `${BASE_URL}/createpotentialinstructor`,
                        {
                            username: this.username,
                            password: this.password,
                            name: this.name,
                            email: this.email,
                        }
                    )
                    this.alertVisible = true
                    var r = this.$router
                    setTimeout(function(){ r.push('/') }, 2000);
                } catch (err) {
                    this.$message({
                        message: 'Existing username',
                        type: 'warning',
                    })
                }
            } else {
                alert("Invalid code")
            }
                /*try {
                    const response = await axios.post(
                        `${BASE_URL}/create_account`,
                        {
                            username: this.username,
                            password: this.password,
                            role: this.role,
                            name: this.name,
                        }
                    )
                    this.alertVisible = true
                    var r = this.$router
                    setTimeout(function(){ r.push('/') }, 2000);
                } catch (err) {
                    this.$message({
                        message: 'Existing username',
                        type: 'warning',
                    })
                }
            } else {
                alert("Invalid code")
            }*/
        },
    },
}
</script>

<style scoped></style>
