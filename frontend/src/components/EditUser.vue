<template>
  <div>
    <h2>Edit User</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <form @submit.prevent="editUser">
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
        {{ Password }}
      </label>
      <label>
        SubscriptionType:
        <select v-model="SubscriptionType">
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </label>
      <button type="submit">Edit User</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const Username = ref('')
    const Email = ref('')
    const SubscriptionType = ref('')
    const Password = ref('')
    const error = ref('')
    console.log('id', route.params.id)

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${route.params.id}`)
        Username.value = response.data.Username
        Email.value = response.data.Email
        SubscriptionType.value = response.data.SubscriptionType
        console.log('SubscriptionType', SubscriptionType.value)
        Password.value = response.data.Password
      } catch (error) {
        console.error('An error occurred while fetching the user:', error)
      }
    }

    function validateEmail(email: string) {
      var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
      return re.test(email)
    }
    const editUser = async () => {
      try {
        if (!Username.value.trim() || !Email.value.trim() || !Password.value.trim()) {
          error.value = 'All fields are required!'
          return
        }

        if (!validateEmail(Email.value)) {
          error.value = 'Please enter a valid email!'
          return
        }

        if (Password.value.length < 6) {
          error.value = 'Password must be at least 6 characters long!'
          return
        }
        await axios.put(`http://localhost:3000/user/${route.params.id}`, {
          Username: Username.value,
          Email: Email.value,
          SubscriptionType: SubscriptionType.value,
          Password: Password.value
        })
        alert('User edited successfully!')
        router.push({ name: 'UserList' }) // Redirect to user list after edit
      } catch (error) {
        console.error('An error occurred while editing the user:', error)
      }
    }

    return { Username, Email, SubscriptionType, Password, error, editUser, fetchData }
  },
  async mounted() {
    await this.fetchData()
  }
})
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

label {
  margin-bottom: 10px;
}
.error {
    color: red;
  }
</style>
