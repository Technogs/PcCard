<?php

namespace App\Http\Controllers;
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
use App\Models\HashTagModel;

use App\Models\PromotionModel;
use App\Models\promotionCollectionModel;
use App\Models\CollectionMediaModel;
use App\Models\Collection;
use App\Models\Notification;
use App\Models\ReportPost;
use App\Models\ConditionModel;
use App\Models\HockeyCardTypeModel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use App\Http\Traits\CommanTrait;
use DB;

class CreatePostController extends Controller
{
    use CommanTrait;
    
    public function mypostlist($uid,$locale){
        app()->setLocale($locale);
        //where('createdBy','=',$uid)->
        $result = CreatePost::with('getMedia')->where('createdBy','=',$uid)->paginate(10);
        if($result){
            $response["message"] = trans('commanAlert.post_list');//"Post data found";
            $response["plans"] = $result;
            $response["success"] = 1;
            return response()->json($response);
        }else{
            $response["message"] = trans('commanAlert.post_list_not');//"Post data not found";
            $response["plans"] = array();
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function userdata($id,$locale){
        app()->setLocale($locale);

        $userData = Pccardusers::select('id','name','username','profilePic')->where('id','!=',$id)->get();
        $gameType = CardGameModel::all();

        if ($userData->count()) {
            $response["message"] = trans('commanAlert.post_list');//"User data is coming.";
            $response["success"] = 1;
            $response["userData"] = $userData;
            $response["gameType"] = $gameType;
            $response["ConditionData"] = ConditionModel::all();
           
            return response()->json($response);
        } else {

            $response["message"] = trans('commanAlert.post_list_not');//"User data is not coming.";
            $response["success"] = 0;

            return response()->json($response);
        }


    }

    public function createpost(Request $request,$locale){
        app()->setLocale($locale);

            // $response["message"] = $_POST;
            // $response["files"] = $_FILES;
            // $response["success"] = 0;
            // return response()->json($response);
            // die;
        $data = $request->all();   
        $postTag = $data['postTag']; 
       if($postTag == "1"){
        $rules = [
            
                'createdBy' => 'required|int|min:1|max:255',
                'userName' => 'required|string|min:1|max:255',
                'cardGame' => 'required|string|min:1|max:255',
                'postTag' => 'required|string|min:1|max:255',
                'postPrice' => 'required|string|min:1|max:255',
                // 'mediaFirst' => 'required',
                // 'mediaFirstType' => 'required',
                
            ];

        }else{ 
            $rules = [
            
                'createdBy' => 'required|int|min:1|max:255',
                'userName' => 'required|string|min:1|max:255',
                'cardGame' => 'required|string|min:1|max:255',
                'postTag' => 'required|string|min:1|max:255',
                // 'mediaFirst' => 'required',
                // 'mediaFirstType' => 'required',
                
            ];
        }
        
        $validator = Validator::make($request->all(),$rules);

		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.o_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            $createBy = $request->input('createdBy');
            $userName =  $request->input('userName')??'';
            
            try{
                
                $createpost = new CreatePost;
                $createpost->createdBy = $createBy;
                $createpost->description = $request->input('description')??'';
                $createpost->cardGame = $request->input('cardGame')??'';
                $createpost->rarity = $request->input('rarity')??'';
                $createpost->types = $request->input('types')??'';
                $createpost->trainerType = $request->input('trainerType')??'';
                $createpost->energyType = $request->input('energyType')??'';
                $createpost->nameTeam = $request->input('nameTeam')??'';
                $createpost->other = $request->input('other')??''; 
                $createpost->conditionId = $request->input('conditionId')?? 0;
                $createpost->cardType = $request->input('cardType')??'';
                // $createpost->otherCardType = $request->input('otherCardType')??'';
                $hashTags = str_replace('#', '',$request->input('hashTag'))??'';
                $createpost->hashTag =$hashTags;
                $createpost->peopleTag = $request->input('peopleTag')??'';
                $createpost->postTag = $request->input('postTag')??'';
                $createpost->postPrice = $request->input('postPrice')??0;
                // return response()->json($_FILES);die;
                $createmedia = new Media;
                $createmedia2 = new Media;
                if($request->hasFile('mediaFirst')) {
                    $file = $request->file('mediaFirst');
                    $extension = $file->getClientOriginalExtension(); // you can also use file name
                    $fileName = 'mediaFirst'.time().'.'.$extension;
                    $path = public_path().'/postimages';
                    $base_path = url('/').'/public/postimages';
                    $image_path = $base_path. '/' . $fileName;
                    $uplaod = $file->move($path,$fileName);
                    $createmedia->mediaUrl = $image_path;
                }
                $createmedia->mediaType = $request->input('mediaFirstType');

                if($request->hasFile('mediaSecond')) {
                    $file = $request->file('mediaSecond');
                    $extension = $file->getClientOriginalExtension(); // you can also use file name
                    $fileName = 'mediaSecond'.time().'.'.$extension;
                    $path = public_path().'/postimages';
                    $base_path = url('/').'/public/postimages';
                    $image_path = $base_path. '/' . $fileName;
                    $uplaod = $file->move($path,$fileName);
                    $createmedia2->mediaUrl = $image_path;
                  }
                  
                  $createmedia2->mediaType = $request->input('mediaSecondType');

                $createpost->address = $request->input('address')??'';
                
                $createpost->save();
                
                $hashTagArr = $hashTags ? explode(',',$hashTags) : [];
                foreach($hashTagArr as $ky => $vl){
                    $count = HashTagModel::where('hashTagName',trim($vl))->count();
                    if(!$count){
                        $hashTagObj = new HashTagModel;
                        $hashTagObj->hashTagName = trim($vl);
                        $hashTagObj->save();
                    }

                }
                
                
                
                $createmedia->postid = $createpost->id;
               
                // $createmedia->mediaUrl = $createpost->mediaFirst;
                // $createmedia->mediaType = $createpost->mediaFirstType;
                $createmedia->save();

                // if (isset($createpost->mediaSecond) && isset($createpost->mediaSecondType))
                if (isset($createmedia2->mediaUrl) && isset($createmedia2->mediaType))
                {
                    $createmedia2->postid = $createpost->id;
                    // $createmedia2->mediaUrl =  $createpost->mediaSecond;
                    // $createmedia2->mediaType = $createpost->mediaSecondType;
                    $createmedia2->save();
                }
                $followersList = FollowPccardUsers::with('user:id,username,newPostNotification,device_type,device_token')->where('following_pcuserid',$createBy)->get();
                $notificationMessage = "$userName shared a new card";
                foreach($followersList as $ky => $vl){
                    if($vl->user->newPostNotification == 1 && $vl->user->device_token != ''){
                        $this->sendNotification($vl->user->device_token, array("title" => "PC CARD", "body" => $notificationMessage));
                    }
                }

                $response["createpost"] = $createpost;
                $response["message"] = trans('commanAlert.create_success');//"User account created successfully";
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

    public function getpost($id,$locale){
            app()->setLocale($locale);

        //  $pcuserposts = DB::table('create_posts')
            // ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
            // ->join('tbl_promotionCollection as tpc','create_posts.id','=','tpc.postId')
            // ->orderBy('tpc.created_at', 'Desc')
            // ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic','tpc.postId', DB::raw('COUNT(*) AS total'))
            // ->orderBy('create_posts.updated_at', 'DESC')
            // ->groupBy('tpc.postId')
            // ->whereNOTIn('create_posts.id',function($query) use ($id){
            //    $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$id);
            // })
            // ->get();
            // // ->paginate(10);

            // prd($pcuserposts->toArray());            
            // post query 

            $pcuserposts = CreatePost :: with('getPostCollection','user')
                                    ->whereNOTIn('create_posts.id',function($query) use ($id){
                                            $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$id);
                                    })
                                    ->paginate(10)->sortByDesc('getPostCollection.created_at');
            
            
            $res = [];
            foreach($pcuserposts as $row){
                $createdBy = $row->createdBy;
                $postId = $row->id;
                $gameCardId = $row->cardGame;
                $row->cardGame = CardGameModel::select('id','gameName','gameNameFr')->find($row->cardGame);
                 switch ($gameCardId) {
                    case 1:
                        
                        $row->cardType = BaseballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = BaseballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 2:
                        $row->cardType = BasketballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = BasketballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 3:
                        $row->nameTeam = HockeyTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 4:
                        $row->cardType = MagicCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = MagicTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 5:
                        $row->cardType = SoccerCardType_Model::select('id','cardType','cardTypeFr')->find($row->cardType);
                        $row->nameTeam = SoccerTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
                    break;
                    case 6:
                        $row->rarity = Rarete::select('id','rareteName','rareteNameFr')->find($row->rarity);
                        $row->energyType = EnergyType::select('id','EnergyTypeName','EnergyTypeNameFr')->find($row->energyType);
                        $row->trainerType = Trainer::select('id','trainerName','trainerNameFr')->find($row->trainerType);
                        $row->types = Types::select('id','typeName','typeNameFr')->find($row->types);
                    break;
                    default:
                    
                }
                $row->condition = ConditionModel::select('id','conditionName','conditionNameFr')->find($row->conditionId);
                // $post_likes = LikePost::where('postid', '=', $postId)->get();
                // $post_comments = PostComments::where('postid', '=', $postId)->get();
                // $results = FollowPccardUsers::where('pcuserid', '=', $id)->where('following_pcuserid', '=',$createdBy)->get();
                // $post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$id)->get();

                $row->isBookmarked = PostsBookmarks::where('pcuserid','=',$id)->where('postid','=',$postId)->count();
                $row->follow_user = FollowPccardUsers::where('pcuserid', '=', $id)->where('following_pcuserid', '=',$createdBy)->count(); 
                $row->post_likes = LikePost::where('postid', '=', $postId)->count();
                $row->likersImage = LikePost::with(['userImages' => function ($query) {
                    $query->select('id','profilePic');
                }])->where('postid', '=', $postId)->latest()->take(4)->get();
                $row->post_comments = PostComments::where('postid', '=', $postId)->where('parentCommentId', '')->count();
                $row->post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$id)->count();
                $row->postMedia = Media::where('postid','=',$postId)->get();
                $res[] = $row;
            }

            $stories = array();
            $pcuserid = $id;
            $stories_of_auth_user = Stories::where('pcuserid', '=', $pcuserid)->get();
            if ($stories_of_auth_user->count() > 0) {
                $stories[]  = DB::table('stories')
                ->join('pccard_users', 'pccard_users.id', '=', 'stories.pcuserid')
                ->select('stories.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
                ->orderBy('stories.created_at', 'DESC')
                ->where('pcuserid', '=', $pcuserid)
                ->get();
            }

            $following_pcusers = FollowPccardUsers::select('following_pcuserid','pcuserid')->where('pcuserid', '=', $pcuserid)->get();
            if ($following_pcusers->count()) {
                foreach($following_pcusers as $row){
                   $following_pcuserid = $row->following_pcuserid;
                    $result  = DB::table('stories')
                    ->join('pccard_users', 'pccard_users.id', '=', 'stories.pcuserid')
                    ->select('stories.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
                    ->orderBy('stories.created_at', 'DESC')
                    ->where('pcuserid', '=', $following_pcuserid)
                    ->get();

                    if (!$result->isEmpty()) { 
                        $stories[]  = DB::table('stories')
                        ->join('pccard_users', 'pccard_users.id', '=', 'stories.pcuserid')
                        ->select('stories.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
                        ->orderBy('stories.created_at', 'DESC')
                        ->where('pcuserid', '=', $following_pcuserid)
                        ->get();
                    }

                }

            }

        $liveData = [];
        $liveData = LiveModel::with('userData:id,name,username,profilePic')->where('status', '=','1')->get();
        foreach($liveData as $key=> $value){
            $liveData[$key]->type = 'live';
        }

        if (!empty($res)) {
            $response["message"] = trans('commanAlert.post_list');//"User posts";
            $response["success"] = 1;
            $response["pcuserposts"] = $res;
            $response["followingData"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $pcuserid)->get();
            $response["stories"] = array_merge($liveData->toArray(),$stories);
            // $response["liveData"] = $liveData;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.post_list_not');//"User posts not exist";
            $response["success"] = 2;
            return response()->json($response);
        }
    }

    public function deletepost(Request $request,$locale){
        app()->setLocale($locale);
       $rules = [
            'postid' => 'required|min:1|max:255',
        ];
        $validator = Validator::make($request->all(),$rules);

		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.o_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}
        $postid = $request->postid??0;
        $postExist = CreatePost::find($postid);
        if(!$postExist->count()){
            $response["message"] = trans('postAlert.post_not_exist');//"User post not exist";
            $response["success"] = 0;
            return response()->json($response);
        }

        $postId = $postExist->id ?? $postid;
        $promotionData = PromotionModel::whereRaw("FIND_IN_SET($postId,collectionList)")->get();
        
        if($promotionData->count()){
            foreach($promotionData as $ky => $vl){
                $collectionStr = $vl->collectionList ??'';
                if($collectionStr)
                $collectionArray = explode(',',$collectionStr);
               
                if(count($collectionArray)){
                    if(count($collectionArray) == 1){
                        PromotionModel::where('id',$vl->id)->delete();
                    }else{
                        $pos = array_search($postId,$collectionArray);
                        
                        unset($collectionArray[$pos]);
                        $collectionStr = implode(',',$collectionArray);
                       
                        PromotionModel::where('id',$vl->id)->update(['collectionList' => $collectionStr]);
                        
                    }
                }
            }
        }
        promotionCollectionModel::where('postId',$postId)->delete();
       
        $postMediaData = Media::where('postid',$postid)->get();
       
        if($postMediaData->count()){
            foreach($postMediaData as $ky => $vl){
               $filePath = $vl->mediaUrl ?? '';
               $mediaId = $vl->id ?? 0;
               $basePath = env('APP_URL');
               if($filePath)
               $filePath = str_replace($basePath, "./",$filePath);
              
               if(file_exists($filePath))
                             unlink($filePath);
               
               $collData = Collection::whereRaw("FIND_IN_SET($mediaId,mediaid)")->get();
                if($collData->count()){
                    foreach($collData as $colky => $colvl){
                        $colStr = $colvl->mediaid ??'';
                        if($colStr)
                        $colArray = explode(',',$colStr);
                        if(count($colArray)){
                            if(count($colArray) == 1){
                                Collection::where('id',$colvl->id)->delete();
                            }else{
                                    $pos = array_search($mediaId,$colArray);
                                    unset($colArray[$pos]);
                                    $colStr = implode(',',$colArray);
                                    Collection::where('id',$colvl->id)->update(['mediaid' => $colStr]);
                            }
                        }
                    }
                }
               CollectionMediaModel::where('mediaId',$mediaId)->delete();
            }
            Media::where('postid',$postid)->delete();
        }

       
        PostsBookmarks::where('postid',$postid)->delete();
        LikePost::where('postid',$postid)->delete();
        PostComments::where('postid',$postid)->delete();
        Notification::where('postid',$postid)->delete();
        ReportPost::where('postid',$postid)->delete();
        $postList = CreatePost::find($postid);
        
   
            if($postList->count()){
                $hashTagList = $postList->hashTag ?? '';
                $hashTagArr = [];
                if($hashTagList)
                    $hashTagArr = explode(',',$hashTagList);
                if(count($hashTagArr)){
                    
                    foreach($hashTagArr as $hashKey => $hashVal){
                        $hashTagCount = CreatePost::whereRaw("FIND_IN_SET('$hashVal',hashTag)")->where('id','!=',$postid)->count();
                        if($hashTagCount == 0){
                               
                            HashTagModel::where('hashTagName',$hashVal)->delete();
                        }
                    }
                }
            }
        $res = CreatePost::where('id',$postid)->delete();
        if ($res) {
            
            $response["message"] = trans('commanAlert.post_delete');//"User post is deleted";
            $response["success"] = 1;
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.post_not_exist');//"User post not exist";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function searchhashtag(Request $request,$locale){
        // app()->setLocale($locale);
        // $data = $request->all(); // This will get all the request data.
        // $pcuserid = $data['pcuserid'];
        // $hashtagtext = $data['hashtagtext'];
        // $rules = ['hashtagtext' => 'required|string|min:1|max:255',];
        // $validator = Validator::make($request->all(),$rules);
		// if ($validator->fails()) {
        //     $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
        //     $response["success"] = 0;
        //     return response()->json($response);
		// }else {
        //     try{
        //         $pcuserid = $data['pcuserid'];
        //         $hashtagtext = $data['hashtagtext'];
        //         $pcuserposts = DB::table('create_posts')
        //         ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
        //         ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
        //         ->where('hashTag', 'LIKE', "%{$hashtagtext}%")
        //         ->orderBy('create_posts.updated_at', 'DESC') 
        //         ->whereNOTIn('create_posts.id',function($query) use ($pcuserid){
        //            $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$pcuserid);
        //         })->paginate(10);
        //         $match = [];
        //         foreach($pcuserposts as $row){
        //             $createdBy = $row->createdBy;
        //             $postId = $row->id;
        //             $post_likes = LikePost::where('postid', '=', $postId)->get();
        //             $post_comments = PostComments::where('postid', '=', $postId)->get();
        //             $results = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=',$createdBy)->get();
        //             $post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$pcuserid)->get();
        //             $row->follow_user = $results->count(); 
        //             $row->post_likes = $post_likes->count();
        //             $row->post_comments = $post_comments->count();
        //             $row->post_liked_by_user = $post_liked_by_user->count();
        //             $searchword = $data['hashtagtext'];
        //             $results = array();
        //             foreach ($hashTagArray as $value) {
        //                 if (strpos($value, $searchword) !== false) { $results[] = $value; }
        //             }
        //             $match[] = $results; 
        //         }
        //         $tags = array();
        //         foreach ($match as $key => $matchs) {
        //             if (sizeof($match) > 1) {
        //                 foreach ($matchs as $keyinner => $innerindex) {
        //                 $tags[] = $innerindex;
        //                 }
        //             }else {
        //                 $tags[] = $matchs;
        //             }
        //         }
                    
        //         $tags = array_unique($tags);
        //         $final = array();
        //         foreach ($tags as $tagkey => $tagvalue) {
        //             $pcuserposts = DB::table('create_posts')
        //             ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
        //             ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
        //             ->where('hashTag', 'LIKE', "%{$tagvalue}%")
        //             ->orderBy('create_posts.updated_at', 'DESC') 
        //             ->whereNOTIn('create_posts.id',function($query) use ($pcuserid){
        //                $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$pcuserid);
        //             })->paginate(10);
        //            array_push($final,(object)array('tag'=>$tagvalue,'count'=>$pcuserposts->count()));
        //         }
            
        //     if (!empty($final)) {
        //         $response["hashtagsearch"] = $final;
        //         $response["message"] = trans('commanAlert.post_list');//"User posts by hashtag search.";
        //         $response["success"] = 1;
        //         return response()->json($response);
        //     } else {
        //         $response["message"] = trans('commanAlert.post_list_not');//"User posts by hashtag search not exist.";
        //         $response["success"] = 0;
        //         return response()->json($response);
        //     }
        //     }
        //     catch(Exception $e){
        //         $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
        //         $response["success"] = 0;
        //         return response()->json($response);
        //     }
        // }   
    
    
    }

    public function searchByhashtag(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [  'hashtagtext' => 'required|string|min:1|max:255',
                    'uid' => 'required',
                    ];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
            $response["success"] = 0;
            return response()->json($response);
		}
        $id = $request->uid??'';
        $hashtagtext = $request->hashtagtext??'';

        // $pcuserposts = CreatePost :: with('getPostCollection','user')
        // ->whereNOTIn('create_posts.id',function($query) use ($id){
        //         $query->select('report_posts.postid')->from('report_posts')->where("find_in_set('$hashtagtext',hashTag)");
        // })
        // ->paginate(10)->sortByDesc('getPostCollection.created_at');
        $pcuserposts = CreatePost :: with('getPostCollection','user:id,name,username,profilePic')
                ->whereNOTIn('create_posts.id',function($query) use ($id){
                        $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$id);
                })->whereRaw("find_in_set('$hashtagtext',hashTag)")->paginate(10)->sortByDesc('getPostCollection.created_at');
        
        $res = [];
        foreach($pcuserposts as $row){
        $createdBy = $row->createdBy;
        $postId = $row->id;
        $gameCardId = $row->cardGame;
        $row->cardGame = CardGameModel::select('id','gameName','gameNameFr')->find($row->cardGame);
        switch ($gameCardId) {
        case 1:

        $row->cardType = BaseballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
        $row->nameTeam = BaseballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
        break;
        case 2:
        $row->cardType = BasketballCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
        $row->nameTeam = BasketballTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
        break;
        case 3:
        $row->nameTeam = HockeyTeamModel::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
        break;
        case 4:
        $row->cardType = MagicCardTypeModel::select('id','cardType','cardTypeFr')->find($row->cardType);
        $row->nameTeam = MagicTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
        break;
        case 5:
        $row->cardType = SoccerCardType_Model::select('id','cardType','cardTypeFr')->find($row->cardType);
        $row->nameTeam = SoccerTeam_Model::select('id','nameTeam','nameTeamFr')->find($row->nameTeam);
        break;
        case 6:
        $row->rarity = Rarete::select('id','rareteName','rareteNameFr')->find($row->rarity);
        $row->energyType = EnergyType::select('id','EnergyTypeName','EnergyTypeNameFr')->find($row->energyType);
        $row->trainerType = Trainer::select('id','trainerName','trainerNameFr')->find($row->trainerType);
        $row->types = Types::select('id','typeName','typeNameFr')->find($row->types);
        break;
        default:

        }
        // $post_likes = LikePost::where('postid', '=', $postId)->get();
        // $post_comments = PostComments::where('postid', '=', $postId)->get();
        // $results = FollowPccardUsers::where('pcuserid', '=', $id)->where('following_pcuserid', '=',$createdBy)->get();
        // $post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$id)->get();

        $row->isBookmarked = PostsBookmarks::where('pcuserid','=',$id)->where('postid','=',$postId)->count();
        $row->follow_user = FollowPccardUsers::where('pcuserid', '=', $id)->where('following_pcuserid', '=',$createdBy)->count(); 
        $row->post_likes = LikePost::where('postid', '=', $postId)->count();
        $row->likersImage = LikePost::with(['userImages' => function ($query) {
        $query->select('id','profilePic');
        }])->where('postid', '=', $postId)->latest()->take(4)->get();
        $row->post_comments = PostComments::where('postid', '=', $postId)->where('parentCommentId', '')->count();
        $row->post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$id)->count();
        $row->postMedia = Media::where('postid','=',$postId)->get();
        $res[] = $row;
        }

        if($res){
            $response["message"] = trans('commanAlert.post_list');//"User posts";
            $response["success"] = 1;
            $response["posts"] = $res;
            $response["followingData"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $id)->get();
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.post_list_not');//"User posts not exist";
            $response["success"] = 0;
            return response()->json($response);
        }
    }

    public function allpostsmedia(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $rules = ['pcuserid' => 'required|int|min:1|max:255',];
        $validator = Validator::make($request->all(),$rules);

		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		} else {
            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
                try{
                    $allpostsmedia = DB::table('create_posts')
                    ->join('media', 'media.postid', '=', 'create_posts.id')
                    ->select('media.*')
                    ->where('createdBy', '=', $pcuserid)
                    ->orderBy('media.updated_at', 'DESC') 
                    ->get();
                    $response["success"] = 1;
                    $response["message"] = trans('commanAlert.post_media_list');//"User recently following these users";
                    $response["allpostsmedia"] = $allpostsmedia;
                    return response()->json($response);
                }catch(Exception $e){
                    $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
                    $response["success"] = 0;
                    return response()->json($response);
                }
            }
    }



}
