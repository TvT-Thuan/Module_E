<template>
  <main class="col-md-6 mx-sm-auto px-4">
    <div class="pt-3 pb-2 mb-3 border-bottom text-center">
      <h1 class="h2">The covid 19 vaccination campaign</h1>
    </div>

    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

      <div v-if="error.message" class="alert alert-danger text-center">
        Username or registration code not correct
      </div>

      <label for="lastname" class="sr-only">Last Name</label>
      <input
        id="lastname"
        name="lastname"
        class="form-control"
        :class="{ 'is-invalid': error.lastname }"
        placeholder="Enter Last Name"
        v-model="user.lastname"
      />
      <div v-if="error.lastname" class="invalid-feedback">{{ error.lastname[0] }}</div>

      <label for="registration_code" class="sr-only">Registration Code</label>
      <input
        id="registration_code"
        name="registration_code"
        class="form-control mt-2"
        :class="{ 'is-invalid': error.registration_code }"
        placeholder="Enter Registration Code"
        v-model="user.registration_code"
      />
      <div v-if="error.registration_code" class="invalid-feedback">{{ error.registration_code[0] }}</div>

      <button class="btn btn-lg btn-primary btn-block mt-2" id="login" type="submit">
        Sign in
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import callApi from "../../stores/callApi";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const user = ref({
  lastname: "",
  registration_code: "",
});
const error = ref([]);
function login() {
  callApi
    .post("/login", user.value)
    .then((r) => {
      window.localStorage.setItem("token", r.data.token);
      window.localStorage.setItem("username", r.data.username);
      authStore.token = r.data.token;
      router.back();
    })
    .catch((e) => {
      error.value = e.response.data;
    });
}
</script>
