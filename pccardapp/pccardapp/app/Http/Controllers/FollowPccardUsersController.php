<?php

namespace App\Http\Controllers;

use App\Models\Pccardusers;
use App\Models\FollowPccardUsers;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use App\Http\Traits\CommanTrait;
use DB;

class FollowPccardUsersController extends Controller
{
    use CommanTrait;
    public function followusers(Request $request,$locale)
    {
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $following_pcuserid = $data['following_pcuserid'];
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255|not_in:' . $following_pcuserid,
            'following_pcuserid' => 'required|int|min:1|max:255|not_in:' . $pcuserid,
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $response["message"] = trans('followUserAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        } else {
            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $following_pcuserid = $data['following_pcuserid'];
            $pcuserid_results = Pccardusers::where('id', '=', $pcuserid)->get();
            $following_pcuserid_results = Pccardusers::where('id', '=', $following_pcuserid)->get();
            if ($pcuserid_results->count() && $following_pcuserid_results->count()) {
                $userCount = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=', $following_pcuserid)->get();
                if ($userCount->count()) {
                    $response["message"] = trans('followUserAlert.follow_already');//"User is already follow this user";
                    $response["success"] = 1;
                    return response()->json($response);
                } else {
                    $fromid = $request->input('pcuserid');
                    $toid = $request->input('following_pcuserid');
                    try {
                        $FollowPccardUsers = new FollowPccardUsers;
                        $FollowPccardUsers->pcuserid = $fromid;
                        $FollowPccardUsers->following_pcuserid = $toid;
                        $FollowPccardUsers->save();
                        $Notification = new Notification;
                        $Notification->fromid = $fromid;
                        $Notification->toid = $toid;
                        $results = Pccardusers::select('username')->where('id', $fromid)->get();
                        foreach ($results as $row) {
                            $username =  $row->username;
                            $Notification->text = $username . " " . "started following you.";
                        }
                        $Notification->type = "Following";
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
                        $followinguser = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=', $following_pcuserid)->get();
                        $response["followinguser"] = $followinguser;
                        $response["message"] = trans('followUserAlert.follow_success');//"User recently follow this user";
                        $response["success"] = 1;
                        return response()->json($response);
                    } catch (Exception $e) {
                        $response["message"] = trans('followUserAlert.o_failed');//"Operation failed";
                        $response["success"] = 0;
                        return response()->json($response);
                    }
                }
            } else {
                $response["message"] = "User id is not found.";
                $response["success"] = 0;
                return response()->json($response);
            }
        }
    }

    public function unfollowUser(Request $request,$locale)
    {
        app()->setLocale($locale);
        try {
            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $following_pcuserid = $data['following_pcuserid'];
            $rules = [
                'pcuserid' => 'required|int|min:1|max:255|not_in:' . $following_pcuserid,
                'following_pcuserid' => 'required|int|min:1|max:255|not_in:' . $pcuserid,
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                $response["message"] = trans('followUserAlert.v_failed');//"Validation failed";
                $response["success"] = 0;
                return response()->json($response);
            }
            $followUserData = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=', $following_pcuserid)->first();

            if (!$followUserData) {
                $response["message"] = trans('followUserAlert.not_follow');//"User not follow this user.";
                $response["success"] = 0;
                return response()->json($response);
            }

            $deleteUser = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=', $following_pcuserid)->delete();
            if ($deleteUser) {
                Notification::where('fromid', '=', $pcuserid)->where('toid', '=', $following_pcuserid)->delete();
                $response["message"] = trans('followUserAlert.unfollow_success');//"User unfollow Operation successful.";
                $response["success"] = 1;
                return response()->json($response);
            } else {
                $response["message"] = trans('followUserAlert.o_failed');//"User unfollow Operation unsuccessful.";
                $response["success"] = 0;
                return response()->json($response);
            }
        } catch (Exception $e) {
            $response["message"] = trans('followUserAlert.o_failed');//"Operation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function followinglist(Request $request,$locale)
    {
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $response["message"] = trans('followUserAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        } else {

            try {
                $followinguser = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $pcuserid)->get();
                // $followinguser =  DB::table('follow_pccard_users')
                // ->join('pccard_users', 'pccard_users.id', '=', 'follow_pccard_users.following_pcuserid')
                // ->select('follow_pccard_users.*', 'pccard_users.name', 'pccard_users.username', 'pccard_users.profilePic')
                // ->orderBy('follow_pccard_users.updated_at', 'DESC')
                // ->where('pcuserid', '=', $pcuserid)
                // ->paginate(10);
                $response["followinglist"] = $followinguser;
                $response["message"] = trans('followUserAlert.list_found');//"User recently following these users";
                $response["success"] = 1;
                return response()->json($response);
            } catch (Exception $e) {
                $response["message"] = trans('followUserAlert.o_failed');//"Operation failed";
                $response["success"] = 0;
                return response()->json($response);
            }
        }
    }

    public function followerlist(Request $request,$locale){
        app()->setLocale($locale);
        $pcuserid = $request->pcuserid??'';
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $response["message"] = trans('followUserAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
        }
        try {
            $followinguser = FollowPccardUsers::with('user:id,name,username,profilePic')->where('following_pcuserid', '=', $pcuserid)->paginate(10);;
            
            $response["followerlist"] = $followinguser;
            $response["message"] = trans('followUserAlert.list_found');//"User recently following these users";
            $response["success"] = 1;
            return response()->json($response);
        } catch (Exception $e) {
            $response["message"] = trans('followUserAlert.o_failed');//"Operation failed";
            $response["success"] = 0;
            return response()->json($response);
        }


    }

    // public function sendNotification($device_token, $message)
    // {
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
