export default class UserDTO {
  constructor(user) {
    if (!user.username || typeof user.username != "string") {
      user.username = user.email;
    }

    if (!user.password || typeof user.password != "string") {
      throw new Error("Password syntax not supported");
    }

    if (!user.role || typeof user.role != "string") {
      user.role = "usuario";
    }

    if (!user.img || typeof user.img != "string") {
      user.img = "https://i.imgur.com/9zz7ubU.jpg";
    }

    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.img = user.img;
    this.cart = user.cart;
    this.friends = [];
    this.chats = [];
  }
}
