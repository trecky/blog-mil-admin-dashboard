"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var PostController_1 = __importDefault(require("../controllers/PostController"));
var postsRouter = express_1.Router();
var postController = new PostController_1.default();
postsRouter.use(ensureAuthenticated_1.default);
postsRouter.post('/', postController.create);
exports.default = postsRouter;
