// Підключаємо технологію express для back-end сервера
const express = require('express')
// Створюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

User.create({
  email: 'test@email.com',
  password: '12345678',
  role: 1,
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  //              ↙️ сюди вводимо назву файлу з container
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

router.post('/recovery', function (req, res) {
  const { email } = req.body
  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: 'Error. Required fields are empty.',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'No user exists with such email',
      })
    }

    Confirm.create(email)
    return res.status(200).json({
      message: 'Check your email for reset code',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    title: 'Recovery page',

    data: {},
  })
})

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    title: 'Recovery Confirm page',
    data: {},
  })
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body
  console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: 'Error. Required fields are empty.',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: "Such code doesn't exist",
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'No user exists with such email',
      })
    }

    user.password = password

    console.log(user)

    return res.status(200).json({
      message: 'Password is changed successfully',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// Підключаємо роутер до бек-енду:
module.exports = router
