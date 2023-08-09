export default class UserFrontDTO {
  constructor(user) {
    this.username = user.username || user._json.name || profile._json.login;
    this.email = user.email;
    this.role = user.role || 'usuario';

    this.img = user.img || user._json.avatar_url || 'https://i.imgur.com/9zz7ubU.jpg';
  }
}
