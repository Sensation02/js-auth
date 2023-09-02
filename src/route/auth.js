// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@email.com',
  password: '12345678',
  role: 1,
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  //              ↙️ cюди вводимо назву файлу з сontainer
  res.render('signup', {
    // вказуємо назву контейнера:
    name: 'signup',
    // вказуємо назву компонентів:
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    // вказуємо назву сторінки:
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані:
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'User' },
        { value: User.USER_ROLE.ADMIN, text: 'Admin' },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Developer',
        },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body
  console.log(
    `email: ${email}, password: ${password}, role: ${role}`,
  )

  if (!email || !password || !role) {
    res
      .status(400)
      .json({ message: 'Error. Please fill all fields' })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'User with such email already exists',
      })
    }
    User.create({ email, password, role })
    return res.status(200).json({
      message: 'Successfully signed up!',
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error. Try again' })
  }
})

// Підключаємо роутер до бек-енду:
module.exports = router
