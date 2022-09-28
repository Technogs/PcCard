<?php

namespace App\Http\Controllers;
use App\Models\Stories;
use App\Models\Pccardusers;
use App\Models\FollowPccardUsers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use DB;

class StoriesController extends Controller
{
    public function createstories(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
            $rules = [
                'pcuserid' => 'required|int|min:1|max:255',
                'mediaFirst' => 'required',
                'mediaFirstType' => 'required',
            ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}else{
            try{
                $createstories = new Stories;
                $createstories->pcuserid = $request->input('pcuserid');
                if($request->hasFile('mediaFirst')) {
                    $file = $request->file('mediaFirst');
                    $extension = $file->getClientOriginalExtension(); // you can also use file name
                    $fileName = 'mediaFirst'.time().'.'.$extension;
                    $path = public_path().'/postimages';
                    $base_path = url('/').'/postimages';
                    $image_path = $base_path. '/' . $fileName;
                    $uplaod = $file->move($path,$fileName);
                    $createstories->mediaFirst = $image_path;
                  }
                $createstories->mediaFirstType = $request->input('mediaFirstType');
                $createstories->save();
                $response["createstories"] = $createstories;
                $response["message"] = trans('commanAlert.story_success');//"User account story is created successfully";
                $response["success"] = 1;
                return response()->json($response);
            }
            catch(Exception $e){
                $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
                $response["success"] = 0;
                return response()->json($response);
            }
        }
    }


    public function getstories(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
            $rules = [
                'pcuserid' => 'required|int|min:1|max:255',
            ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            try{
                $stories = array();
                $pcuserid = $request->input('pcuserid');
                $stories_of_auth_user = Stories::where('pcuserid', '=', $pcuserid)->get();
                if ($stories_of_auth_user->count() > 0) {
                    $stories[] = Stories::orderBy('stories.created_at', 'DESC')->where('pcuserid', '=', $pcuserid)->get();
                }
                $following_pcusers = FollowPccardUsers::select('following_pcuserid','pcuserid')->where('pcuserid', '=', $pcuserid)->get();
                if ($following_pcusers->count()) {
                    foreach($following_pcusers as $row){
                       $following_pcuserid = $row->following_pcuserid;
                        $result  = Stories::orderBy('stories.created_at', 'DESC')->where('pcuserid', '=', $following_pcuserid)->get();
                        if (!$result->isEmpty()) { 
                            $stories[]  = Stories::orderBy('stories.created_at', 'DESC')->where('pcuserid', '=', $following_pcuserid)->get();
                        }
                    }
                }
                $response["getstories"] = $stories;
                $response["message"] = trans('commanAlert.story_list');//"User account timeline stories.";
                $response["success"] = 1;
                return response()->json($response);
            }catch(Exception $e){
                $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
                $response["success"] = 0;
                return response()->json($response);
            }
        }
    }

    public function getsingleuserstory(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); 
            $rules = [
                'pcuserid' => 'required|int|min:1|max:255',
            ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            try{
                $pcuserid = $request->input('pcuserid');
                $results = Stories::where('pcuserid', '=', $pcuserid)->get();
                if ($results->count()) {
                    $response["getstories"] = $results;
                    $response["message"] = trans('commanAlert.user_story');//"User account stories.";
                    $response["success"] = 1;
                    return response()->json($response);
                }else {
                    $response["message"] = trans('commanAlert.user_story_not');//"User account stories not exist.";
                    $response["success"] = 1;
                    return response()->json($response);
                }
            }catch(Exception $e){
                $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
                $response["success"] = 0;
                return response()->json($response);
            }
        }
    }

}
