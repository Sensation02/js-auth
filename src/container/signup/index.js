import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'
import { saveSession } from '../../script/session'

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_REPEAT: 'passwordRepeat',
    ROLE: 'role',
    IS_CONFIRM: 'isConfirm',
  }

  FIELD_ERROR = {
    IS_EMPTY: "This field shouldn't be empty",
    IS_BIG: 'Too many characters, remove extra',
    EMAIL: 'Use valid email',
    PASSWORD:
      'Password should consist of at least 8 characters including at least 1 digit, small and capital letters',
    PASSWORD_REPEAT: 'Passwords do not match',
    NOT_CONFIRM:
      'You have to agree to terms and conditions',
    ROLE: 'You have to choose role',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    } // якщо значення поля має менше 1 символу, повертаємо помилку

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    } // якщо значення поля має більше 20 символів, повертаємо помилку

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value)))
        return this.FIELD_ERROR.EMAIL
    } // якщо значення поля не відповідає регулярному виразу для електронної пошти, повертаємо помилку

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value)))
        return this.FIELD_ERROR.PASSWORD
    } // якщо значення поля не відповідає регулярному виразу для пароля, повертаємо помилку

    if (name === this.FIELD_NAME.PASSWORD_REPEAT) {
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      ) {
        return this.FIELD_ERROR.PASSWORD_REPEAT
      }
    } // якщо значення поля не дорівнює значенню поля пароля, повертаємо помилку

    if (name === this.FIELD_NAME.IS_CONFIRM) {
      if (Boolean(value) !== true)
        return this.FIELD_ERROR.NOT_CONFIRM
    } // якщо значення поля не дорівнює true, повертаємо помилку

    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) return this.FIELD_ERROR.ROLE
    }
  } // якщо значення поля не є числом, повертаємо помилку

  submit = async () => {
    // метод відправки форми
    if (this.disabled === true) {
      // якщо кнопка відключена
      this.validateAll() // валідуємо всі поля
    } else {
      // якщо кнопка не відключена
      console.log(this.value)

      this.setAlert('progress', 'In progress') // встановлюємо повідомлення про відправку форми

      try {
        // спробуємо відправити форму на сервер
        const res = await fetch('/signup', {
          // відправляємо форму на сервер
          method: 'POST', // метод POST
          headers: {
            // заголовки
            'Content-type': 'application/json',
          },
          body: this.convertData(), // дані форми (перетворені в JSON)
        })

        const data = await res.json() // отримуємо дані з сервера

        if (res.ok) {
          // якщо сервер повернув статус 200
          this.setAlert('success', data.message) // встановлюємо повідомлення про успішну відправку форми
          saveSession(data.session) // зберігаємо сесію
          location.assign('/') // переходимо на головну сторінку
        } else {
          this.setAlert('error', data.message) // встановлюємо повідомлення про помилку відправки форми
        }
      } catch (error) {
        // якщо сталася помилка
        this.setAlert('error', error.message) // встановлюємо повідомлення про помилку відправки форми
      }
    }
  }

  convertData = () => {
    // метод перетворення даних форми в JSON
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL], // встановлюємо значення поля електронної пошти
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD], // встановлюємо значення поля пароля
      [this.FIELD_NAME.ROLE]:
        this.value[this.FIELD_NAME.ROLE], // встановлюємо значення поля ролі
    })
  }
}

window.signupForm = new SignupForm() // створюємо екземпляр класу форми
