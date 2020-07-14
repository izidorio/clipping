import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Methods'] ='GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Headers'] ='Content-Type';
const api = axios.create({
    timeout: 5000
})

export default api