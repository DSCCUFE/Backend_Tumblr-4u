
/* ================ /// <==> Variables Declaration <==> /// ================ */
const {StatusCodes} = require('http-status-codes');
const schema = require('../../../Model/model');

/* =========== /// <==> End <==> ===========*/


/* ==================== /// <==> Blog Functions <==> /// ==================== */

/**
 *
 * @function
 * @name blockBlog
 * @description this function blocks the blog whose id
 *              sent in the body from the blog whose id in params
 * @param {String} blogId - The id of the blog who blocks the other blog
 * @param {String} blockedBlogId - The id of the blog to be blocked
 *
 * @returns {Object} - The blocked blog and null if not found
 */


const blockBlog = async (req) => {
  console.log(req.params);
  try {
    const blogId = req.params.blogId;
    const blockedBlogId = req.body.blockedBlogId;

    const blockedBlog = await schema.blogs.findOne({'_id': blockedBlogId});
    if (blockedBlog) {
      const blog = await schema.blogs.findOne({'_id': blogId});
      console.log(blog._id);
      blog.blockedBlogs.push(blockedBlogId);
      blog.save();
      return blockedBlog;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};
/* -------- <---> Unfollow Blog <---> ------- */ // *** <===> Done <===>  *** //


/**
 *
 * @function
 * @name unblockBlog
 * @description this function remove the blog whose id sent in
 *              the body from blocked blogs of the blog whose id in params
 * @param {String} blogId - The id of the blog who unblocks the other blog
 * @param {String} unblockedBlogId - The id of the blog to be unblocked
 *
 * @returns {Object} - The unblocked blog and null if not found
 */


const unblockBlog = async (req) => {
  console.log(req.params);
  try {
    const blogId = req.params.blogId;
    const unblockedBlogId= req.body.unblockedBlogId;

    const unblockedBlog = await schema.blogs.findOne({'_id': unblockedBlogId});
    if (unblockedBlog) {
      const blog = await schema.blogs.findOne({'_id': blogId});
      blog.blockedBlogs.pull(unblockedBlogId);
      blog.save();
      return unblockedBlog;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};


/**
 *
 * @function
 * @name editBlog
 * @description    -  It retrieves a blog given its id
 * @param {String} blogId  - id of the blog
 * @param {String} title
 * @param {String} accent
 * @param {String} name
 * @param {String} password
 * @param {String} headerImage
 * @param {String} background
 * @param {String} avatar
 * @param {String} theme
 * @param {String} description
 * @return {Object} - A blog object
 */


const editBlog = async (req) => {
  try {
    const blogId = req.params.blogId;
    const accent = req.body.accent;
    const name = req.body.name;
    const headerImage = req.body.headerImage;
    const avatar = req.body.avatar;
    const title = req.body.title;
    const background = req.body.background;
    const password = req.body.password;
    const theme = req.body.theme;
    const description = req.body.description;

    let message = 'OK';

    const blog = await schema.blogs.findOne({'_id': blogId});
    if (blog) {
      if (password) {
        blog.password = password;
      }
      if (theme) {
        blog.theme = theme;
      }
      if (description) {
        blog.description = description;
      }
      if (accent) {
        blog.accent = accent;
      }
      if (headerImage) {
        blog.headerImage = headerImage;
      }
      if (background) {
        blog.background = background;
      }
      if (avatar) {
        blog.avatar = avatar;
      }
      if (title) {
        blog.title = title;
      }
      if (name) {
        const anotherBlog = await schema.blogs.findOne({'name': name});

        if (!anotherBlog || anotherBlog._id == blogId) {
          if (blog.isPrimary) {
            const user = await schema.users
                .findOneAndUpdate({'name': blog.name});
            user.name = name;
          }
          blog.name = name;
        } else {
          message = 'URL is not available';
        }
      }
      blog.save();
      if (message === 'OK') {
        console.log(blog);

        return blog;
      } else {
        return message;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * @function
 * @name retrieveBlog
 * @description    -  It retrieves a blog given its id
 * @param {String} blogName  - name of the blog
 * @return {Object} - A blog object
 */

const retrieveBlog = async (blogName) => {
  try {
    const blog = await schema.blogs.findOne({'name': blogName});
    if (blog) {
      return blog;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* =========== /// <==> End <==> ===========*/

/* ================= /// <==> Export User Functions <==> /// ================ */

module.exports = {
  blockBlog,
  unblockBlog,
  editBlog,
  retrieveBlog,
};
/* =========== /// <==> End <==> ===========*/
