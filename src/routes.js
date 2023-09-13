import Main from './pages/Main/Main.vue'
import Documentation from './pages/Documentation/Documentation.vue'
import Updates from './pages/Updates/Updates.vue'
import HallOfFame from './pages/HallOfFame/HallOfFame.vue'

export default [
    { path: '/', component: Main, name: 'main' },
    { path: '/documentation', component: Documentation, name: 'documentation' },
    { path: '/updates', component: Updates, name: 'updates' },
    { path: '/hallOfFame', component: HallOfFame, name: 'hallOfFame' },
]