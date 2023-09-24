<template>
    <div class="UserContainer">
      <h2>User List</h2>
      <ul>
        <li v-for="user in users" :key="user.UserID" class="userItem">
          <div class="userInfo">
            <div class="userField">
              <strong>Username:</strong> {{ user.Username }}
            </div>
            <div class="userField">
              <strong>Email:</strong> {{ user.Email }}
            </div>
            <div class="userField">
              <strong>SubscriptionType:</strong> {{ user.SubscriptionType }}
            </div>
            <div class="userField">
              <strong>Password:</strong> {{ user.Password }}
            </div>
          </div>
          <div class="userActions">
            <button @click="editUser(user.UserID)">Edit</button>
            <button @click="deleteUser(user.UserID)">Delete</button>
          </div>
        </li>
      </ul>
      <button @click="goToAddUser">Add User</button>
    </div>
  </template>
  

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

enum SubscriptionType {
  Free = 'free',
  Premium = 'premium'
}

interface User {
  UserID: number
  Username: string
  Email: string
  SubscriptionType: SubscriptionType
  Password: string
  DateJoined: string
  LastLoginDate: string
}

export default defineComponent({
  data() {
    return {
      users: [] as User[]
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/user/allUsers')
      this.users = response.data
    } catch (error) {
      console.error('An error occurred while fetching the user list:', error)
    }
  },
  methods: {
    editUser(userId: number) {
      this.$router.push({ name: 'EditUser', params: { id: userId.toString() } })
    },
    deleteUser(userId: number) {
      this.$router.push({ name: 'DeleteUser', params: { id: userId.toString() } })
    },
    goToAddUser() {
      console.log('Trying to navigate to Add User')
      this.$router.push({ name: 'AddUser' })
    }
  }
})
</script>

<style>
.UserContainer {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.UserContainer ul {
  list-style-type: none;
  padding: 0;
}

.UserContainer li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.userInfo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1; /* Expand to fill available space */
}

.userField {
  flex: 1; /* Equal distribution of fields */
  word-break: break-word; /* Handle long text */
}

.userActions {
  display: flex;
  gap: 10px;
}
</style>
