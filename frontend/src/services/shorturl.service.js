import ApiService from './api.service';

const ShorturlService = {
    getShortUrls() {
        return ApiService.get(`/api/shorturls`);
    },
    createShortUrl(original_url) {
        return ApiService.post('/api/shorturls', { original_url: original_url });
    },
    updateShortUrl(id, original_url, status) {
        return ApiService.put(`/api/shorturls/${id}`, { original_url: original_url, status: status });
    }
};

export default ShorturlService;