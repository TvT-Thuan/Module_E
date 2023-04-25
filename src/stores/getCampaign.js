export default {
  getCampaign() {
    return JSON.parse(window.localStorage.getItem("campaign"));
  },
  getListSession() {
    let sessions = [];
    this.getCampaign().areas.forEach((area) => {
      area.places.forEach((place) => {
        place.sessions.forEach((session) => {
          sessions.push(session);
        });
      });
    });
    return sessions;
  },
  getDetailSession(id) {
    return this.getListSession().filter((session) => session.id == id);
  },
  getSessionService() {
    return this.getListSession().filter((session) => session.type == "service");
  },
  getListTicket() {
    return this.getCampaign().tickets;
  },
  getCostTicket(id) {
    return this.getListTicket().filter((ticket) => ticket.id == id);
  },
  getCostSessions(ids) {
    let total = 0;
    ids.forEach((id) => {
      total += this.getDetailSession(id)[0].cost;
    });
    return total;
  },
};
