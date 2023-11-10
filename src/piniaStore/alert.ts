import { defineStore } from "pinia";
import { AlertState } from "./types/alertTypes";

export const useAlertStore = defineStore("alert", {
  // state
  state: (): AlertState => {
    return {
      navigation: "/",
      type: "error",
      message: "",
      show: false,
    };
  },
  // getters
  getters: {},
  // actions
  actions: {
    async showAlert({ navigation, type, message }: AlertState) {
      this.navigation = navigation;
      this.type = type;
      this.message = message;
      this.show = true;
    },
    async hideAlert() {
      this.message = "";
      this.show = false;
    },
  },
});
