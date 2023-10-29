"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlogs = exports.getBlogs = exports.getOneblog = exports.getUserBlogs = exports.createBlogs = void 0;
const validation_1 = require("../utils/validation");
const blogmodel_1 = require("../model/blogmodel");
const validation_2 = require("../utils/validation");
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
const createBlogs = async (req, res) => {
    try {
        // const verified = req.user;
        // console.log("verified",verified,req.user);
        const id = (0, uuid_1.v4)();
        const validateResult = validation_2.createBlogSchema.validate(req.body);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }
        const blogRecord = await blogmodel_1.BlogInstance.create({
            id,
            ...req.body,
            // author: verified.id,
        });
        return res
            .status(200)
            .json({ msg: "blog created successfully", blogRecord });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createBlogs = createBlogs;
const getUserBlogs = async (req, res) => {
    try {
        const id = req.user;
        console.log(req.user);
        const blogUser = await user_1.UserInstance.findOne({
            where: { id: id }
        });
        console.log(blogUser?.dataValues.userName);
        const username = blogUser?.dataValues.userName;
        const blog = await blogmodel_1.BlogInstance.findAndCountAll({
            where: { user: username },
            order: [['createdAt', 'DESC']]
            // include: [{
            //   model: UserInstance,as: "users",
            // }],
        });
        console.log(blog.rows);
        return res.status(200).json({
            msg: "You have successfully retrieved all blogs",
            count: blog.count,
            blogUser,
            product: blog.rows,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserBlogs = getUserBlogs;
const getOneblog = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const blogId = id;
        const blog = await blogmodel_1.BlogInstance.findOne({
            where: { id: blogId },
            // include: [{
            //   model: UserInstance,as: "users",
            // }],
        });
        // console.log(blog);
        return res.status(200).json({
            msg: " single Blog fetched successfully",
            bloglist: blog,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getOneblog = getOneblog;
const getBlogs = async (req, res) => {
    try {
        const limitQueryParam = req.query.limit;
        const limit = limitQueryParam ? parseInt(limitQueryParam, 10) : undefined;
        const offsetQueryParam = req.query.offset;
        const offset = offsetQueryParam
            ? parseInt(offsetQueryParam, 10)
            : undefined;
        const getAllBlogs = await blogmodel_1.BlogInstance.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all blogs",
            count: getAllBlogs.count,
            product: getAllBlogs.rows,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getBlogs = getBlogs;
const updateBlogs = async (req, res) => {
    try {
        // Extract the parameters from req.body
        const { title, coverImage, content, blogcategory, user, isActive } = req.body;
        // Extract the id parameter from req.params
        const { id } = req.params;
        // Validate with Joi
        const validateResult = validation_1.updateBlogSchema.validate(req.body);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }
        const updateBlog = await blogmodel_1.BlogInstance.findOne({
            where: { id: id },
        });
        if (!updateBlog) {
            return res.status(400).json({
                error: "Cannot find Blog",
            });
        }
        // Update the record with the provided values
        const updateRecord = await updateBlog.update({
            title,
            coverImage,
            content,
            blogcategory,
            user,
            isActive,
        });
        return res.status(200).json({
            msg: "Blog updated successfully",
            updateRecord,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateBlogs = updateBlogs;
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await blogmodel_1.BlogInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                error: "Cannot find existing blog",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "You have successfully deleted your Blogs",
            deletedRecord,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteBlog = deleteBlog;
