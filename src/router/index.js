import { createRouter, createWebHistory } from "vue-router";
import IndexCampaign from "../views/Campaigns/IndexCampaign.vue";
import DetailCampaign from "../views/Campaigns/DetailCampaign.vue";
import LoginView from "../views/Authentication/LoginView.vue";
import DetailSession from "../views/Sessions/DetailSession.vue";
import IndexRegistration from "../views/Registrations/IndexRegistration.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexCampaign,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/organizers/:organizer_slug/campaigns/:campaign_slug",
      name: "detail_campaign",
      component: DetailCampaign,
    },
    {
      path: "/session/:id",
      name: "detail_session",
      component: DetailSession,
    },
    {
      path: "/organizers/:organizer_slug/campaigns/:campaign_slug/registration",
      name: "registration",
      component: IndexRegistration,
      beforeEnter: (to, from) => {
        if (!window.localStorage.getItem("token")) {
          router.push({ name: "login" });
        }
      },
    },
  ],
});

export default router;
