<template>
  <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-4">
    <div class="col-12 col-md-10 col-lg-6 mx-auto">
      <div class="border mt-5 p-3">
        <div class="title">
          <h2>
            Session Detail <span class="ml-2">{{ "-" + session.title }}</span>
          </h2>
          <p>{{ session.description }}</p>
          <table class="col-8">
            <tr>
              <td><h5>Vaccinator:</h5></td>
              <td>{{ session.vaccinator }}</td>
            </tr>
            <tr>
              <td><h5>Start:</h5></td>
              <td>{{ formatDate(session.start) }}</td>
            </tr>
            <tr>
              <td><h5>End:</h5></td>
              <td>{{ formatDate(session.end) }}</td>
            </tr>
            <tr>
              <td><h5>Cost:</h5></td>
              <td>{{ !session.cost ? 0 : session.cost }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useRouter } from "vue-router";
import getCampaign from "../../stores/getCampaign";
import { ref } from "vue";
const router = useRouter();
const session = ref([]);
if (window.localStorage.getItem("campaign")) {
  session.value = getCampaign.getDetailSession(
    router.currentRoute.value.params.id
  )[0];
} else router.push({ name: "home" });
function formatDate(value) {
  let date = new Date(value);
  return (
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
}
</script>
