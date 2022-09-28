<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\CollectionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Auth::routes();

Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home')->middleware('auth');

Route::group(['middleware' => 'auth'], function () {
	Route::get('table-list', function () {
		return view('pages.table_list');
	})->name('table');

	Route::get('typography', function () {
		return view('pages.typography');
	})->name('typography');

	Route::get('icons', function () {
		return view('pages.icons');
	})->name('icons');

	Route::get('map', function () {
		return view('pages.map');
	})->name('map');

	Route::get('notifications', function () {
		return view('pages.notifications');
	})->name('notifications');

	Route::get('rtl-support', function () {
		return view('pages.language');
	})->name('language');

	Route::get('upgrade', function () {
		return view('pages.upgrade');
	})->name('upgrade');
});

Route::group(['middleware' => 'auth'], function () {
	Route::resource('user', 'App\Http\Controllers\UserController', ['except' => ['show']]);
	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'App\Http\Controllers\ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'App\Http\Controllers\ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'App\Http\Controllers\ProfileController@password']);
});

Route::group(['namespace' => '\App\Http\Controllers'], function () {
	Route::post('api/v1/createuser/{locale}',		'PccardusersController@createPccarduser');
	Route::post('api/v1/verifyuser/{locale}',		'PccardusersController@verifyuser');
	Route::post('api/v1/userlogin/{locale}',		'PccardusersController@Pccarduserlogin');
	Route::post('api/v1/generateotp/{locale}',		'PccardusersController@generateOtp');
	Route::post('api/v1/forgotpassword/{locale}', 	'PccardusersController@forgotPassword');
	Route::post('api/v1/changepassword/{locale}',	'PccardusersController@changepassword');
	Route::post('api/v1/editprofile/{locale}',		'PccardusersController@editprofile');
	Route::post('api/v1/postnotification/{locale}',	'PccardusersController@postnotification');
	Route::get('api/v1/getnotification/{locale}',	'PccardusersController@getnotification');
	Route::get('api/v1/userdetails/{locale}',		'PccardusersController@userdetails');
	Route::post('api/v1/searchpeople/{locale}',		'PccardusersController@searchpeople');
	Route::post('api/v1/logout/{locale}',			'PccardusersController@userLogout');
	
	Route::get('api/v1/userdata/{id}/{locale}',					'CreatePostController@userdata');
	Route::post('api/v1/createpost/{locale}',					'CreatePostController@createpost');
	Route::get('api/v1/getpost/{id}/index-paging/{locale}',		'CreatePostController@getpost');
	Route::post('api/v1/getpostbyid/{locale}',					'CreatePostController@getPOstById');
	Route::get('api/v1/mypostlist/{uid}/index-paging/{locale}',	'CreatePostController@mypostlist');
	Route::get('api/v1/mypostlist/{uid}/{locale}',	            'CreatePostController@mypostlist');
	Route::post('api/v1/deletepost/{locale}',					'CreatePostController@deletePost');
	// Route::post('api/v1/searchhashtag/{locale}',				'CreatePostController@searchhashtag');
	Route::post('api/v1/searchbyhashtag/{locale}',				'CreatePostController@searchByhashtag');
	Route::get('api/v1/allpostsmedia/{locale}',					'CreatePostController@allpostsmedia');

	Route::post('api/v1/getgamecardDetail/{locale}',		'CardController@getCardBygameCard');

	Route::post('api/v1/likepost/{locale}',				'LikePostController@likepost');

	Route::post('api/v1/followusers/{locale}',		'FollowPccardUsersController@followusers');
	Route::post('api/v1/unfollow/{locale}',			'FollowPccardUsersController@unfollowUser');
	Route::get('api/v1/followinglist/{locale}',		'FollowPccardUsersController@followinglist');
	Route::get('api/v1/followerlist/{locale}',		'FollowPccardUsersController@followerlist');

	Route::post('api/v1/postcomments/{locale}',		'PostCommentsController@postcomments');
	Route::post('api/v1/getcomments/{locale}',		'PostCommentsController@getcomments');

	Route::post('api/v1/postreport/{locale}',		'ReportPostController@postreport');
	
	Route::post('api/v1/search/{locale}',			'searchController@index');
	Route::post('api/v1/searchGameType/{locale}',	'searchController@searchGameType');
	
	Route::post('api/v1/createstories/{locale}',	'StoriesController@createstories');
	Route::get('api/v1/getstories/{locale}',		'StoriesController@getstories');
	Route::get('api/v1/getsingleuserstory/{locale}','StoriesController@getsingleuserstory');

	Route::get('api/v1/usernotification/{locale}',			'NotificationController@usernotification');
	Route::get('api/v1/getfollowingnotification/{locale}',	'NotificationController@getfollowingnotification');
	
	
	Route::get('api/v1/plans/{locale}',				'Plans@index');


	//===========================================================================USER PROFILE APIS
	Route::post('api/v1/getuserprofile',			'UserController@getProfile');

	//===========================================================================LIVE API URLS
	Route::post('api/v1/saveLiveData/{locale}',		'LiveController@saveRecord');
	Route::post('api/v1/getLiveData/{locale}',		'LiveController@getLiveRecord');
	Route::post('api/v1/saveviewcount/{locale}',	'LiveController@saveViewCount');
	Route::post('api/v1/getviewcount/{locale}',		'LiveController@getViewCount');
	Route::post('api/v1/endLive/{locale}',			'LiveController@endLive');

	//===========================================================================BOOKMARK API URLS
	Route::post('api/v1/postbookmarks/{locale}',	'PostsBookmarksController@postbookmarks');
	Route::get('api/v1/getbookmarks/{locale}',		'PostsBookmarksController@getbookmarks');
	Route::post('api/v1/deletebookmarks/{locale}',	'PostsBookmarksController@deletebookmarks');

	//===========================================================================COLLECTION API URLS
	Route::post('api/v1/createcollection/{locale}',								'CollectionController@createcollection');
	Route::get('api/v1/getcollection/pcuserid/{pcuserid}/index-paging/{locale}','CollectionController@getcollection');
	Route::post('api/v1/deletecollection/{locale}',								'CollectionController@deletecollection');
	Route::post('api/v1/getcollectiondetail/{locale}',							'CollectionController@getCollectionDetail');
	Route::post('api/v1/getcollectionbyid/{locale}',							'CollectionController@getCollectionById');
	

	//===========================================================================PROMOTION LINKS
	Route::post('api/v1/createpromotion/{locale}',		'PromotionController@createPromotion');
	Route::post('api/v1/updatepromotion/{locale}',		'PromotionController@modifyPromotion');
	Route::get('api/v1/promotionlist/{uid}/{locale}',	'PromotionController@getPromotionList');
	Route::get('api/v1/promotiondetail/{pid}/{locale}',	'PromotionController@getPromotionDetail');
	Route::get('api/v1/testApi/{locale}',				'PromotionController@TestApi');
});
