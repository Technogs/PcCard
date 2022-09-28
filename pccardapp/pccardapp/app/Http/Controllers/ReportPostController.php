<?php

namespace App\Http\Controllers;
use App\Models\ReportPost;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use DB;


class ReportPostController extends Controller
{

    public function postreport(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
            'postid' => 'required|int|min:1|max:255',
            'reason' => 'required|string|min:1|max:255',
		];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('reportPostAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $postid = $data['postid'];
            $reason = $data['reason'];
            $userCount = ReportPost::where('pcuserid', '=', $pcuserid)->where('postid', '=', $postid)->get();
            if ($userCount->count()) {
                $response["message"] = trans('reportPostAlert.already_report');//"User is already report this post";
                $response["success"] = 1; 
                return response()->json($response);
            } else {
                try{
                    $Postreasons = new ReportPost;
                    $Postreasons->pcuserid = $request->input('pcuserid');
                    $Postreasons->postid = $request->input('postid');
                    $Postreasons->reason = $request->input('reason');
                    $Postreasons->save();
                    $postreason = ReportPost::where('pcuserid', '=', $pcuserid)->where('postid', '=', $postid)->get();
                    $response["postreason"] = $postreason;
                    $response["message"] = trans('reportPostAlert.post_reason');//"User post a reason.";
                    $response["success"] = 1;
                    return response()->json($response);
                }catch(Exception $e){
                    $response["message"] = trans('reportPostAlert.o_failed');//"Operation failed";
                    $response["success"] = 0;
                    return response()->json($response);
                }
            } 
        }

    }

}
