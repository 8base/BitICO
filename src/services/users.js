import User from "../data/models/User";
import RSKService from "./RSKService";
import BTCService from "./BTCService";

export default {


  async findOrCreateUser(data) {

    const user = await User.findOne({
      where: {
        email: data.email
      }
    });

    if (user != null) {
      return user;
    }

    const rskService = new RSKService();
    const address  = await rskService.createAccount();
    const btcService = new BTCService();
    const btcAddress = btcService.createAccount();

    return User.create({
      email: data.email,
      fullName: data.name,
      rskAddress: address,
      btcAddress
    });
  }


}
