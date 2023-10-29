"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controller/blogController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/get-blogs', blogController_1.getBlogs);
router.get('/get-user-blogs', auth_1.auth, blogController_1.getUserBlogs);
router.get('/get-blogs/:id', blogController_1.getOneblog);
router.post('/create', auth_1.auth, blogController_1.createBlogs);
router.patch('/update/:id', blogController_1.updateBlogs);
router.delete('/delete/:id', blogController_1.deleteBlog);
exports.default = router;
