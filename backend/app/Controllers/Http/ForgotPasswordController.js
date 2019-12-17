'use strict'

const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const User = use('App/Models/User');
const Env = use('Env');

class ForgotPasswordController {
    async store({ request }) {
        const email = request.input('email');
            
        const user = await User.findByOrFail('email', email);
            
        const random = await promisify(randomBytes)(16);
        const token = random.toString('hex');

        await user.tokens().create({
            token,
            type: 'forgotpassword'
        });

        const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

        await Mail.send('emails.forgotpassword', 
            { username: user.username, resetPasswordUrl }, 
            (message) => {
                message
                    .to(user.email)
                    .from('ronnyacacio@gmail.com')
                    .subject('Recuperação de senha')
            })
        }
}

module.exports = ForgotPasswordController
