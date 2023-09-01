class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []

  constructor({ name, email, role }) {
    this.name = name
    this.email = email
    this.role = User.#convertRole(role)
  }

  static #convertRole = (role) => {
    role = +role // convert to number

    if (isNaN(role)) {
      // check if role is not a number
      this.USER_ROLE.USER
    }
    role = Object.values(this.USER_ROLE).includes(role) // check if role is in the list of roles
      ? role
      : this.USER_ROLE.USER

    return role
  }

  static create(data) {
    const user = new User(data)
    this.#list.push(user)
  }
}
module.exports = {
  User,
}
