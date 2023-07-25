import userModel from "../models/user.model.js"
const idTest = "64bf1070fdcd43c8c6c97681"


export default class FriendManager{
    async addFriend(id){
        /* No esta verificado por si el usuario ya esta agendando a su lista de amigo */
        let aux= await userModel.findOneAndUpdate({_id:idTest},{$push:{friends:{friend:id}}},{new:true}) 
        
    }
    removeFriend(){

    }
}