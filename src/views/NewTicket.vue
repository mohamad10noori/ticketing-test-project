<template>
  <div class="new-ticket">
    <h2>New Ticket</h2>
    <div >
      <form @submit.prevent="submit">

      <label class="grey" for="title">Title</label>
      <textarea v-model.trim="title" name="title" id="title" cols="30" rows="1"></textarea>
      <label class="grey" for="message">Message</label>
      <textarea v-model.trim="message" name="message" id="message" cols="30" rows="10"></textarea>
    <button>submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex';
export default {
  data(){
    return{
      title:'',
      message:'',
    }
  },
  methods:{
    ...mapActions(['addNewTicket']),
    submit(){
      if(this.title!='' && this.message!=''){

        const newTicket={id:Math.round(Math.random()*10000),title:this.title,message:this.message,recived:new Date,status:"pending",reply:[]}
        this.addNewTicket(newTicket)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
form {
display: flex;
flex-direction: column;
width: 30%;
margin: auto;
}
form label{
  font-weight: 700;
}
textarea {
  resize: none;
  padding:.2rem .3rem;
}
label{
  margin-top: .5rem;
  text-align: start;
}
.grey{
  color: grey;
}
</style>