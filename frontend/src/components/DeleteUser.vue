<template>
  <div>
    <h2>Delete User</h2>
    <button @click="deleteUser">Confirm Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    console.log('id', route.params.id);

    const deleteUser = async () => {
      try {
        await axios.delete(`http://localhost:3000/user/${route.params.id}`);
        alert('User deleted successfully!');
        router.push({ name: 'UserList' }); // Redirect to user list after deletion
      } catch (error) {
        console.error('An error occurred while deleting the user:', error);
      }
    }
    return {
      deleteUser,
    };
  },

});
</script>
