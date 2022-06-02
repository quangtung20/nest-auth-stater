"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_auth_library_1 = require("google-auth-library");
const nodemailer = require("nodemailer");
let ShareService = class ShareService {
    constructor(configService) {
        this.configService = configService;
    }
    async test() {
        console.log();
    }
    async sendEmail(to, url, txt) {
        const CLIENT_ID = this.configService.get('MAIL_CLIENT_ID');
        const CLIENT_SECRET = this.configService.get('MAIL_CLIENT_SECRET');
        const REFRESH_TOKEN = this.configService.get('MAIL_REFRESH_TOKEN');
        const SENDER_MAIL = this.configService.get('SENDER_EMAIL_ADDRESS');
        const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
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
    }
    ;
};
ShareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=share.service.js.map