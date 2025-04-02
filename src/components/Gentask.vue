<template>
  <div class="header">
    <h1>Математический рандомайзер</h1>
    <label>Числа до скольки?:</label>
    <input type="number" v-model="maxNumber" class="headinput" />

    <label>Сколько чисел в примере?:</label>
    <input type="number" v-model="length" class="headinput" min="2" />

    <label>Количество задач:</label>
    <input type="number" v-model="taskCount" class="headinput" />
    <button @click="startGame">Начать</button>
    <button @click="resetGame">Сбросить</button>
  </div>

  <p class="timer">
    Время: <span id="timeValue">{{ time }}</span> сек
  </p>

  <div class="container">
    <div v-for="(task, index) in tasks" :key="index" class="task">
      <span>{{ task.text }}</span> =
      <input type="number" v-model="task.userAnswer" @input="checkAnswers" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // Removed 'watch' import as it's not being used

export default {
  name: "MathRandomizerTask", // Renamed component to satisfy multi-word naming requirement
  data() {
    return {
      time: ref(0),
      timer: ref(null),
      maxNumber: ref(100),
      length: ref(2),
      taskCount: ref(10),
      tasks: ref([]),
    };
  },
  methods: {
    startGame() {
      clearInterval(this.timer);
      this.time = 0;

      this.timer = setInterval(() => {
        this.time++;
      }, 1000);

      this.tasks = this.generateTasks();
    },
    resetGame() {
      clearInterval(this.timer);
      this.time = 0;
      this.tasks = [];
    },
    generateTasks() {
      let ops = ["+", "-", "*"];
      return Array.from({ length: this.taskCount }, () => {
        let nums = Array.from({ length: this.length }, () =>
          Math.floor(Math.random() * this.maxNumber)
        );
        let taskText = nums[0].toString();

        for (let i = 1; i < this.length; i++) {
          let op = ops[Math.floor(Math.random() * ops.length)];
          taskText += ` ${op} ${nums[i]}`;
        }

        return { text: taskText, answer: eval(taskText), userAnswer: "" };
      });
    },
    checkAnswers() {
      const allCorrect = this.tasks.every(
        (task) => parseInt(task.userAnswer) === task.answer
      );
      if (allCorrect) {
        clearInterval(this.timer);
        alert(`Поздравляем! Вы справились за ${this.time} секунд.`);
      }
    },
  },
};
</script>
<style>
body {
  font-family: "Handjet", sans-serif;
  text-align: center;
  width: 100%;
  height: 100%;
  --color: #e1e1e1;
  background-color: #f3f3f3;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    );
  background-size: 55px 55px;
  font-size: 30px;
}

.task {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(248, 248, 248);
  width: 200px;
  display: inline-block;
}
.task:hover {
  transform: scale(1.1, 1.1);
  cursor: pointer;
}

.correct {
  background-color: lightgreen;
}
.wrong {
  background-color: lightcoral;
}
.container {
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  /* From Uiverse.io by csemszepp */
}

.handjet-font {
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 40px;
  font-size-adjust: 0.5;
  font-stretch: expanded;
  font-variation-settings: "ELGR" 1, "ELSH" 2;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* From Uiverse.io by Smit-Prajapati */
/* From Uiverse.io by cssbuttons-io */
button {
  font-family: "Handjet", sans-serif;
  padding: 1.3em 3em;
  font-size: 12px;
  font-optical-sizing: auto;
  font-size: large;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  width: 140px;
  height: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}

.headinput {
  font-family: "Handjet", sans-serif;
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  border-radius: 5px;
  border: none;
}

.headinput:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  padding: 10px;
  width: 200px;
  height: 25px;
  margin: 10px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Для Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.timer {
  font-family: "Handjet", sans-serif;
  font-size: 25px;
  font-weight: 400;
  font-style: normal;
  color: #000;
  position: fixed;
  top: 200px;
  left: 300px;
  border-radius: 5px;
  background-color: rgb(248, 248, 248);
  width: 130px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  z-index: 10;
  padding: 2px;
}

#timeValue {
  display: inline-block;
  transition: transform 0.2s ease-in-out;
  background-image: linear-gradient(red, blue);
  color: transparent;
  background-clip: text;
}

#timeValue:hover {
  transform: scale(1.5);
}
</style>
