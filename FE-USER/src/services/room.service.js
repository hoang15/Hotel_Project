import BaseService from "./base.service";
import http from "./services.js";
class roomExtend extends BaseService {
  searchName(value) {
    return http.get(
      `/api/collections/${this.name}/records?filter=(kindOfRoom~"${value}")`
    );
  }
}
const roomService = new roomExtend("rooms");
export default roomService;
