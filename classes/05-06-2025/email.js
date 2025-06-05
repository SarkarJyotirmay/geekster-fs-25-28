const nodemailer = require("nodemailer");

/**
 * 1. Initialize the package with server information
 * 2. Prepare email details
 * 3. Send email
 */

const mailer = nodemailer.createTransport({
    host: "localhost",
    port: "1025",
    secure: false
});

const mailOptions = {
    from: "do-not-reply@mystore.com",
    to: "divyansh@gmail.com",
    subject: "Order Confirmed",
    // text: "This is first email sent through nodejs nodemail package with the help of maildev package"
    html: `
        <body>
            <div>
                <h1 style="color: blue"> Email heading</h1>
                <a href="https://google.com">Google</a>
                <table>
                    <thead>
                        <tr>
                            <td>s no</td>
                            <td>item</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mobile</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Laptop</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
    `
};

mailer.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log("ERROR SENDING EMAIL", err);
        return;
    }
    console.log("Email Sent successfully | ", info);
})