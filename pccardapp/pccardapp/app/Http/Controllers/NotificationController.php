<?php

namespace App\Http\Controllers;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use DB;


class NotificationController extends Controller
{
    public function usernotification(Request $request,$locale) {
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
       
        // $results = DB::table('notifications')
        // ->select('id','text')
        // ->orderBy('updated_at', 'DESC')
        // ->where('toid', '=',$pcuserid)
        // ->where('type', '!=','Following')->paginate(50); 
        // prd($results);
        
        $results = DB::table('notifications')
            ->join('pccard_users', 'pccard_users.id', '=', 'notifications.fromid')
            ->select('notifications.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
            ->where('toid', '=',$pcuserid)
            ->where('type', '!=','Following')
            ->orderBy('notifications.updated_at', 'DESC')
            ->paginate(50);
        if ($results->count()) {
           
            
          
            $response["success"] = 1;
            $response["message"] = trans('commanAlert.get_notification');//"Successfully get notifications of user.";
            $response["notifications"] = $results;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.n_get_notification');//"Not Successfully get notifications of user.";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    //getfollowingnotification

    public function getfollowingnotification(Request $request,$locale) {
        app()->setLocale($locale);
      $data = $request->all(); // This will get all the request data.
      $pcuserid = $data['pcuserid'];
      $results = DB::table('notifications')
      ->select('id','text')
      ->orderBy('updated_at', 'DESC')
      ->where('toid', '=',$pcuserid)
      ->where('type', '=','Following')
      ->paginate(20); 

      if ($results->count()) {
     
          $results = DB::table('notifications')
          ->join('pccard_users', 'pccard_users.id', '=', 'notifications.fromid')
          ->select('notifications.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
          ->where('toid', '=',$pcuserid)
          ->where('type', '=','Following')
          ->orderBy('notifications.updated_at', 'DESC')
          ->paginate(10);
          $response["notifications"] = $results;
          $response["message"] = trans('commanAlert.follow_notification');//"Successfully get notifications of user.";
          $response["success"] = 1;
          return response()->json($response);
      } else {
          $response["message"] = trans('commanAlert.not_follow_notification');//"Not Successfully get notifications of user.";
          $response["success"] = 0;
          return response()->json($response);
      }
  }

}
