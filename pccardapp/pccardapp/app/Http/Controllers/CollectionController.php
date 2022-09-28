<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\CollectionMediaModel;

use App\Models\Pccardusers;
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

use App\Models\CreatePost;
use App\Models\Media;
use App\Models\FollowPccardUsers;
use App\Models\LikePost;
use App\Models\PostComments;
use App\Models\Stories;
use App\Models\PostsBookmarks;
use App\Models\LiveModel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;  
use DB;

class CollectionController extends Controller
{
    public function createcollection(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all();   
            $rules = [
                'pcuserid' => 'required|int|min:1|max:255',
                'collectionName' => 'required|string|min:1|max:255',
            ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		} else {
            try{
                $createcollection = new Collection;
                $createcollection->collectionName = $request->input('collectionName');
                $createcollection->pcuserid = $request->input('pcuserid');
                $createcollection->mediaid = $request->input('mediaid');
                $createcollection->save();
                $collectionId = $createcollection->id;
                $mediaIdArr = explode(',',$createcollection->mediaid);
                $mediaIdArr = array_filter($mediaIdArr);
                foreach($mediaIdArr as $mediaVal){
                    $collectionMediaData = new CollectionMediaModel;
                    $collectionMediaData->collectionId = $collectionId;
                    $collectionMediaData->mediaId = $mediaVal;
                    $collectionMediaData->save();
                }
                $response["createcollection"] = $createcollection;
                $response["message"] = trans('commanAlert.col_create');//"Collection created successfully";
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

    public function getcollection($pcuserid,$locale){
        app()->setLocale($locale);
        // $collection = array();
        // $medias_chunk = array();
        // $mediaid  = DB::table('collections')
        // ->select('*')
        // ->orderBy('collections.created_at', 'DESC')
        // ->where('pcuserid', '=', $pcuserid)
        // ->get();
        // foreach($mediaid as $mediaids) {
        //    $mediaidArray =  explode(',',$mediaids->mediaid);
        //    foreach($mediaidArray as $mediaidValues) {
        //     $mediaids->medias[] = DB::table('media')
        //         ->select('mediaUrl','mediaType')
        //         ->orderBy('media.created_at', 'DESC')
        //         ->where('id', '=', $mediaidValues)
        //         ->get();
        //    }
        //    $collection['collection'][]  = $mediaids;
        // }
        $collection = Collection::with('userInfo','getCollectionMedia.getMedia')->Where('pcuserid', '=',$pcuserid)->get();
        if (!empty($collection)) {
            $response["message"] = trans('commanAlert.col_found');//"User collections";
            $response["pcusercollections"] = $collection;
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.col_not_found');//"User collections not exist";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function getCollectionById(Request $request,$locale){
        app()->setLocale($locale);
       
    
        $rules = [            
            'uid' => 'required|int|min:1',
            'collectionId' => 'required|int|min:1',
        ];
        $validator = Validator::make($request->all(),$rules);
        // prd($request->all());
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.o_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}
       
        $uid = $request->uid;
        $collectionId = $request->collectionId;
        $res = [];
        $mediaIdArray = [];
        $collection = Collection::with('userInfo','getCollectionMedia.getMedia')->find($collectionId);
        if($collection)
            $mediaIdArray = $collection->mediaid ? explode(',',$collection->mediaid) : [];
            $postIdArray = [];
            foreach($mediaIdArray as $ky => $vl){
               
                $mediaInfo = Media::find($vl);
                $postIdArray[] = $mediaInfo->postid ?? '';
            }
            $postIdArray = array_filter($postIdArray);
            $postIdArray = array_unique($postIdArray);
            
            foreach($postIdArray as $postKy => $postId){
                $pcuserposts = CreatePost :: with('getPostCollection','user')->find($postId);
                if($pcuserposts){
                    $createdBy = $pcuserposts->createdBy;
                    $postId = $pcuserposts->id;
                    $gameCardId = $pcuserposts->cardGame;
                    $pcuserposts->cardGame = CardGameModel::select('id','gameName','gameNameFr')->find($pcuserposts->cardGame);
                    switch ($gameCardId) {
                        case 1:
                            
                            $pcuserposts->cardType = BaseballCardTypeModel::select('id','cardType','cardTypeFr')->find($pcuserposts->cardType);
                            $pcuserposts->nameTeam = BaseballTeamModel::select('id','nameTeam','nameTeamFr')->find($pcuserposts->nameTeam);
                        break;
                        case 2:
                            $pcuserposts->cardType = BasketballCardTypeModel::select('id','cardType','cardTypeFr')->find($pcuserposts->cardType);
                            $pcuserposts->nameTeam = BasketballTeamModel::select('id','nameTeam','nameTeamFr')->find($pcuserposts->nameTeam);
                        break;
                        case 3:
                            $pcuserposts->nameTeam = HockeyTeamModel::select('id','nameTeam','nameTeamFr')->find($pcuserposts->nameTeam);
                        break;
                        case 4:
                            $pcuserposts->cardType = MagicCardTypeModel::select('id','cardType','cardTypeFr')->find($pcuserposts->cardType);
                            $pcuserposts->nameTeam = MagicTeam_Model::select('id','nameTeam','nameTeamFr')->find($pcuserposts->nameTeam);
                        break;
                        case 5:
                            $pcuserposts->cardType = SoccerCardType_Model::select('id','cardType','cardTypeFr')->find($pcuserposts->cardType);
                            $pcuserposts->nameTeam = SoccerTeam_Model::select('id','nameTeam','nameTeamFr')->find($pcuserposts->nameTeam);
                        break;
                        case 6:
                            $pcuserposts->rarity = Rarete::select('id','rareteName','rareteNameFr')->find($pcuserposts->rarity);
                            $pcuserposts->energyType = EnergyType::select('id','EnergyTypeName','EnergyTypeNameFr')->find($pcuserposts->energyType);
                            $pcuserposts->trainerType = Trainer::select('id','trainerName','trainerNameFr')->find($pcuserposts->trainerType);
                            $pcuserposts->types = Types::select('id','typeName','typeNameFr')->find($pcuserposts->types);
                        break;
                        default:
                        
                    }

                    $pcuserposts->isBookmarked = PostsBookmarks::where('pcuserid','=',$uid)->where('postid','=',$postId)->count();
                    $pcuserposts->follow_user = FollowPccardUsers::where('pcuserid', '=', $uid)->where('following_pcuserid', '=',$createdBy)->count(); 
                    $pcuserposts->post_likes = LikePost::where('postid', '=', $postId)->count();
                    $pcuserposts->likersImage = LikePost::with(['userImages' => function ($query) {
                        $query->select('id','profilePic');
                    }])->where('postid', '=', $postId)->latest()->take(4)->get();
                    $pcuserposts->post_comments = PostComments::where('postid', '=', $postId)->where('parentCommentId', '')->count();
                    $pcuserposts->post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$uid)->count();
                    $pcuserposts->postMedia = Media::where('postid','=',$postId)->get();
                    $res[] = $pcuserposts;
                }
            }


       

        if (!empty($res)) {
            $response["message"] = trans('commanAlert.post_list');//"User posts";
            $response["success"] = 1;
            $data['posts'] = $res;
            $data["followingData"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $uid)->get();
            $response["data"] = $data; 
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.post_list_not');//"User posts not exist";
            $response["success"] = 0;
            return response()->json($response);
        }
    }
    
    public function getCollectionDetail(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all();   
            $rules = [
                'uid' => 'required|int|min:1|max:255',
                'collectionId' => 'required|string|min:1|max:255',
            ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["success"] = 0;
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            return response()->json($response);
		}
        $uid = $request->uid??'';
        $collectionId = $request->collectionId??'';
        $collection = Collection::with('userInfo','getCollectionMedia.getMedia')->Where('pcuserid',$uid)->where('id',$collectionId)->first();
        if($collection){
            $response["success"] = 1;
            $response["message"] = trans('commanAlert.cold_found');//"Validation failed.";
            $response['collectionDetail'] = $collection;
            return response()->json($response);
        }else{
            $response["success"] = 0;
            $response["message"] = trans('commanAlert.cold_not_found');//"Validation failed.";
            return response()->json($response);
        }
    }

    public function deletecollection(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all();
        $pcuserid = $data['pcuserid'];
        $collectionid = $data['collectionid'];
        $Collection = Collection::find($collectionid);
         if ($Collection) {
            $Collection->getCollectionMedia()->delete();
            $Collection->delete();
             $response["message"] = trans('commanAlert.col_delete');//"User posted collections is deleted";
             $response["success"] = 1;
             return response()->json($response);
         } else {
             $response["message"] = trans('commanAlert.col_not_delete');//"User posted collections is not exist";
             $response["success"] = 0;
             return response()->json($response);
         }
    }



}
