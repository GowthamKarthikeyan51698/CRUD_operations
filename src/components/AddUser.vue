<template>
    <div>
        <modal :name="modal_name" class="final-modal" transition="nice-modal-fade">
            <div class="v-modal-content">
                <div class="v-modal-header">
                    <span class="v-modal-dialog-title v-modal-title">Add User</span>
                    <button type="button" class="closeModal" aria-label="Close" @click="hideAddUser()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="v-modal-body">
                        <div>
                            <form class="adduser" @submit.prevent="onSubmit">
                                <input type="email" v-model="email" placeholder="email"> 
                                <input type="text" v-model="first_name" placeholder="firstname"> 
                                <input type="text" v-model="last_name" placeholder="lastname"> 
                                <input class="button" type="submit" value="Submit">
                            </form>
                        </div>
                </div>
                <!-- <div class="v-modal-dialog-actions">
                    <button @click="hideAddVendor()">CANCEL</button>
                </div> -->
            </div>
        </modal>
    </div>
</template>

<script>

export default({
    props:['modal_name','userDetails'],
    data(){
        return{
            email: '',  
            first_name: '',
            last_name: ''
        }
    },
    methods: {
        onSubmit(){
          var AddId;
          if (this.email === '' || this.first_name === '' || this.last_name === ''){
            return
          }
          if(this.userDetails.length === 0){
            AddId = 1
          } else{
            AddId = this.userDetails[this.userDetails.length-1].id+1
          }
          let newUser = {
            id: AddId,
            email : this.email,
            first_name: this.first_name,
            last_name: this.last_name
          }
          this.$emit('add-user', newUser)
          this.email = ''
          this.first_name= ''
          this.last_name = ''
        },
        hideAddUser(){
            this.$emit('hide-add-user');
            console.log(this.selectedUser)
        },
    }
})

</script>

<style>
.v-modal-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
}
.v-modal-content{
    padding: 5px;
}
.v-modal-body div form{
    display: flex;
    flex-direction: column;
}

.v-modal-body div input{
    margin-bottom: 10px;
    padding: 10px;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;
    opacity: 0.71
}

</style>
