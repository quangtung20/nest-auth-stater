"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./modules/app.module");
const morgan = require("morgan");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true
    });
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 5000;
    await app.listen(port)
        .then(() => {
        logger.log(`Application is running on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map