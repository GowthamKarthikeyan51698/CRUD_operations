<template>
    <div>
        <modal :name="modal_name" class="final-modal" transition="nice-modal-fade">
            <div class="v-modal-content">
                <div class="v-modal-header">
                    <span class="v-modal-dialog-title v-modal-title">Edit User</span>
                    <button type="button" class="closeModal" aria-label="Close" @click="hideEditUser()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="v-modal-body">
                        <div>
                            <form class="edituser" @submit.prevent="onEditSubmit">
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
    props:['modal_name','selectedUser'],
    data(){
        return{
            email: '',  
            first_name: '',
            last_name: ''
        }
    },
    methods: {
        onEditSubmit(){
          if (this.email === '' || this.first_name === '' || this.last_name === ''){
            alert('Please fill all the fields')
            return
          }
          let editUser = {
            id: this.selectedUser.id,
            email : this.email,
            first_name: this.first_name,
            last_name: this.last_name
          }
          this.$emit('edit-user', editUser)
        },
        hideEditUser(){
            this.$emit('hide-user');
            console.log(this.selectedUser)
        },
    },
    mounted() {
        setTimeout(() => {
            this.email = this.selectedUser.email,
            this.first_name = this.selectedUser.first_name,
            this.last_name = this.selectedUser.last_name
        }, 500);
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
