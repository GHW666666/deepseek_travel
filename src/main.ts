import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Button} from 'vant'
import 'vant/lib/index.css'
import "amfe-flexible"
const app = createApp(App)
app.use(router)
app.use(Button)
app.mount('#app')

