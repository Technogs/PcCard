<?php

namespace App\Http\Controllers;
use App\Models\PlansModel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use DB;

class Plans extends Controller
{
   public function index($locale){
    app()->setLocale($locale);
        $result = PlansModel::all();
       
        if($result){

            $response["message"] = trans('commanAlert.get_plan_list');//"Plans data found";
            $response["plans"] = $result;
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('commanAlert.plan_list_not_get');//"Plans data not found";
            $response["plans"] = array();
            $response["success"] = 0;
            return response()->json($response);
        }
   }
}
