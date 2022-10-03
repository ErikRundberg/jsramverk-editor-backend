const sgMail = require('@sendgrid/mail')

const msg = (email, from, title) => {
    return {
        to: email,
        from: 'erru17@student.bth.se',
        subject: `${from} has invited you to ${title}!`,
        html: "<p>Join me at <a href='https://www.student.bth.se/~erru17/editor'>jsramverk-editor!</a></p>",
    }
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailFacade = {
    sendEmail: function sendEmail(body) {
        const to = body.to;
        const from = body.from;
        const title = body.title;

        return sgMail
            .send(msg(to, from, title))
            .then(() => {
                return {sent: "true", ...body};
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

module.exports = emailFacade;