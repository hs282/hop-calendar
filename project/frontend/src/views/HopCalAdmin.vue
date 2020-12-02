<template>
    <div>
        <h1 style="padding-left: 50px">Admin</h1>
        <div class="div" v-for="potentialI in potentialInstructors" v-bind:key="potentialI.id">
            <el-card class="card">
                <div
                    class="body"
                    style="height: 100%; display: flex; justify-content: space-between; align-items: center;"
                >
                    <span class="name">
                        {{ potentialI.name }} <strong>{{ potentialI.email }}</strong>
                    </span>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="validate(potentialI)"
                    >
                        Validate Instructor
                    </el-button>
                    <el-button
                        style="background-color:#008CBA; color:white"
                        @click="removePotentialInstructor(potentialI.username)"
                    >
                        Reject Instructor
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {BASE_URL} from '../api.js'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                potentialInstructors: []
            }
        },
        async mounted() {
            this.getPotentialInstructors()
        },
        methods: {
            async getPotentialInstructors() {
                const res = await axios.post(
                    `${BASE_URL}/getpotentialinstructors`
                )
                this.potentialInstructors = res.data
            },
            async removePotentialInstructor(username) {
                const response = await axios.post(
                    `${BASE_URL}/removepotentialinstructor`, {
                        username: username,
                    }
                )
            },
            async validate(potentialI) {
                const res = await axios.post(
                    `${BASE_URL}/create_account`, {
                        name: potentialI.name,
                        username: potentialI.username,
                        password: potentialI.password,
                        role: "potentialinstructor",
                        courses: potentialI.courses, //potential instructor's courses
                    }
                )
                
                // send email to instructor upon acceptance
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
                        Subject : "Thank you for joining HopCalendar!",
                        Body : "Congratulations! Your HopCalendar instructor account has been successfully created."
                    });

                this.removePotentialInstructor(potentialI.username)
                this.getPotentialInstructors()
            }
        },
    }
</script>

<style scoped>

</style>
