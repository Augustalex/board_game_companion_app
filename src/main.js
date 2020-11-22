import { createApp } from "vue";
import App from "./App.vue";
import DraftingVariant from "./DraftingVariant.vue";

const Variants = {
    Shuffle: App,
    Drafting: DraftingVariant
}

createApp(Variants.Drafting).mount("#app");
