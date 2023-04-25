<template>
  <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-4">
    <div class="border-bottom mb-3 pt-3 pb-2 event-title">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center"
      >
        <h1 class="h2">{{ campaign.name }}</h1>
      </div>
      <span class="h6">{{ campaign.date }}</span>
    </div>
    <!-- ticket -->
    <div id="tickets" class="pt-3 pb-2">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center"
      >
        <h2 class="h4">Tickets</h2>
      </div>
    </div>
    <div class="row tickets">
      <div v-for="ticket in tickets" class="col-md-4 col-lg-3">
        <div class="card mb-4 shadow-sm">
          <div
            class="card-body d-flex align-items-center ticket"
            :class="{ 'bg-lightgrey': !ticket.available }"
          >
            <input
              type="radio"
              name="ticket_id"
              class="mr-2"
              v-model="registration.ticket_id"
              :id="'ticket_' + ticket.id"
              :value="ticket.id"
              :disabled="!ticket.available"
            />
            <label class="w-100 m-0" :for="'ticket_' + ticket.id">
              <p class="card-title m-0">
                <span class="h5">{{ ticket.name }}</span>
                <span class="float-right">{{ ticket.cost }}</span>
              </p>
              <p class="card-text">{{ ticket.description }}</p>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- session -->
    <div id="sessions" class="pt-3 pb-2">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center"
      >
        <h2 class="h4">Select additional services you want to purchase</h2>
      </div>
    </div>
    <div class="sessions">
      <div class="form-check" v-for="session in sessions">
        <input
          :id="'session_' + session.id"
          :value="session.id"
          class="form-check-input"
          type="checkbox"
          v-model="registration.session_ids"
        />
        <label
          :for="'session_' + session.id"
          class="form-check-label"
          for="defaultCheck1"
        >
          {{ session.title + " " + session.vaccinator }}
        </label>
      </div>
    </div>
    <div class="col-6 col-md-4 col-lg-3 float-right pt-5">
      <div class="w-100">
        <p class="card-title px-2">
          <span class="h5">Campaign ticket:</span>
          <span class="float-right" id="event-cost">{{ cost_ticket }}</span>
        </p>
      </div>
      <div class="w-100">
        <p class="card-title px-2">
          <span class="h5">Additional services:</span>
          <span class="float-right" id="additional-cost">{{
            cost_session
          }}</span>
        </p>
      </div>
      <hr class="bg-dark" />
      <div class="w-100">
        <p class="card-title px-2">
          <span class="h5">Total:</span>
          <span class="float-right" id="total-cost">{{ total }}</span>
        </p>
      </div>
      <div class="w-100">
        <button
          id="purchase"
          class="btn float-right m-3"
          :disabled="!registration.ticket_id"
          @click="submitRegistration()"
        >
          Purchase
        </button>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import callApi from "../../stores/callApi";
import getCampaign from "../../stores/getCampaign";
const router = useRouter();
const campaign = ref([]);
const sessions = ref([]);
const tickets = ref([]);
const registration = ref({
  ticket_id: null,
  session_ids: [],
});

if (window.localStorage.getItem("campaign")) {
  campaign.value = getCampaign.getCampaign();
  sessions.value = getCampaign.getSessionService();
  tickets.value = getCampaign.getListTicket();
} else router.push({ name: "home" });

const cost_ticket = computed(() => {
  return registration.value.ticket_id
    ? getCampaign.getCostTicket(registration.value.ticket_id)[0].cost
    : 0;
});
const cost_session = computed(() => {
  return registration.value.session_ids
    ? getCampaign.getCostSessions(registration.value.session_ids)
    : 0;
});
const total = computed(() => {
  return cost_ticket.value + cost_session.value;
});
function submitRegistration() {
  callApi
    .postWithToken(router.currentRoute.value.path, registration.value)
    .then((r) => {
      alert(r.data.message);
      router.push({
        name: "detail_campaign",
        params: router.currentRoute.value.params,
      });
    })
    .catch((e) => {
      if (e.response.data.message == "User already registered") {
        alert(e.response.data.message);
      }
    });
}
</script>
<style scoped>
.card-body {
  min-height: 100px;
}
.bg-lightgrey {
  background-color: lightgrey;
}
</style>
