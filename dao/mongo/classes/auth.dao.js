import userModel from '../models/user.model.js';
import UserDTO from '../../../services/DTOs/user.dto.js';
import env from '../../../config/enviroment.config.js';

export default class AuthFactory {
  async UserFoundByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async addUser(user) {
    try {
      const NewUser = new userModel(new UserDTO(user));
      return await NewUser.save();
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  UserIsAdmin(user) {
    let admin = { ...env.ADMIN };
    if (user.email == admin.email && user.password == admin.password) return true;
    return false;
  }

  async UserFoundById(id, queries) {
    try {
      return await userModel.findByIdAndUpdate(id, queries && queries).select('-password');
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async UserFoundSimilar(found) {
    try {
      return await userModel.find({ email: { $regex: found, $options: 'i' } });
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }
}