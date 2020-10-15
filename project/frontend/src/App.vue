<template>
	<v-app>
		<v-main>
			<el-menu v-if="$route.name != 'Login'" class="el-menu-demo" mode="horizontal">
				<el-menu-item index="1">Add New Course</el-menu-item>
				<el-menu-item index="3">Drop Course</el-menu-item>
				<el-menu-item index="4"></el-menu-item>
			</el-menu>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
}
</script>
