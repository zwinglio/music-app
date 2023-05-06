<template>
  <div
    class="text-white text-center font-bold p-3 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_message }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        v-model="userData.email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        v-model="userData.password"
      />
      <ErrorMessage name="password" class="text-red-600" />
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      @click.prevent="login"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from '@/stores/user';

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: {
          required: true,
          min: 3,
          max: 100,
          email: true,
        },
        password: {
          required: true,
          min: 3,
          max: 100,
        },
      },
      userData: {
        email: "",
        password: "",
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_message: "Please wait... Tamo longado!",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login() {
      this.login_in_submission = true;
      this.login_show_alert = true;

      try {
        await this.authenticate(this.userData);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_message = error.message;
        return;
      }

      setTimeout(() => {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-green-500";
        this.login_alert_message = "Login Successful!";
      }, 1000);

      window.location.reload();
    },
  },
};
</script>
