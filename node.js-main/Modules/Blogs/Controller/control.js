
/* ================ /// <==> Variables Declaration <==> /// ================ */
const {StatusCodes} = require('http-status-codes');
const {blogs} = require('../../../Model/model');

/* =========== /// <==> End <==> ===========*/


/* ==================== /// <==> Blog Functions <==> /// ==================== */


/**
 *
 * @function
 * @name blockBlog
 * @description this function blocks the blog whose id
 *              sent in the body from the blog whose id in params
 * @param {Object} req - Holds the blogId in
 *                       params and the blockedBlogId in body
 * @param {Object} res - Holds the res
 *                       status and message based on the status.
 *
 * @returns res status and message or error massege in case of errors.
 */


const blockBlog = async (req, res) => {
  console.log(req.params);

  try {
    const blogId = req.params.blogId;
    const blockedBlogId = req.body.blockedBlogId;

    await blogs.findOne({'_id': blockedBlogId},
        function(err, blockedBlog) {
        // if (err) return handleError(err);
          if (blockedBlog) {
            blogs.findOne({'_id': blogId},
                'blockedBlogs',
                function(err, blog) {
                  if (err) return handleError(err);
                  blog.blockedBlogs.push(blockedBlogId);
                  blog.save();
                  res.status(StatusCodes.OK).json({
                    'meta': {
                      'status': 200,
                      'msg': 'OK',
                    },

                    'res': {
                      'message': 'Blog blocked Successfully',
                      'data': '',
                    },
                  });
                });
          } else {
            res.status(StatusCodes.NOT_FOUND).json({
              'meta': {
                'status': 404,
                'msg': 'BAD_REQUEST',
              },

              'res': {
                'error': 'Blog NOT FOUND',
                'data': '',
              },
            });
          }
        }).clone().catch(function(err) {
      console.log(err);
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      'meta': {
        'status': 500,
        'msg': 'INTERNAL_SERVER_ERROR',
      },

      'res': {
        'error': 'Error In blockBlog Function',
        'data': '',
      },
    });
  }
};
/* -------- <---> Unfollow Blog <---> ------- */ // *** <===> Done <===>  *** //


/**
 *
 * @function
 * @name unblockBlog
 * @description this function remove the blog whose id sent in
 *              the body from blocked blogs of the blog whose id in params
 * @param {Object} req - Holds the blogId in params
 *                       and the unblockedBlogId in body
 * @param {Object} res - Holds the res status and
 *                       message based on the status.
 *
 * @returns res status and message or error massege in case of errors.
 */


const unblockBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const unblockedBlogId = req.body.unblockedBlogId;

    await blogs.findOne({'_id': unblockedBlogId});
    if (unblockedBlog) {
      blogs.findOne({'_id': blogId},
          'blockedBlogs');
      blog.blockedBlogs.pull(unblockedBlogId);
      blog.save();
      res.status(StatusCodes.OK).json({
        'meta': {
          'status': 200,
          'msg': 'OK',
        },

        'res': {
          'message': 'Blog unblocked Successfully',
          'data': '',
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        'meta': {
          'status': 404,
          'msg': 'BAD_REQUEST',
        },

        'res': {
          'error': 'Blog NOT FOUND',
          'data': '',
        },
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      'meta': {
        'status': 500,
        'msg': 'INTERNAL_SERVER_ERROR',
      },

      'res': {
        'error': 'Error In unblockBlog Function',
        'data': '',
      },
    });
  }
};


/* =========== /// <==> End <==> ===========*/

/* ================= /// <==> Export User Functions <==> /// ================ */

module.exports = {
  blockBlog,
  unblockBlog,
};
/* =========== /// <==> End <==> ===========*/
