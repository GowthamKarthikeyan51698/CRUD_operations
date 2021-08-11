<template>
    <div>
        <div class="header">
            <h1>{{msg}}</h1>
            <!-- <button type="button" @click="showModal">
                <i class="icon icon-plus-circle-outline fs-16 text-black ml-1"></i>
                Add User
            </button> -->
            <button @click="addUser()" type="button">
                <i class="icon icon-plus-circle-outline fs-16 text-black ml-1"></i>
                Add User
            </button>
            <!-- <AddUserModal
                v-if="isModalVisible"
                :userDetails = userDetails
                @close="closeModal"
                @add-user="userAdd"
            /> -->
            <!-- <EditUserModal 
                v-if="isEditModalVisible" 
                @close-edit="closeEditModal" 
                @edit-user="userEdit" 
                :selectedUser = "selectedUser" 
            /> -->
            
        </div>
        

        <table class='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>EMAIL</th>
                    <th>FIRSTNAME</th>
                    <th>LASTNAME</th>
                    <th>DETAILS</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user) in userDetails" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.first_name}}</td>
                    <td>{{user.last_name}}</td>
                    <td><a href="#" @click="showDetails(user)">Details</a></td>
                    <td>
                        <span @click="updateUser(user)">
                            <button @click="editUser()" class="btn-warning create-new ml-2">
                                <i class="far fa-edit"></i>
                            </button>
                        </span>
                    </td>
                    <!-- <td><span @click="updateUser(user)"><button @click="showEditModal();" class="edit-btn btn-warning"><i class="far fa-edit"></i></button></span></td> -->
                    <td><span @click="updateUser(user)"><button @click="deleteUser()" class="delete-btn btn-danger"><i class="far fa-trash-alt"></i></button></span></td>
                </tr>
            </tbody>
        </table>
    <edit-user @edit-user="userEdit" :selectedUser = "selectedUser"  @hide-user="hideUser" v-if="edituser" modal_name="edit-vendor"></edit-user>
    <add-user @add-user="userAdd" :userDetails = userDetails @hide-add-user="hideAddUser" v-if="adduser" modal_name="add-vendor"></add-user>
    </div>
</template>

<script>

    import axios from "axios"
    import Swal from 'sweetalert2'
    // import AddUserModal from './AddUserModal'
    import AddUser from './AddUser.vue'
    import EditUser from './EditUser.vue'
    // import EditUserModal from './EditUserModal.vue'

    export default({
        name: 'UserDetails',
        data() {
            return {
                userDetails: [],
                isModalVisible: false,
                // isEditModalVisible: false,
                selectedUser: 0,
                edituser: false,
                adduser: false,
            }
        },
        components: {
            Swal,
            // AddUserModal,
            AddUser,
            // EditUserModal
            EditUser,
        },
        props: {
            msg: String
        },
        methods:{
            editUser(){
                this.edituser = true
                setTimeout(() => {
                    this.$modal.show('edit-vendor');
                },500)
            },
            addUser(){
                this.adduser = true
                setTimeout(() => {
                    this.$modal.show('add-vendor');
                },500)
            },
            hideUser(){
                this.edituser = false
            },
            hideAddUser(){
                this.adduser = false
            },
            showModal(){
                this.isModalVisible = true;
            },
            // showEditModal(){
            //     this.isEditModalVisible = true;
            // },
            closeModal(){
                this.isModalVisible = false;
            },
            // closeEditModal(){
            //     this.selectedUser = null
            //     this.isEditModalVisible = false;
            // },
            updateUser(user){
                this.selectedUser = user
            },
            showDetails(user){
                Swal.fire({
                    title: 'User Details',
                    html: `<img src=${user.avatar} />
                            <p style="font-weight:bold">ID: ${user.id}</p>
                            <p>Email: ${user.email}</p>
                            <p>firstname: ${user.first_name}</p>
                            <p>lastname: ${user.last_name}</p>`,
                    confirmButtonText: 'close',
                })
            },
            // user_data
            // showModal()
            userAdd(newuser){
                // const id = this.userDetails[this.userDetails.length-1].id
                axios.post('https://reqres.in/api/users',newuser)
                     .then((resp) => {
                         const users1 = resp.data;
                         this.userDetails.push(users1)
                        // this.userDetails = [...this.userDetails, user]
                        Swal.fire({
                            icon: 'success',
                            title: 'User has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(resp)
                     })
                     .catch((err) => console.log(err))
            },
            userEdit(editdata){
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Don't save`,
                }).then((result) => { 
                    if (result.value) { 
                        axios.put(`https://reqres.in/api/users/${this.selectedUser.id}`, editdata)
                        .then((resp) => {
                            const selectedIdIndex = this.selectedUser.id - 1;
                            console.log(selectedIdIndex)
                            this.userDetails[selectedIdIndex].id = resp.data.id
                            this.userDetails[selectedIdIndex].email = resp.data.email
                            this.userDetails[selectedIdIndex].first_name = resp.data.first_name
                            this.userDetails[selectedIdIndex].last_name = resp.data.last_name
                            console.log(resp.data)
                        })
                        .catch((err) => console.log(err)) 
                    }
                    if (result.isConfirmed) {
                        Swal.fire('Saved!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                });    
            },

            deleteUser(){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => { 
                    if (result.value) { 
                        axios.delete(`https://reqres.in/api/users/${this.selectedUser.id}`)
                        .then((resp) =>{
                                const selectedIdIndex = this.selectedUser.id - 1;
                                const initialId = this.userDetails[0].id
                                console.log(selectedIdIndex, initialId)
                                // this.userDetails.splice(selectedIdIndex, 1)
                                this.userDetails = this.userDetails.filter((user) => user.id !== this.selectedUser.id)
                                this.userDetails.forEach((user, index) => {
                                    const userId = initialId + index;
                                    user.id = userId
                                })

                                console.log(resp)
                        })
                    }
                    if (result.isConfirmed) {
                        Swal.fire('Deleted!', '', 'success')
                    }
                });
                
            }
        },
        mounted(){
            axios.get('https://reqres.in/api/users')
                .then((resp) => {
                    const users = resp.data.data;
                    users.forEach((user) => {
                        this.userDetails.push(user)
                    })
                    console.log(resp.data.data);
                })
                .catch((err) => console.log(err))
        },
    })

</script>   

<style scoped>

.header{
    display: flex;
    justify-content: center;
    align-items: center;
}
button{
    margin-left: 30px;
    padding: 5px;
    height: auto;
}
table{
    margin: auto;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    padding: 10px;
}
td{
    padding: 10px 30px;
}
td a{
    text-decoration: none;
}
th{
    background-color: white;
}
tr:nth-child(odd){
    background-color: whitesmoke ;
}
.edit-btn,.delete-btn{
    color: black
}
</style>