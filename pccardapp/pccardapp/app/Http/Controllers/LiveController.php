<?php

namespace App\Http\Controllers;
use App\Models\Pccardusers;
use App\Models\LiveModel;
use App\Models\LiveViewCountModel;
use App\Models\FollowPccardUsers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Traits\CommanTrait;
use DB;

class LiveController extends Controller
{
    use CommanTrait;
    
   public function saveViewCount(Request $request,$locale){
       app()->setLocale($locale);
        $rules = [
            'userId' => 'required|int',
            'viewerId' => 'required|int',
            'liveSessionId' => 'required|int'
            
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }

        $uId        = $request->userId;
        $viewerId   = $request->viewerId;
        $liveSessionId= $request->liveSessionId;

        $isExist = LiveViewCountModel::where('userId',$uId)->where('viewerId',$viewerId)->where('liveSessionId',$liveSessionId)->first();
        if($isExist && $isExist->count()>0){
            $response["message"] = trans('commanAlert.already_view');//"Your are already view";
            $response["success"] = 1;
            return response()->json($response);   
        }
        $liveViewer = new LiveViewCountModel;
        $liveViewer->userId         = $uId;
        $liveViewer->viewerId       = $viewerId;
        $liveViewer->liveSessionId  = $liveSessionId;
        $liveViewer->created_at     = date('Y-m-d H:i:s');
        $liveViewer->updated_at     = date('Y-m-d H:i:s');

        if($liveViewer->save()){
            $response["message"] = trans('commanAlert.view_success');//"View Record Saved Successfully";
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.view_unsuccess');//"View Record Saved unsuccessful";
            $response["success"] = 0;
            return response()->json($response);
        }

   }
    

   public function getViewCount(Request $request,$locale){
       app()->setLocale($locale);
        $rules = [
            'userId' => 'required|int',
            'liveSessionId' => 'required|int'
            
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }

        $uId        = $request->userId;
        $liveSessionId= $request->liveSessionId;

        $isExist = LiveViewCountModel::with('viewerData:id,name,username,profilePic')->where('userId',$uId)->where('liveSessionId',$liveSessionId)->get();
        if($isExist->count() > 0){
            $response["message"] = trans('commanAlert.get_view_success');//"Get view Record Successfully";
            $response["success"] = 1;
            $response["viewCountList"] = $isExist;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.get_view_unsuccess');//"Get view Record unsuccessful";
            $response["success"] = 0;
            return response()->json($response);
        }

   }


   public function saveRecord(Request $request,$locale){
       app()->setLocale($locale);
        $rules = [
            'userId' => 'required|int',
            'userName' => 'required|string|max:255',
            'chatGroupName' => 'required|string|max:255',
            'token' => 'required|string|max:255',
            'channelName' => 'required|string|max:255'
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
        $uId = $request->userId;
        $userName = $request->userName ?? '';
        

        $isExist = LiveModel::where('userId','=',$uId)->where('status','=','1')->get();
        if($isExist && $isExist->count()>0){
            $response["message"] = trans('commanAlert.already_live');//"Your are already Live";
            $response["success"] = 1;
            return response()->json($response);   
        }
        $liveRecord = new LiveModel;
        $liveRecord->userId = $uId;
        $liveRecord->chatGroupName = $request->chatGroupName;
        $liveRecord->chatGroupId = $request->chatGroupId;
        $liveRecord->token = $request->token;
        $liveRecord->channelName = $request->channelName;
        $liveRecord->status = '1';
        if($liveRecord->save()){
            $liveSessionId = $liveRecord->id;
            // $device_token = Pccardusers::select('device_token','username')->where('id', $uId)->get();
            // foreach($device_token as $rows){
            //     $token =  $rows->device_token;
            //     $username = $rows->username;
            //         $body =  [
            //             'message' => 'started a live video',
            //             'username' => $username
            //         ];
                    
            //         $this->sendNotification($token, array(
            //             "title" => "PC CARD", 
            //             "body" => $body
            //         )); 
            //     }

            $followersList = FollowPccardUsers::with('Following:id,username,connectionLiveNotification,device_type,device_token')->where('following_pcuserid',$uId)->get();
            $notificationMessage = "$userName started live streaming";
           
            foreach($followersList as $ky => $vl){
                if($vl->Following->connectionLiveNotification == 1 && $vl->Following->device_token != ''){
                    $this->sendNotification($vl->Following->device_token, array("title" => "PC CARD", "body" => $notificationMessage));
                }
            }
            
            $response["message"] = trans('commanAlert.live_success');//"Live Record Saved Successfully";
            $response["liveSessionId"] = $liveSessionId;
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.live_unsuccess');//"Live Record Saved unsuccessful";
            $response["success"] = 0;
            return response()->json($response);
        }

   }

   public function getLiveRecord(Request $request,$locale){
       app()->setLocale($locale);
        $rules = [
            'userId' => 'required|int',
            // 'chatGroupName' => 'required|string|max:255',
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
        $liveData = LiveModel::with('userData:id,name,username,profilePic')->where('userId','=',$request->userId)->get();
        if($liveData){
            $response["message"] = trans('commanAlert.live_list');//"Live Record found";
            $response["liveData"] = $liveData;
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.live_list');//"Live Record found";
            $response["liveData"] = $liveData;
            $response["success"] = 0;
            return response()->json($response);
        }
   }

   public function endLive(Request $request,$locale){
       app()->setLocale($locale);
        $rules = [
            'liveSessionId' => 'required|int',
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
        $liveSessionId = $request->liveSessionId ?? 0;
        $liveData = LiveModel::find($liveSessionId);
        $liveData->status = '0';
        if($liveData->save()){
            LiveViewCountModel::where('liveSessionId',$liveSessionId)->delete();
            $response["message"] = trans('commanAlert.liveend_success');//"Live session end successfully";
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.liveend_unsuccess');//"Live session end unsuccessful";
            $response["success"] = 0;
            return response()->json($response);
        }
   }

//    public function sendNotification($device_token, $message){
//         $SERVER_API_KEY = 'AAAA82GxhBk:APA91bGgUUBK9mBoHl63QbKvLqPwkInL5UykPfJ-ZWF6gFR-azk3FzDozQ9A3q0wmmojwovqOaJrjJT6z1u7SnS46JwKJxYk56Tgs-ByhFNlryPJPqaL9SugLzn3NozyxMEOpc_XnSVG';
//         // payload data, it will vary according to requirement
//         $data = [
//             "to" => $device_token, // for single device id
//             "data" => $message
//         ];
//         $dataString = json_encode($data);
//         $headers = [
//             'Authorization: key=' . $SERVER_API_KEY,
//             'Content-Type: application/json',
//         ];
//         $ch = curl_init();
//         curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
//         curl_setopt($ch, CURLOPT_POST, true);
//         curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
//         $response = curl_exec($ch);
//         curl_close($ch);
//         return $response;
//     }


}
