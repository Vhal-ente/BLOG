import { Request, Response } from "express";
import { updateBlogSchema } from "../utils/validation";
import { BlogInstance } from "../model/blogmodel";
import { createBlogSchema } from "../utils/validation";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/user";

export const createBlogs = async (req: Request | any, res: Response) => {
  try {
    // const verified = req.user;
    // console.log("verified",verified,req.user);
    const id = uuidv4();

    const validateResult = createBlogSchema.validate(req.body);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ error: validateResult.error.details[0].message });
    }
    const blogRecord = await BlogInstance.create({
      id,
      ...req.body,
      // author: verified.id,
    });
    return res
      .status(200)
      .json({ msg: "blog created successfully", blogRecord });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlogs = async (req: Request | any, res: Response) => {
  try {
    const id = req.user;
    console.log(req.user)
    const blogUser: UserInstance | null = await UserInstance.findOne({
      where:{id:id}})
    
    console.log(blogUser?.dataValues.userName)
    const username = blogUser?.dataValues.userName
    const blog = await BlogInstance.findAndCountAll({
      where: { user: username },
      order: [['createdAt', 'DESC']]
      // include: [{
      //   model: UserInstance,as: "users",
      // }],
    });
    console.log(blog.rows)
    return res.status(200).json({
      msg: "You have successfully retrieved all blogs",
      count: blog.count,
      blogUser,
      product: blog.rows,
    });
  } catch (error) {
    console.log(error)
  }
}

export const getOneblog = async (req: Request | any, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const blogId = id;

    const blog = await BlogInstance.findOne({
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const limitQueryParam = req.query.limit as string | undefined;
    const limit = limitQueryParam ? parseInt(limitQueryParam, 10) : undefined;

    const offsetQueryParam = req.query.offset as string | undefined;
    const offset = offsetQueryParam
      ? parseInt(offsetQueryParam, 10)
      : undefined;

    const getAllBlogs = await BlogInstance.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      msg: "You have successfully retrieved all blogs",
      count: getAllBlogs.count,
      product: getAllBlogs.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBlogs = async (req: Request, res: Response) => {
  try {
    // Extract the parameters from req.body
    const { title, coverImage, content, blogcategory, user, isActive } =
      req.body;

    // Extract the id parameter from req.params
    const { id } = req.params;

    // Validate with Joi
    const validateResult = updateBlogSchema.validate(req.body);

    if (validateResult.error) {
      return res
        .status(400)
        .json({ error: validateResult.error.details[0].message });
    }

    const updateBlog = await BlogInstance.findOne({
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await BlogInstance.findOne({ where: { id } });

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
  } catch (err) {
    console.log(err);
  }
};
