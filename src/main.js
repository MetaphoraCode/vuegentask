import { createApp } from "vue";
import App from "./App.vue";

// Подключаем Google Fonts
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Создаём и монтируем приложение
createApp(App).mount("#app");
