import { createStore } from "vuex";

export default createStore({
  state: {
    ticketsList: []
  },
  mutations: {
    addNewTicket(state, payload) {
      state.ticketsList.unshift(payload);

      localStorage.setItem("ticketsLocalData",JSON.stringify(state.ticketsList))
    },
    addReply(state, payload) {
      const ticket = state.ticketsList.find(
        (ticket) => ticket.id === payload.id
      );
      if (ticket) {
        ticket.reply.push(payload.reply);
        if (payload.reply) {
          ticket.status = "answered";
        } else {
          ticket.status = "pending";
        }
      } else {
        console.log(`ticket with id: ${payload.id} was not found!`);
      }

      localStorage.setItem("ticketsLocalData",JSON.stringify(state.ticketsList))
    },
    closeTicket(state, payload) {
      const ticket = state.ticketsList.find(
        (ticket) => ticket.id === payload.id
      );
      console.log(ticket)
      if (ticket) {
        ticket.status = "closed";
        console.log(ticket)
      }
      console.log(state.ticketsList)

      localStorage.setItem("ticketsLocalData",JSON.stringify(state.ticketsList))
    },
    setTicketsLocalData(state,payload){
      if(payload!=null){
        state.ticketsList=payload;
      }else{
        state.ticketsList=[];
      }
    }
  },
  actions: {
    addNewTicket(context, payload) {
      context.commit("addNewTicket", payload);
    },
    addReply(context, payload) {
      context.commit("addReply", payload);
    },
    closeTicket(context, payload) {
      context.commit("closeTicket", payload);
    },
    setTicketsLocalData(context,payload){
      context.commit("setTicketsLocalData",payload)
    }
  },
  getters: {
    getTicketsList(state) {
      return state.ticketsList;
    },
  },
});
