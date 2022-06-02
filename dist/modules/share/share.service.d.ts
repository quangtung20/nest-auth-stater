import { ConfigService } from '@nestjs/config';
export declare class ShareService {
    private configService;
    constructor(configService: ConfigService);
    test(): Promise<void>;
    sendEmail(to: string, url: string, txt: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
