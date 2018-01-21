import User from "../data/models/User";

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

    return User.create({
      email: data.email,
      fullName: data.name
    });
  }


}
