import axios from "axios";

const ApiService = {
    init(baseURL, piniaStore) {
        axios.defaults.baseURL = baseURL;
        piniaStore.validate();
    },

    get(resource) {
        return axios.get(resource);
    },

    post(resource, data) {
        return axios.post(resource, data);
    },

    put(resource, data) {
        return axios.put(resource, data);
    },

    delete(resource) {
        return axios.delete(resource);
    },

    customRequest(data) {
        return axios(data);
    },
};

export default ApiService;
