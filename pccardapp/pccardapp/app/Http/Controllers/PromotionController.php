<?php
namespace App\Http\Controllers;

use App\Models\PromotionModel;
use App\Models\PlansModel;
use App\Models\CreatePost;
use App\Models\promotionCollectionModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use DB;




class PromotionController extends Controller
{
    public function TestApi(Request $request,$locale){
        app()->setLocale($locale);
        $return['msg'] = trans('alert.testmsg');
        return response()->json($return);
    }

    public function createPromotion(Request $request,$locale){
        
        app()->setLocale($locale);
        $rules = [
            'userId' => 'required|int|min:1',
            'planId' => 'required|int|min:1',
            'postIdList' => 'required|string',
            'transactionId' => 'required|string|min:6',
            'totalPost' => 'required|int|min:1',
        ];
       
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('promotionAlert.v_failed');
            $response["success"] = 0;
            return response()->json($response);
		}
        try{
            $planDetail = PlansModel::find($request->planId);
            if(!$planDetail){
                $response["message"] = trans('promotionAlert.Pplan_exist');
                $response["success"] = 0;
                return response()->json($response);
            }
            $promotionExpiry = date('Y-m-d', strtotime($planDetail->planValidity)).' 23:59:59';
            $createPromotion = new PromotionModel;
            $createPromotion->userId = $request->userId;
            $createPromotion->collectionList = $request->postIdList;
            $createPromotion->planId = $request->planId;
            $createPromotion->transactionId = $request->transactionId;
            $createPromotion->totalPost = $request->totalPost;
            $createPromotion->expiryDate = $promotionExpiry;

            if($createPromotion->save()){
                $collectionId = $createPromotion->id;
                $collectionArr = explode(',',$request->postIdList);
                $collectionArr = array_filter($collectionArr);
                foreach($collectionArr as $val){
                    $CollectionData = new promotionCollectionModel;
                    $CollectionData->promotionId = $collectionId;
                    $CollectionData->expiryDate = $promotionExpiry;
                    $CollectionData->postId = $val;
                    $CollectionData->save();
                }
                $response["message"] =  trans('promotionAlert.Pplan_create_success');
                $response["success"] = 1;
                return response()->json($response);
            }else{
                $response["message"] = trans('promotionAlert.Pplan_create_unsuccess');
                $response["success"] = 0;
                return response()->json($response);
            }
        }catch(Exception $e){
            $response["message"] = trans('promotionAlert.o_failed');
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function modifyPromotion(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'promotionId' => 'required|int|min:1',
            'postIdList' => 'required|string',
            'totalPost' => 'required|int|min:1',
        ];
       
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('promotionAlert.v_failed');
            $response["success"] = 0;
            return response()->json($response);
		}
        
        try{
            $updatePromotion = PromotionModel::find($request->promotionId);
            $postIdList = $updatePromotion->collectionList.','.$request->postIdList;
            
            $updatePromotion->collectionList = $postIdList;
            $updatePromotion->totalPost = $request->totalPost;
            if($updatePromotion->save()){
                $planDetail = PlansModel::find($updatePromotion->planId);

                // promotionCollectionModel::where('promotionId',$request->promotionId)->delete();
                $collectionArr = explode(',',$request->postIdList);
                $collectionArr = array_filter($collectionArr);
                
                $promotionExpiry = date('Y-m-d', strtotime($planDetail->planValidity)).' 23:59:59';
                $updatePromotion->expiryDate = $promotionExpiry;
                $updatePromotion->save();
                foreach($collectionArr as $val){
                    $CollectionData = new promotionCollectionModel;
                    $CollectionData->promotionId = $request->promotionId;
                    $CollectionData->expiryDate = $promotionExpiry;
                    $CollectionData->postId = $val;
                    $CollectionData->save();
                }
                $response["message"] = trans('promotionAlert.p_update');//"Promotion Updated successfully.";
                $response["success"] = 1;
                return response()->json($response);
            }else{
                $response["message"] = trans('promotionAlert.p_unupdate');//"Promotion Updated unsuccessful.";
                $response["success"] = 0;
                return response()->json($response);
            }
        }catch(Exception $e){
            $response["message"] = trans('promotionAlert.o_failed');
            $response["success"] = 0;
            return response()->json($response);
        }
    }
        
    public function getPromotionList($uid,$locale){
        app()->setLocale($locale);
		if (!$uid) {
            $response["message"] = trans('promotionAlert.id_req');//"userId is Required";
            $response["success"] = 0;
            return response()->json($response);
		}
      
        $promotionList = PromotionModel::with('getPlan')->where('userId','=',$uid)->where('expiryDate','>',date('Y-m-d').' 23:59:59')->get()->toArray();
       
        if($promotionList){
            $response["message"] = trans('promotionAlert.pl_found');//"Promotion list found";
            $response["promotionData"] =$promotionList;
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('promotionAlert.pl_found');//"Promotion list found";
            $response["promotionData"] = array();
            $response["success"] = 0;
            return response()->json($response);
        }
    }
        
    public function getPromotionDetail($pid,$locale){
        app()->setLocale($locale);
		if (!$pid) {
            $response["message"] = trans('promotionAlert.p_id_req');//"Promotion id is Required";
            $response["success"] = 0;
            return response()->json($response);
		}
      
        $promotionDetails = PromotionModel::with('getPlan','CollectionList.postData.getMedia')->where('id','=',$pid)->first();
        
        if($promotionDetails){
            $response["message"] = trans('promotionAlert.pd_fnd');//"Promotion Detail found";
            $response["promotionData"] = $promotionDetails;
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('promotionAlert.pd_not_fnd');//"Promotion Detail not found";
            $response["promotionData"] = array();
            $response["success"] = 0;
            return response()->json($response);
        }
    }



}
