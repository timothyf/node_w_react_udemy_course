const keys = require('../config/keys');
const Stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

  app.post('/api/stripe', requireLogin, async (req, res) => {

    const charge = await Stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Emaily Survey Credits',
      source: req.body.id
    })

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });

};
