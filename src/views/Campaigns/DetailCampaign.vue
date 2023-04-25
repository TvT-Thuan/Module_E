<template>
  <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-4">
    <div class="border-bottom mb-3 pt-3 pb-2 event-title">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center"
      >
        <h1 class="h2">{{ campaign.name }}</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <router-link
              :to="{
                name: 'registration',
                params: router.currentRoute.value.params,
              }"
              :disabled="false"
              class="btn btn-sm btn-outline-secondary"
              >Register for this Campaign</router-link
            >
          </div>
        </div>
      </div>
      <span class="h6">{{ campaign.date }}</span>
    </div>

    <div class="sessions">
      <table
        v-for="area in campaign.areas"
        :key="area.id"
        class="table table-bordered"
      >
        <thead>
          <tr>
            <th class="border border-0 col-2">Area</th>
            <th class="border border-0 col-2">Place</th>
            <th class="border border-0">Session</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(place, key) in area.places" class="border">
            <td v-if="key == 0" :rowspan="area.places.length">
              {{ area.name }}
            </td>
            <td>{{ place.name }}</td>
            <td v-for="session in place.sessions" class="text-center">
              <router-link
                :to="{ name: 'detail_session', params: { id: session.id } }"
                :class="{
                  'border border-success p-1': registrations.includes(
                    session.id
                  ),
                }"
              >
                {{
                  formatDate(session.start) + " - " + formatDate(session.end)
                }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import callApi from "../../stores/callApi";

const router = useRouter();
const campaign = ref([]);

callApi.get(router.currentRoute.value.path).then((r) => {
  campaign.value = r.data;
  window.localStorage.setItem("campaign", JSON.stringify(r.data));
});

function formatDate(value) {
  let date = new Date(value);
  return (
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
}

const registrations = ref([]);
const error = ref([]);

if (window.localStorage.getItem("token") != null) {
  callApi
    .getWithToken("/registrations")
    .then((r) => {
      registrations.value = r.data.registrations.reduce((regis, value) => {
        return regis.concat(value.session_ids);
      }, []);
    })
    .catch((e) => {
      if (e.response.data.message != "Citizen not registered") {
        error.value = "Server error";
      }
    });
}
</script>
