import userModel from "../models/user.model.js"
const idTest = "64acc93afb43b1871e224c55"


export default class FriendManager{
    async addFriend(id){
        let actualizacion = {$push:{friends:id}}
        let asd= await userModel.findById(idTest,actualizacion)
        /* console.log(asd) */
    }
    removeFriend(){

    }
}