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
exports.BlogSchema = exports.Blog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./category.schema");
const user_schema_1 = require("./user.schema");
let Blog = class Blog {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId, ref: user_schema_1.User.name
    }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Blog.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        require: true,
        trim: true,
        minLength: 10,
        maxLength: 50
    }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        require: true,
        minLength: 2000
    }),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        require: true,
        trim: true,
        maxLength: 200
    }),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        require: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId, ref: category_schema_1.Category.name
    }),
    (0, class_transformer_1.Type)(() => category_schema_1.Category),
    __metadata("design:type", category_schema_1.Category)
], Blog.prototype, "category", void 0);
Blog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Blog);
exports.Blog = Blog;
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
//# sourceMappingURL=blog.schema.js.map