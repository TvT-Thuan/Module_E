<template>
  <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-4">
    <div class="text-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Manage Campaigns</h1>
    </div>
    <div class="row campaign">
      <div v-for="campaign in campaigns" class="col-md-4" :key="campaign.id">
        <div class="card mb-4 shadow-sm">
          <router-link
            :to="{
              name: 'detail_campaign',
              params: {
                organizer_slug: campaign.organizer.slug,
                campaign_slug: campaign.slug,
              },
            }"
            class="btn text-left campaign"
          >
            <div class="card-body">
              <h5 class="card-title">
                {{ campaign.name }} by {{ campaign.organizer.name }}
              </h5>
              <hr />
              <p class="card-text">{{ campaign.date }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import callApi from "../../stores/callApi";
import { ref } from "vue";
const campaigns = ref([]);
callApi.get("/campaigns").then((r) => (campaigns.value = r.data.campaigns));
</script>
