"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const google_auth_library_1 = require("google-auth-library");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const configService = new config_1.ConfigService();
const CLIENT_ID = `963922917719-2q0s1r675fd2ik0ej10i02i645gipbou.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04ftbTmv-mzRICgYIARAAGAQSNwF-L9IrxnnytNEdhCemVLhPFsuxuDNFiPjZ_iBsumXTMLqDpbFMfSnHw1HkTnkGxA6HTXFie8s`;
const SENDER_MAIL = `kobietdoiten@gmail.com`;
const sendEmail = async (to, url, txt) => {
    console.log(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, SENDER_MAIL);
    const oAuth2Client = new google_auth_library_1.OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        const access_token = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: SENDER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
            },
        });
        const mailOptions = {
            from: SENDER_MAIL,
            to: to,
            subject: "BlogDev",
            html: `
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the QT Blog.</h2>
                <p>Congratulations! You're almost set to start using QT Blog.
                    Just click the button below to validate your email address.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
                </div>
                `,
        };
        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error.message);
    }
};
exports.default = sendEmail;
//# sourceMappingURL=sendMail.js.map