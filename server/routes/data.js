const router = require('express').Router()
const nodemailer = require('nodemailer')

router.get('/', function(req, res) {
  res.render('users')
})

router.post('/send', async (req, res) => {
  const { name, tel, type, color, carat, pure, price } = req.body
  console.log("DATA:", req.body)

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testformos4@gmail.com',
        pass: 'vipvuhsimjnzmjqp'
      }
    })

    let info = {
      from: 'testformos4@gmail.com',
      to: 'mos.gurekhyan@mail.ru',
      subject: 'Заказ',
      text: `Имя: ${name}\nТелефон: ${tel}\nДетали заявки…:\nФорма: ${type}\nЦвет: ${color}\nРазмер в каратах: ${carat}\nЧистота: ${pure}\nЦена: ${price}`
    }

    await transporter.sendMail(info)

    console.log('Message sent!')
  } catch (err) {
    console.error('Error sending email:', err)
    res.status(500).send('Error sending email.')
  }
})

module.exports = router