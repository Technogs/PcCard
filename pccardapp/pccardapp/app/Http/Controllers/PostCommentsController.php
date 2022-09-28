<?php

namespace App\Http\Controllers;
use App\Models\PostComments;
use App\Models\CreatePost;
use App\Models\Pccardusers;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use App\Http\Traits\CommanTrait;
use DB;

class PostCommentsController extends Controller
{
    use CommanTrait;
    public function postcomments(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
            'postid' => 'required|int|min:1|max:255',
            'comment' => 'required|string|min:1|max:255',
		];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('postcommentAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}else {

            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $postid = $data['postid'];
            $comment = $data['comment'];
            $parentCommentId = $data['parentCommentId']??'';
                try{
                    $PostComments = new PostComments;
                    $PostComments->pcuserid = $pcuserid;
                    $PostComments->postid = $postid;
                    $PostComments->parentCommentId = $parentCommentId;
                    $PostComments->comment = $comment;
                    $PostComments->save();  
                    $fromid = $pcuserid;
                    $postid = $postid;
                    $results =  CreatePost::select('createdBy')->where('id', $postid)->first();
                    $toid = $results->createdBy;
                    $Notification = new Notification;
                    $Notification->fromid = $fromid;
                    $Notification->toid = $toid; 
                    $Notification->postid = $postid;    
                    $results = Pccardusers::select('username')->where('id', $fromid)->get();
                    foreach($results as $row){
                        $username =  $row->username;
                        $Notification->text = $username." "."commented on your post.";

                    }
                    $Notification->type = "Post Comments.";
                    $Notification->save(); 

                    // $results = Notification::select('text')->where('toid', $toid)->get();
                    $body = $Notification->text;
                        $device_token = Pccardusers::select('device_token')->where('id', $toid)->first();
                       
                        if ($device_token->device_token != '') {
                          
                                $this->sendNotification($device_token->device_token, array(
                                    "title" => "PC CARD",
                                    "body" => $body
                                ));
                        }
                  
                    // $postComment =  DB::table('post_comments') 
                    // ->join('pccard_users', 'pccard_users.id', '=', 'post_comments.pcuserid')
                    // ->select('post_comments.*','pccard_users.username','pccard_users.profilePic')
                    // ->orderBy('post_comments.updated_at', 'DESC')
                    // ->where('postid', '=',$postid)
                    // ->where('parentCommentId', '=',$parentCommentId)
                    // ->paginate(20);
                    
                    $results = PostComments::with('commentUser:id,name,username,profilePic')->where('postid',$postid)->where('parentCommentId',$parentCommentId)->paginate(20);
                    foreach($results as  $ky => $vl){
                        $results[$ky]->commentCount = PostComments::where('postid',$postid)->where('parentCommentId', $vl->id)->count();
                    }

                    $updatepost = CreatePost::where('id', $postid)->update(['updated_at' => Carbon::now()]);
                    $response["postComment"] = $results;
                    $response["message"] = trans('postcommentAlert.post_cmt');//"User post a comment.";
                    $response["success"] = 1;
                    return response()->json($response);
                }
                catch(Exception $e){
                    $response["message"] = trans('postcommentAlert.o_failed');//"Operation failed";
                    $response["success"] = 0;
                    return response()->json($response);
                }
        }
    }


    public function getcomments(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $postid = $data['postid'];
        $parentCommentId = $data['parentCommentId'];
        $parentCommentId = $parentCommentId ?? '';
            $results = DB::table('post_comments')
            ->join('pccard_users', 'pccard_users.id', '=', 'post_comments.pcuserid')
            ->select('post_comments.*','pccard_users.username','pccard_users.profilePic')
            ->where('postid', '=',$postid)
            ->paginate(20); 
            if ($results->count()) {
                // $results = DB::table('post_comments') 
                // ->join('pccard_users', 'pccard_users.id', '=', 'post_comments.pcuserid')
                // ->select('post_comments.*','pccard_users.username','pccard_users.profilePic')
                // ->orderBy('post_comments.updated_at', 'DESC')
                // ->where('postid', '=',$postid)
                // ->where('parentCommentId', '=',$parentCommentId)
                // ->paginate(20);
               
                
                $results = PostComments::with('commentUser:id,name,username,profilePic')->where('postid',$postid)->where('parentCommentId',$parentCommentId)->paginate(20);
                foreach($results as  $ky => $vl){
                    $results[$ky]->commentCount = PostComments::where('postid',$postid)->where('parentCommentId', $vl->id)->count();
                }
                $response["message"] = trans('postcommentAlert.cmt_list_found');//"Successfully get comments of single post.";
                $response["success"] = 1;
                $response["getcomments"] = $results;
                return response()->json($response);
            } else {
                $response["message"] = trans('postcommentAlert.cmt_list_n_found');//"Not Successfully get comments of single post.";
                $response["success"] = 0;
                return response()->json($response);
            }
    }


    // public function sendNotification($device_token, $message){
    //     $SERVER_API_KEY = 'AAAA82GxhBk:APA91bGgUUBK9mBoHl63QbKvLqPwkInL5UykPfJ-ZWF6gFR-azk3FzDozQ9A3q0wmmojwovqOaJrjJT6z1u7SnS46JwKJxYk56Tgs-ByhFNlryPJPqaL9SugLzn3NozyxMEOpc_XnSVG';
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
