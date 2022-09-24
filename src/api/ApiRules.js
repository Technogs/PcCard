class Constant {
  static BASE_URL = 'https://bdztl.com/pccardapp/api/v1/';
  // static BASE_URL = 'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/pccard/';
  // static BASE_URL="http://112.196.78.27/pccardapp/public/pccard/"

  static URL_checkUnique = Constant.BASE_URL + 'verifyuser';
  static URL_signup = Constant.BASE_URL + 'createuser';
  static URL_login = Constant.BASE_URL + 'userlogin/';
  static URL_generateOtp = Constant.BASE_URL + 'generateotp';
  static URL_forgotPassword = Constant.BASE_URL + 'forgotpassword';
  static URL_editProfile = Constant.BASE_URL + 'editprofile';
  static URL_userDetails = Constant.BASE_URL + 'userdetails';
  static URL_changePassword = Constant.BASE_URL + 'changepassword';

  static URL_getPostData = Constant.BASE_URL + 'userdata/';
  static URL_createPost = Constant.BASE_URL + 'createpost';
  static URL_deletePost = Constant.BASE_URL + 'deletepost/';
  static URL_getCardData = Constant.BASE_URL + 'getgamecardDetail/';
  static URL_getPosts = Constant.BASE_URL + 'getpost/';
  static URL_likePost = Constant.BASE_URL + 'likepost';
  static URL_getComments = Constant.BASE_URL + 'getcomments';
  static URL_addComments = Constant.BASE_URL + 'postcomments';
  static URL_followUsers = Constant.BASE_URL + 'followusers';
  static URL_unfollowUsers = Constant.BASE_URL + 'unfollow';
  static URL_reportPost = Constant.BASE_URL + 'postreport';
  static URL_getNotificationStatus = Constant.BASE_URL + 'getnotification';
  static URL_saveNotificationStatus = Constant.BASE_URL + 'postnotification';
  static URL_search = Constant.BASE_URL + 'search';
  static URL_searchGameType = Constant.BASE_URL + 'searchGameType/';
  static URL_getHashtagData = Constant.BASE_URL + 'searchbyhashtag/';
  static URL_getStories = Constant.BASE_URL + 'getstories?pcuserid=';
  static URL_createStories = Constant.BASE_URL + 'createstories';
  static URL_getNotification = Constant.BASE_URL + 'usernotification';
  static URL_getFollowingNotification = Constant.BASE_URL + 'getfollowingnotification';
  static URL_addBookmark = Constant.BASE_URL + 'postbookmarks/';
  static URL_getBookmark = Constant.BASE_URL + 'getbookmarks';
  static URL_deleteBookmark = Constant.BASE_URL + 'deletebookmarks/';
  static URL_getFollowingList = Constant.BASE_URL + 'followinglist/';
  static URL_getFollowerList = Constant.BASE_URL + 'followerlist/';
  static URL_getPostImages = Constant.BASE_URL + 'allpostsmedia';
  static URL_createCollection = Constant.BASE_URL + 'createcollection';
  static URL_collectionDetail = Constant.BASE_URL + 'getcollectiondetail/';
  static URL_getCollectionById = Constant.BASE_URL + 'getcollectionbyid/';
  static URL_getPlans = Constant.BASE_URL + 'plans';
  static URL_getPostsForPromotion = Constant.BASE_URL + 'mypostlist/';
  static URL_getPromotionList = Constant.BASE_URL + 'promotionlist/';
  static URL_createPromotion = Constant.BASE_URL + 'createpromotion';
  static URL_promotionDetail = Constant.BASE_URL + 'promotiondetail/';
  static URL_updatePromotion = Constant.BASE_URL + 'updatepromotion';
  static URL_saveLiveData = Constant.BASE_URL + 'saveLiveData';
  static URL_endLive = Constant.BASE_URL + 'endLive';
  static URL_saveLiveCount = Constant.BASE_URL + 'saveviewcount/';
  static URL_getLiveCount = Constant.BASE_URL + 'getviewcount/';

  static URL_getToken = 'https://bdztl.com/pccardapp/agoraToken.php?cnam=';

  static URL_imageUrl = '';
}

var WebServices = {
  formService: async function (url, formBody) {
    try {
      console.log('formBody', formBody);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: formBody,
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.log(err);
    }
  },
  applicationService: async function (url, body) {
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    const text = await response.text();
    const response_1 = text;
    const jsonRes = JSON.parse(response_1);
    return jsonRes;
  },
  get: async function (url) {
    const response = await fetch(url);
    const text = await response.text();
    const response_1 = text;
    const jsonRes = JSON.parse(response_1);
    return jsonRes;
  },
  put: async function (url, body) {
    var formdata = JSON.stringify(body);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formdata,
    });
    const text = await response.text();
    const response_1 = text;
    const jsonRes = JSON.parse(response_1);
    return jsonRes;
  },
};

// var WebServices = {
//   formService: function(url, formBody) {
//     return fetch(url,{
//       method: 'POST',
//       headers: {
//         'X-API-KEY': 'AppAdmin@pc-card.com',
//         'Content-Type': 'multipart/form-data'
//       },
//       body: formBody
//     })
//     .then(response => response.json())
//     .then((responseJson) => { return responseJson })
//     .catch(err => {
//       console.log(err)
//     })
//   },
//   applicationService: function(url, body) {
//     var formBody = [];
//     for (var property in body) {
//       var encodedKey = encodeURIComponent(property);
//       var encodedValue = encodeURIComponent(body[property]);
//       formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
//     return fetch(url, {
//       method: 'POST',
//       headers: {
//         'X-API-KEY': 'AppAdmin@pc-card.com',
//         'Accept':'application/json; charset=utf-8',
//         'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
//       },
//       body: formBody
//     })
//     .then(response => response.text())
//     .then((text) => {
//       return text;
//     })
//     .then(response => JSON.parse(response))
//     .then((jsonRes) => { return jsonRes });
//   }
// }

module.exports = {
  Constant,
  WebServices,
};
