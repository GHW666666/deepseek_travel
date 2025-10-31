import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Button ,Image as VanImage} from 'vant'
import 'vant/lib/index.css'
import "amfe-flexible"
const app = createApp(App)
app.use(router)
app.use(Button)
app.use(VanImage)
app.mount('#app')

