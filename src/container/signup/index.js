class Signup {
  static value = {
    // тут будуть зберігатися дані з форми (назви полів)
  }

  static validate = (name, value) => {
    return true
  }

  static submit = () => {
    console.log(this.value)
  }

  static change = (name, value) => {
    console.log(name, value)
    if (this.validate(name, value)) this.value[name] = value
  }
}

window.signup = Signup
