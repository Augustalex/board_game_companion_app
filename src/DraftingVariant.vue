<template>
  <div>
    <div class="tradeRules">
      <div
          v-for="(text, index) in texts"
          :key="index" class="tradeRule"
          @click="selectTradeRule(index)"
      >
        {{ text }}
      </div>
    </div>
    <div class="previouslySelected">
      <div
          class="previousSelectedTradeRule"
          v-for="(selectedTradeRule, index) in selectedTradeRules.slice(0, 6)"
          :key="index"
          :style="{opacity: '0.' + ((60 - index * 10).toString())}"
      >
        {{ selectedTradeRule }}
      </div>
    </div>
  </div>
</template>
<script>
import {computed, ref} from "@vue/reactivity";
import {onMounted} from "@vue/runtime-core";

export default {
  name: "App",
  setup() {
    const resources = ['Mineral', 'Credit', 'War'];

    const selectedTradeRules = ref([]);
    const setTradeRules = ref([]);

    function reroll() {
      const newRules = [];
      for (let i = 0; i < 3; i++) {
        newRules.push(rollOne(newRules));
      }

      setTradeRules.value = newRules;
      console.log('setTradeRules.value', setTradeRules.value);
    }

    function rerollIndex(index) {
      setTradeRules.value[index] = rollOne();
    }

    function rollOne() {
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

      return {quantityA, resourceA, quantityB, resourceB};
    }

    const tradeRuleTexts = computed(() => {
      return setTradeRules.value.map(({quantityA, resourceA, quantityB, resourceB}) => `${quantityA} ${resourceA} -> ${quantityB} ${resourceB}`);
    });

    function selectTradeRule(index) {
      selectedTradeRules.value.unshift(tradeRuleTexts.value[index]);
      rerollIndex(index);
    }

    onMounted(() => {
      reroll();
    });

    return {
      selectTradeRule,
      selectedTradeRules,
      texts: tradeRuleTexts
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

.previousSelectedTradeRule {
  background: rgba(255, 0, 0, .4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  height: 60px;
  margin: 15px auto;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .5;
}

.tradeRules {
  margin-top: 30px;
}

.tradeRule {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  height: 60px;
  margin: 15px auto;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .15);
}
</style>
