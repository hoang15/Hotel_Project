import BaseService from "./base.service";
import http from "./services.js";
class bookingExtend extends BaseService {
  list(filter = null) {
    return http.get(
      `/api/collections/${this.name}/records?expand=users,rooms`,
      {
        params: filter,
      }
    );
  }
}
const bookingService = new bookingExtend("booking");
export default bookingService;
