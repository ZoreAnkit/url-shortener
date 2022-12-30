import ApiService from "./api.service";

const UserService = {
  getUserPlan(id) {
    return ApiService.get(`/api/users`, { id: id });
  },
  updateUserPlan(id, urlLimit) {
    return ApiService.put(`/api/users/${id}`, { urlLimit: urlLimit });
  },
};

export default UserService;
