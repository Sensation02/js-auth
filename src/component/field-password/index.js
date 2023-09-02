class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute('show')

    const input = target.previousElementSibling // тут лежить input
    const type = input.getAttribute('type')

    if (type === 'password') {
      // якщо пароль то міняємо на текст
      input.setAttribute('type', 'text')
    } else {
      input.setAttribute('type', 'password') // якщо ні - змінюємо атрибут type на password
    } // тобто логіка перемикача показу паролю
  }
}

window.fieldPassword = FieldPassword
