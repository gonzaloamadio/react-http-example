import axios from 'axios'

// -------- DEFINE AN INSTANCE -----------
// Create an instance of axios. Can create multiple of this copies.
// We pass to create, a JS object to configure the instance.
const instance = axios.create({
    baseURL :  'https://jsonplaceholder.typicode.com'
})

// -------- OVERWRITE DEFAULTS AFTER INSTANCE IS CREATED -----------

// If we want to overwrite a config somewhere :
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'

// ---------- WE CAN DEFINE INTERCEPTORS FOR EACH INSTANCE -------
// Interceptor defined for global instance, in index.js, 
// will not be attached to this instance.

instance.interceptors.request.use(request => {
    console.log(request)
    return request
})

// -------- USAGE ----------

// To use this instance, we need to import it. So in a file, instead of
// import axios from 'axios'
// We need to import this instance, like
// import axios from '../path/to/this/file/axios

// ------- EXPORT TO USE INSTANCE ----
export default instance
