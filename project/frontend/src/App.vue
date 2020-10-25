<template>
	<v-app>
		<v-main>
			<el-menu v-if="$route.name != 'Login'" class="el-menu-demo" mode="horizontal" style="display: flex; justify-content: space-between; align-items: center;">
				<el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <span>Home</span>
                    </el-menu-item>
				<el-radio-group v-model="view">
                    <el-radio-button label="Daily"></el-radio-button>
                    <el-radio-button label="Weekly"></el-radio-button>
                    <el-radio-button label="Monthly"></el-radio-button>
                </el-radio-group>
				<el-menu-item index="4" @click="pushLogin"><i class="el-icon-user"></i>
                    <span>Log Out</span></el-menu-item>
			</el-menu>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            view: "Monthly"
        }
    },
    methods: {
        pushLogin() {
            this.$router.push('Login')
        }
    }
}
</script>
