import userModel from "../models/user.model.js";
import AuthManager from "./auth_manager.js";
import { IsIdValid } from "../utils.js";
const IAuthManager = new AuthManager()
export default  class FriendManager{
    async addFriend (id) {
        const {_id} = await IAuthManager.userFound(id)
        
        let validationid = IsIdValid(_id)
        if(validationid){
            
        }else{
            
        }
    }
}