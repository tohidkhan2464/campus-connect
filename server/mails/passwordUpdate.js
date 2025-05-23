exports.passwordUpdated = (email, name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Update Confirmation</title>
        <style>
            body{
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .logo{
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message{
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .body{
                font-size: 16px;
                margin-bottom: 20px;
            }

            .support{
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight{
                font-weight: bold;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <img class="logo" src="https://github.com/tohidkhan2464/tohidkhan2464/blob/main/images/logo.svg" alt="Campus Connect Logo" >
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.</p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">
                If you have any questions or need futher assistance, please feel free to reach us at
                <a href="mailto:cannon.khan786@gmail.com">info@campusconnect.com</a>. We are here to help!
            </div>
        </div>
    </body>
    </html>`;
};
