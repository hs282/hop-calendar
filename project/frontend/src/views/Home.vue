<template>
  <div class="home">
    {{ data }}
    <v-calendar></v-calendar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            data: null,
        }
    },
    mounted () {
        axios.get('http://localhost:3000').then((res) => {
            this.data = res.data
        })
    },
}
</script>
