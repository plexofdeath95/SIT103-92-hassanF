<template>
    <div>
      <h2>Add User</h2>
      <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
      <form @submit.prevent="addUser">
        <label>
          Username:
          <input v-model="Username" />
        </label>
        <label>
          Email:
          <input v-model="Email" />
        </label>
        <label>
          Password:
          <input type="password" v-model="Password" />
        </label>
        <label>
          SubscriptionType:
          <select v-model="SubscriptionType">
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    setup() {
      const Username = ref('');
      const Email = ref('');
      const Password = ref('');
      const SubscriptionType = ref('free');
      const error = ref('');
      const success = ref('');
  
      function validateEmail(email: string) {
        var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
      }
  
      const addUser = async () => {
        error.value = ''; // Reset the error message at the beginning of the method.
        if (!Username.value.trim() || !Email.value.trim() || !Password.value.trim()) {
          error.value = 'All fields are required!';
          return;
        }
  
        if (!validateEmail(Email.value)) {
          error.value = 'Please enter a valid email!';
          return;
        }
  
        if (Password.value.length < 6) {
          error.value = 'Password must be at least 6 characters long!';
          return;
        }
        
        try {
          await axios.post('http://localhost:3000/user', {
            Username: Username.value,
            Email: Email.value,
            Password: Password.value,
            SubscriptionType: SubscriptionType.value,
          });
          success.value = 'User added successfully!';
        } catch (error : any) {
          console.error('An error occurred while adding the user:', error);
          error.value = 'An error occurred while adding the user.';
        }


      };
      
      return { Username, Email, Password, SubscriptionType, addUser, error, success };
    },
  });
  
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

label {
  margin-bottom: 10px;
}
  </style>
  