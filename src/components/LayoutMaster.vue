<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link
      :to="{ name: 'home' }"
      class="navbar-brand col-sm-3 col-md-2 mr-0 text-center"
      >Home</router-link
    >
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <router-link
          v-if="token == null"
          :to="{ name: 'login' }"
          class="nav-link"
          id="login"
          >Login</router-link
        >
        <span v-else class="d-flex align-items-center">
          <span class="text-white mr-2 p-0">{{ username }}</span>
          <a href="/logout" @click.prevent="logout" class="nav-link" id="logout"
            >Log out</a
          >
        </span>
      </li>
    </ul>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <slot> </slot>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import callApi from "../stores/callApi";
const authStore = useAuthStore();
const router = useRouter();
const username = ref(null);
const { token } = storeToRefs(authStore);
if (!token.value) {
  token.value = window.localStorage.getItem("token");
  username.value = window.localStorage.getItem("username");
}
function logout() {
  callApi
    .postWithToken("/logout", window.localStorage.getItem("token"))
    .then(() => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      token.value = null;
      router.push({ name: "login" });
    })
    .catch((e) => {});
}
</script>
