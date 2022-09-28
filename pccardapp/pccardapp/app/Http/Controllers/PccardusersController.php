<?php

namespace App\Http\Controllers;
use App\Models\Pccardusers;
use App\Models\FollowPccardUsers;
use App\Models\LikePost;
use App\Models\PostComments;
use App\Models\PostsBookmarks;
use App\Models\Collection;
use App\Models\Media;

use App\Models\EnergyType;
use App\Models\Rarete;
use App\Models\Trainer;
use App\Models\Types;
use App\Models\CardGameModel;
use App\Models\BaseballCardTypeModel;
use App\Models\BaseballTeamModel;
use App\Models\HockeyTeamModel;
use App\Models\BasketballCardTypeModel;
use App\Models\BasketballTeamModel;
use App\Models\MagicCardTypeModel;
use App\Models\MagicTeam_Model;
use App\Models\SoccerCardType_Model;
use App\Models\SoccerTeam_Model;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use DB;




class PccardusersController extends Controller
{

    public function userLogout(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'uid' => 'required',
		];
       
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('userAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}
        $uid = $request->uid ?? ''; 
           
        try{
            $userData['device_token'] = '';
            $userData = Pccardusers::where('id', $uid)->update($userData);
            
            $response["message"] = trans('userAlert.u_logout_success');//"User logout successfully";
            $response["Pccarduser"] = $userData;
            $response["success"] = 1;
            return response()->json($response);
        }catch(Exception $e){
            $response["message"] = trans('userAlert.O_failed');//"Operation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function createPccarduser(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'username' => 'required|string|min:3|max:255',
			'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:3|max:255',
            'device_type' => 'required|boolean',
            'device_token' => 'required|string|min:3|max:255',
		];
       
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('userAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            $data = $request->all(); 
            
            $userCount = Pccardusers::where('email', $data['email']);
            if ($userCount->count()) {
                $response["message"] = trans('userAlert.u_email_exist');// "User email already Exist";
                $response["success"] = 0;
                return response()->json($response);
            } else {
                    $data = $request->input();
                    
                        try{
                            $Pccarduser = new Pccardusers;
                            $Pccarduser->name = "";
                            $Pccarduser->username = $request->input('username');
                            $Pccarduser->email = $request->input('email');
                            $password = md5($request->input('password'));
                            $Pccarduser->password = $password;
                            if($request->hasFile('profilePic')) {
                                $file = $request->file('profilePic');
                                $extension = $file->getClientOriginalExtension(); // you can also use file name
                                $fileName = time().'.'.$extension;
                                $path = public_path().'/images';
                                $base_path = url('/').'/public/images'; 
                                $image_path = $base_path. '/' . $fileName;
                                $uplaod = $file->move($path,$fileName);
                                $Pccarduser->profilePic = $image_path;
                            }else{
                                $base_path = url('/').'/public/images'; 
                                $image_path = $base_path. '/' .'1630561524.jpg';
                                $Pccarduser->profilePic = $image_path;
                            }

                            // $Pccarduser->website = $request->input('website');
                            // $Pccarduser->bio = $request->input('bio');
                            // $Pccarduser->pushNotification = $request->input('pushNotification');
                            // $Pccarduser->newPostNotification = $request->input('newPostNotification');
                            // $Pccarduser->connectionLiveNotification = $request->input('connectionLiveNotification');
                            // $Pccarduser->friendRequestNotification = $request->input('friendRequestNotification');
                            // $Pccarduser->Is_Active = $request->input('Is_Active');
                            // $Pccarduser->validationCode = $request->input('validationCode');
                            $Pccarduser->device_type = $request->input('device_type');
                            $Pccarduser->device_token = $request->input('device_token'); 
                            
                            $Pccarduser->save();
                            $userId = $Pccarduser->id;
                            $userData = Pccardusers::where('id', $userId)->first(['id','username','email','profilePic','website','bio','pushNotification','newPostNotification','connectionLiveNotification','friendRequestNotification']);
                            
                            $response["message"] = trans('userAlert.u_account_success');//"User account created successfully";
                            $response["Pccarduser"] = $userData;
                            $response["success"] = 1;
                            return response()->json($response);
                        }catch(Exception $e){
                            $response["message"] = trans('userAlert.O_failed');//"Operation failed";
                            $response["success"] = 0;
                            return response()->json($response);
                        }
            }

        }
            
    }

    public function verifyuser(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
        $emailCount = Pccardusers::where('email', $data['email']);
        $usernameCount = Pccardusers::where('username', $data['username']);
        if ($emailCount->count() || $usernameCount->count() ) {
            $response["message"] = trans('userAlert.u_exist');//"User exist";
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('userAlert.u_n_exist');//"User not exist";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function Pccarduserlogin(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all();
        $email = $data['email'];
        $password = md5($data['password']);
        $results = Pccardusers::where('email', '=', $email)->where('password', '=', $password)->get();

        if ($results->count()) {
            $device_type = $data['device_type'];
            $device_token = $data['device_token'];
            Pccardusers::where(['email'=>$email,'password'=>$password])->update(['device_type'=> $device_type,'device_token'=> $device_token]);
            $results = Pccardusers::where('email', '=', $email)->where('password', '=', $password)->get();
            $response["message"] = trans('userAlert.u_login');//"User login successfully";
            $response["success"] = 1;
            $response["Pccarduserlogin"] = $results;
            return response()->json($response);
        } else {
            $response["message"] = trans('userAlert.u_n_login');//"User not login successfully";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    function generateOtp(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
        $email = $data['email'];
        $results = Pccardusers::where('email', '=', $email)->get();
        if ($results->count()) { 
            $PccarduserId = $results->map(function ($user) {
            return collect($user->toArray())
                ->only(['id'])
                ->all();
            });
            $randomNumber = random_int(1000, 9999);
            $refine = $PccarduserId["0"];
            $refine["code"] = $randomNumber;
            $response["generateOtp"] = $refine;
            $response["message"] = trans('userAlert.otp_genrate');//"Otp is generated";
            $response["success"] = 1;
            return response()->json($response);
        }else {
            $response["message"] = trans('userAlert.otp_n_genrate');//"Otp is not generated";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    function forgotpassword(Request $request,$locale){ 
        app()->setLocale($locale);    
        $data = $request->all();
        $userid = $data['userid'];
        $newpassword = md5($data['newpassword']);
        $results = Pccardusers::where('id', '=', $userid)->get();
            if ($results->count()) {
                Pccardusers::where(['id'=>$userid])->update(['password'=> $newpassword]);
                $response["message"] = trans('userAlert.p_changed');//"Password is changed.";
                $response["success"] = 1;
                return response()->json($response);
            }else {
                $response["message"] = trans('userAlert.p_n_changed');//"Password is not changed.";
                $response["success"] = 0;
                return response()->json($response);
            }

    }


    function changepassword(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
        $userid = $data['userid'];
        $oldpassword = md5($data['oldpassword']);
        $newpassword = md5($data['newpassword']);
        $results = Pccardusers::where('id', '=', $userid)->where('password', '=', $oldpassword)->get();
        if ($results->count()) {
            Pccardusers::where(['id'=>$userid])->update(['password'=> $newpassword]);
            $response["message"] = trans('userAlert.p_changed');//"Password is changed.";
            $response["success"] = 1;
            return response()->json($response);
        }else {
            $response["message"] = trans('userAlert.o_p_n_correct');//"Old Password is not correct.";
            $response["success"] = 0;
            return response()->json($response);
        }

    }

    function editprofile(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
        $id = $data['id'];
        $name = $data['name']??'';
        $username = $data['username'];
        $email = $data['email'];
        $website = $data['website']??'';
        $bio = $data['bio']??'';

        if($request->hasFile('profilePic')) {
            $file = $request->file('profilePic');
            $extension = $file->getClientOriginalExtension(); // you can also use file name
            $fileName = time().'.'.$extension;
            $path = public_path().'/images';
            $base_path = url('/').'/images'; 
            $image_path = $base_path. '/' . $fileName; 
            $uplaod = $file->move($path,$fileName);
            $profilePic = $image_path;
        }

        $results = Pccardusers::where('id', $id)->first(['id','username','email','profilePic','website','bio','pushNotification','newPostNotification','connectionLiveNotification','friendRequestNotification']);
        if ($results->count()) {
            if($request->hasFile('profilePic')) {
                Pccardusers::where(['id'=>$id])->update(['name'=> $name,'username'=> $username,'email'=> $email,'website'=> $website,'bio'=> $bio,'profilePic'=> $profilePic]);
            }else {
                Pccardusers::where(['id'=>$id])->update(['name'=> $name,'username'=> $username,'email'=> $email,'website'=> $website,'bio'=> $bio]);
            }
            $results = Pccardusers::where('id', $id)->first(['id','name','username','email','profilePic','website','bio','pushNotification','newPostNotification','connectionLiveNotification','friendRequestNotification']);
            $response["editprofiledata"] = $results;
            $response["message"] = trans('userAlert.profile_update');//"Your profile has updated successfully.";
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('userAlert.profile_n_update');//"Your profile has not updated.";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function postnotification(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
        $id = $data['id'];
        $pushNotification = $data['pushNotification'];
        $newPostNotification = $data['newPostNotification'];
        $connectionLiveNotification = $data['connectionLiveNotification'];
        $friendRequestNotification = $data['friendRequestNotification'];
        $results = Pccardusers::where('id', '=', $id)->get();
        if ($results->count()) {
            Pccardusers::where(['id'=>$id])->update(['pushNotification'=> $pushNotification,'newPostNotification'=> $newPostNotification,'connectionLiveNotification'=> $connectionLiveNotification,'friendRequestNotification'=> $friendRequestNotification]);
            $response["message"] = trans('userAlert.notification_update');//"The profile notification has updated successfully.";
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('userAlert.notification_n_update');//"The profile notification has not updated.";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function getnotification(Request $request,$locale){
        app()->setLocale($locale);
        $id = $request->id;
        $results = Pccardusers::where('id', '=', $id)->get();

        if ($results->count()) {
            $id = $request->id;
            $results = Pccardusers::select('pushNotification','newPostNotification','connectionLiveNotification','friendRequestNotification')->where('id', $id)->get();
            $response["getnotification"] = $results;
            $response["message"] = trans('userAlert.get_noti_success');//"Get notification successfully.";
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('userAlert.get_noti_n_success');//"Get notification unsuccessful.";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function userdetails(Request $request,$locale){

        app()->setLocale($locale);
        $id = $request->id;
        $results = Pccardusers::where('id', '=', $id)->first();
        if ($results->count()) {
            $id = $request->id;
            $selfId = $request->selfId;
            $results = Pccardusers::where('id', '=', $id)->first();
            $Followers = FollowPccardUsers::where('following_pcuserid', '=', $id)->get();
            $Followings = FollowPccardUsers::where('pcuserid', '=', $id)->get();
            $results->isFollow = "";
            $results->isFollow = FollowPccardUsers::where('pcuserid', '=',$selfId)->where('following_pcuserid', '=', $id)->count();
            $pcuserposts = DB::table('create_posts')
            ->where('createdBy', '=',$id)
            ->orderBy('create_posts.updated_at', 'DESC') 
            ->whereNOTIn('create_posts.id',function($query) use ($id){
            $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$id);
            })->paginate(10);
        
            $res = [];
            foreach($pcuserposts as $row){
                $createdBy = $row->createdBy;
                $postId = $row->id;
                $row->postMedia = Media::where('postid','=',$postId)->get();
                $post_likes = LikePost::where('postid', '=', $postId)->get();
                
                $post_comments = PostComments::where('postid', '=', $postId)->get();
                $follow_user = FollowPccardUsers::where('pcuserid', '=', $id)->where('following_pcuserid', '=',$createdBy)->get();
                $post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$id)->get();
                $row->isBookmarked = PostsBookmarks::where('pcuserid','=',$selfId)->where('postid','=',$postId)->count();
                $row->follow_user = $follow_user->count(); 
                $row->post_likes = $post_likes->count();
                $row->likersImage = LikePost::with(['userImages' => function ($query) {
                    $query->select('id','profilePic');
                }])->where('postid', '=', $postId)->latest()->take(4)->get();
                $row->post_comments = $post_comments->count();
                $row->user = Pccardusers::where('id', '=', $createdBy)->first();
                $row->post_liked_by_user = $post_liked_by_user->count();

                $gameCardId = $row->cardGame;
                $row->cardGame = CardGameModel::select('id','gameName','gameNameFr')->find($row->cardGame);
                 switch ($gameCardId) {
                    case 1:
                        
                        $row->cardType = BaseballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = BaseballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 2:
                        $row->cardType = BasketballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = BasketballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 3:
                        $row->nameTeam = HockeyTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 4:
                        $row->cardType = MagicCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = MagicTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 5:
                        $row->cardType = SoccerCardType_Model::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = SoccerTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 6:
                        $row->rarity = Rarete::select('id','rareteName','rareteNameFr')->find($row->rarity);
                        $row->energyType = EnergyType::select('id','EnergyTypeName','EnergyTypeNameFr')->find($row->energyType);
                        $row->trainerType = Trainer::select('id','trainerName','trainerNameFr')->find($row->trainerType);
                        $row->types = Types::select('id','typeName','typeNameFr')->find($row->types);
                    break;
                    default:
                    
                }

                $res[] = $row;
            }
            // ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
            // ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
            $collectionsData = Collection::where('pcuserid','=',$id)->get();
            foreach($collectionsData as $colKey => $colVal){
                $mediaIdArray = explode(',',$colVal->mediaid);
                $colVal->CollectionBanner = Media::where('id','=',reset($mediaIdArray))->get();
            }
            $response["user"] = $results;
            $response["collectionsData"] = $collectionsData;
            $response["userposts"] = $res;
            $response["Followers"] = $Followers->count();
            $response["FollowersList"] =  FollowPccardUsers::with('user:id,name,username,profilePic')->where('following_pcuserid', '=', $id)->get();
            $response["Followings"] = $Followings->count(); 
            $response["FollowingsList"] = FollowPccardUsers::with('Following:id,name,username,profilePic')->where('pcuserid', '=', $id)->get();
            $response["message"] = trans('userAlert.g_detail_success');//"Get details successfully.";
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('userAlert.g_detail_unsuccess');//"Get details unsuccessful.";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function searchpeople(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $searchtext = $data['searchtext'];
        try{
            $pcuserid = $data['pcuserid'];
            $searchTerm = $data['searchtext'];
            $searchresults =  Pccardusers::select('id','name','username','profilePic')
                ->where('name', 'LIKE', "%{$searchTerm}%") 
                ->orWhere('username', 'LIKE', "%{$searchTerm}%") 
                ->get();
                $res = [];
                foreach($searchresults as $row){
                    $searching_user_id =  $row->id;
                    $results = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=',$searching_user_id)->get();
                    $row->follow_user = $results->count(); 
                    $res[] = $row;
                }
                if (!empty($res)) {
                    $response["postsearchtext"] = $res;
                    $response["message"] = trans('userAlert.u_search_success');//"User search successfully";
                    $response["success"] = 1;
                    return response()->json($response);
                } else {
                    $response["message"] = trans('userAlert.u_search_unsuccess');//"User search unsuccessful";
                    $response["success"] = 0;
                    return response()->json($response);
                }     
        }catch(Exception $e){
            $response["message"] = trans('userAlert.O_failed');//"Operation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

}
