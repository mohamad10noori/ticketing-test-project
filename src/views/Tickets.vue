<template>
  <div class="home">
    <h2>Tickets List</h2>
    
    <ul v-if="getTicketsList.length>0">
      <li
        @click="popup(ticket)"
        v-for="ticket in getTicketsList"
        :key="ticket.id"
      >
        <div class="title">{{ ticket.title }}</div>
        <div class="status">{{ ticket.status }}</div>
      </li>
    </ul>
    <h4 v-else class="grey">There is no ticket to read ...</h4>
  </div>
  <base-dialog
  
    v-if="popupTicket"
    @close="popupVisibility = false"
    :show="popupVisibility"
    :title="popupTicket.title"
    
  >
    <form @submit.prevent="reply(popupTicket.id)">
      <div class="flex-row-sb">
        <div class="message"><label >{{popupTicket.message}}</label></div>
      </div>
      <div class="flex-col" >
        <template class="flex-col" v-for="reply in popupTicket.reply" :key="reply.id">
          <textarea
          class="reply-text"
            disabled
            v-model="reply.text"
          ></textarea>
        </template>

        <textarea
        v-if="popupTicket.status !== 'closed'"
          v-model.trim="newReply"
          name="answer"
          id="answer"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <menu>
      
      <div class="left-buttons">

      <button @click.prevent="popupVisibility = false">back</button>

      <button
        :disabled="popupTicket.status === 'closed'"
        @click.prevent="closeTicket({ id: popupTicket.id })"
      >
        archive 
      </button>
      </div>
      

      <button :disabled="popupTicket.status === 'closed'">reply</button>
      
      </menu>
    </form>
  </base-dialog>
</template>

<script>
import BaseDialog from "../components/UI/BaseDialog.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Tickets",
  components: { BaseDialog },
  data() {
    return {
      popupVisibility: false,
      popupTicket: "",
      newReply: "",
    };
  },
  computed: {
    ...mapGetters(["getTicketsList"]),
  },
  watch: {
    popupVisibility() {
      this.newReply = "";
    },
  },
  methods: {
    ...mapActions(["addReply", "closeTicket","setTicketsLocalData"]),
    popup(ticket) {
      this.popupTicket = ticket;
      this.popupVisibility = true;
    },
    reply(id) {
      if(this.newReply!=""){

        this.addReply({ id: id, reply: {text:this.newReply,id:Math.round(Math.random()*10000)} });
        this.newReply = "";
      }
    },
  },
  created(){
    const ticketsLocalData=JSON.parse(localStorage.getItem('ticketsLocalData'))
    console.log(ticketsLocalData)
this.setTicketsLocalData(ticketsLocalData)
  }
};
</script>

<style scoped>

li {
  border: 1px grey solid;
    border-radius: 3px;
  margin: auto;
  list-style: none;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: .5rem auto;
  margin: .5rem auto;
}
li>div{
  padding:.3rem .6rem;
}
.flex-row-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.grey {
  color: gray;
}
textarea {
  margin-top: .5rem 0;
  resize: none;
}
.flex-col{
  display: flex;
  flex-direction: column;
}
menu{
  margin: 1rem 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.title{
  font-weight: 700;
}
.status{
  border-left: 1px grey dotted;
}
.message{
  text-align: start;
  margin: 1rem 0;
}
.reply-text{
  margin: .2rem 0;
  width: 332px;

}
.left-buttons button{
  margin:0 .3rem;
}
</style>
