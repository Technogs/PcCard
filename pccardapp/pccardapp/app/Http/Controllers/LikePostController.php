<?php

namespace App\Http\Controllers;
use App\Models\LikePost;
use App\Models\CreatePost;
use App\Models\FollowPccardUsers;
use App\Models\Notification;
use App\Models\Pccardusers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use App\Http\Traits\CommanTrait;
use Carbon\Carbon;
use DB;


class LikePostController extends Controller
{
    use CommanTrait;

    public function likepost(Request $request,$locale){
        
        app()->setLocale($locale);
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
            'postid' => 'required|int|min:1|max:255',
		];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('likePostAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}else {

            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $postid = $data['postid'];
            $userCount = LikePost::where('pcuserid', '=', $pcuserid)->where('postid', '=', $postid)->get();
            $results =  CreatePost::select('createdBy')->where('id', $postid)->first();
            $toid = $results->createdBy;
            $fromid = $request->input('pcuserid');
            $postid = $request->input('postid');
            if ($userCount->count()) {
                    $res  = LikePost::where('pcuserid', '=', $pcuserid)->where('postid', '=', $postid)->delete();
                    
                    if($res){
                        Notification::where('fromid', '=', $fromid)->where('toid', '=', $toid)->where('postid', '=', $postid)->delete();
                        $response["message"] = trans('likePostAlert.unliked_success');//"Post unliked";
                        $response["success"] = 1; 
                        $response["likersImage"] = LikePost::with(['userImages' => function ($query) {
                            $query->select('id','profilePic');
                        }])->where('postid', '=', $postid)->latest()->take(4)->get();
                        return response()->json($response);
                    }else{
                        $response["message"] = trans('likePostAlert.unliked_unsuccess');//"Post unliked unsuccessful";
                        $response["success"] = 0; 
                        return response()->json($response);
                    }
            } else {
                        try{
                            $likepost = new LikePost;
                            $likepost->pcuserid = $request->input('pcuserid');
                            $likepost->postid = $request->input('postid');
                            $likepost->save();
                            

                            $Notification = new Notification;
                            $Notification->fromid = $fromid;
                            $Notification->toid = $toid; 
                            $Notification->postid = $postid;    
                            $results = Pccardusers::select('username')->where('id', $fromid)->get();
                            foreach($results as $row){
                                $username =  $row->username;
                                $Notification->text = $username." "."liked your post.";
                            }
                            $Notification->type = "Post Liked.";
                            $Notification->save(); 
                            
                            $device_token = Pccardusers::select('device_token')->where('id', $toid)->first();
                            $device_token = $device_token->device_token;
                            if($device_token){
                                $body =  $Notification->text;
                                if($fromid != $toid) { 
                                    
                                    $this->sendNotification($device_token, array("title" => "PC CARD", "body" => $body)); 
                                }

                            }
                             
                            $likedpost = LikePost::where('pcuserid', '=', $pcuserid)->where('postid', '=', $postid)->get();
                            $updatepost = CreatePost::where('id', $postid)->update(['updated_at' => Carbon::now()]);
                            $response["likedpost"] = $likedpost;
                            $response["message"] = trans('likePostAlert.recent_like');//"User recently like this post";
                            $response["success"] = 1;
                            $response["likersImage"] = LikePost::with(['userImages' => function ($query) {
                                $query->select('id','profilePic');
                            }])->where('postid', '=', $postid)->latest()->take(4)->get();
                            return response()->json($response);
                        }
                        catch(Exception $e){
                            $response["message"] = trans('likePostAlert.o_failed'); //"Operation failed";
                            $response["success"] = 0;
                            return response()->json($response);
                        }
            }

        }

    }


 
    // public function sendNotification($device_token, $message){
    //     $SERVER_API_KEY = env('FIREBASE_KEY');
    //     $data = [
    //         "to" => $device_token, // for single device id
    //         "data" => $message
    //     ];
    //     $dataString = json_encode($data);
    //     $headers = [
    //         'Authorization: key=' . $SERVER_API_KEY,
    //         'Content-Type: application/json',
    //     ];
    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    //     curl_setopt($ch, CURLOPT_POST, true);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
    //     $response = curl_exec($ch);
    //     curl_close($ch);
    //     return $response;
    // }

}
