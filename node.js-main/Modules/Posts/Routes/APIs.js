//////////////////////////////////////////////////////
/// <==> /// This File Contains Post APIs /// <==> ///
//////////////////////////////////////////////////////

/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const express = require('express');
const router = express.Router();
const postFunctions = require('../Controller/control');
const postJoi = require('../Joi/joi');
const ValidateRequest = require('../../../Common/Middlewares/requestValidation');
const isAuthorized = require('../../../Common/Middlewares/isAuthorized');
const postEndPoints = require('../endPoints');
/* =========== /// <==> End <==> ===========*/

/* ====================== /// <==> User APIs <==> /// ====================== */

/* ----------- <---> Create Post <---> ----------- */
router.post('/:blogId/posts/create_post', ValidateRequest(postJoi.createPostValidations), isAuthorized(postEndPoints.createPost), postFunctions.createPost);

/* ----------- <---> Edit Post <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/edit_post', ValidateRequest(postJoi.editPostValidations), isAuthorized(postEndPoints.editPost), postFunctions.editPost);

/* ----------- <---> Delete Post <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/delete_post', ValidateRequest(postJoi.deletePostValidations), isAuthorized(postEndPoints.deletePost), postFunctions.deletePost);

/* ----------- <---> Like Post <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/like_post', ValidateRequest(postJoi.likePostValidations), isAuthorized(postEndPoints.likePost), postFunctions.likePost);

/* ----------- <---> Comment Post <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/comment_post', ValidateRequest(postJoi.commentPostValidations), isAuthorized(postEndPoints.commentPost), postFunctions.commentPost);

/* ----------- <---> Share Post With a Friend <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/share_with', ValidateRequest(postJoi.shareWithValidations), isAuthorized(postEndPoints.shareWith), postFunctions.shareWith);

/* ----------- <---> Reblog Post <---> ----------- */ // *** <===> Done <===>  *** //
router.patch('/:blogId/posts/:postId/reblog_post', ValidateRequest(postJoi.reblogPostValidations), isAuthorized(postEndPoints.reblogPost), postFunctions.reblogPost);

// /* ----------- <---> Get My Posts <---> ----------- */ // *** <===> Done <===>  *** //
// router.get('/Get_Posts', ValidateRequest(postJoi.GetPostsValidations), isAuthorized(postEndPoints.Get_Posts), postFunctions.Get_Posts);

// /* ----------- <---> Get All Posts <---> ----------- */ // *** <===> Done <===>  *** //
// router.get('/Get_All_Posts', ValidateRequest(postJoi.GetPostsValidations), isAuthorized(postEndPoints.Get_All_Posts), postFunctions.Get_All_Posts);

// /* ----------- <---> Block Posts <---> ----------- */ // *** <===> Done <===>  *** //
// router.patch('/Block_Post', ValidateRequest(postJoi.BlockPostValidations), isAuthorized(postEndPoints.Block_Post), postFunctions.Block_Post);

/* =========== /// <==> End <==> ===========*/

/* ====================== /// <==> Export User APIs <==> /// ====================== */
module.exports = router;
/* =========== /// <==> End <==> ===========*/