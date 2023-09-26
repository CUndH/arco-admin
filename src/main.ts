import { createApp } from 'vue';
import { setupStore } from '@/store';
import App from '@/App.vue';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from './router';

import './styles/index.scss';
import './styles/tailwind.css';

const setupAll = async () => {
  const app = createApp(App);

  app.use(ArcoVue);

  setupStore(app);

  setupRouter(app);

  app.mount('#app');
};

setupAll();
