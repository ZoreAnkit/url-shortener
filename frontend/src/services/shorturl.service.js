import ApiService from './api.service';

const ShorturlService = {
    getShortUrls() {
        return ApiService.get(`/api/shorturls`);
    },
    createShortUrl(original_url) {
        return ApiService.post('/api/shorturls', { original_url: original_url });
    },
};

export default ShorturlService;