<template>
  <div>
    <button @click="reroll" class="reroll" />
    <div class="tradeRules">
      <div v-for="(text, index) in texts" :key="index" class="tradeRule">
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";

export default {
  name: "App",
  setup() {
    const resources = ['Mineral', 'Credit', 'War'];

    const setTradeRules = ref([]);

    function reroll() {
      const establishedTradeRules = [];
      for (let i = 0; i < 3; i++) {
        const resourceA = resources[Math.round(Math.random() * (resources.length - 1))];

        const quantityB = Math.round(Math.random()) + 1;

        let quantityA = 0;
        while (quantityA === 0 || quantityA > quantityB) {
          quantityA = Math.round(Math.random()) + 1;
        }

        let resourceB = null;
        while (
            resourceB == null
            || resourceB === resourceA
            ) {
          resourceB = resources[Math.round(Math.random() * (resources.length - 1))];
        }

        establishedTradeRules.push({quantityA, resourceA, quantityB, resourceB});

        setTradeRules.value = establishedTradeRules.map(({quantityA, resourceA, quantityB, resourceB}) => `${quantityA} ${resourceA} -> ${quantityB} ${resourceB}`);
      }
    }

    onMounted(() => {
      reroll();
    });

    return {
      reroll,
      texts: setTradeRules
    };
  }
};
</script>

<style>
body {
  background-image: url("/itisspace.jpg");
  background-size: contain;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #EFEFEF;
  margin-top: 60px;
}

.reroll {
  background-image: url("/dice.png");
  background-color: transparent;
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, .1);
}

.reroll:focus {
  outline: 0;
}

.reroll:active {
  background-color: rgba(255, 255, 255, 1);
}

.tradeRules {
  margin-top: 30px;
}

.tradeRule {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  height: 60px;
  margin: 15px auto;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.15);
}
</style>
