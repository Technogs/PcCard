<?php

namespace App\Http\Controllers;
use App\Models\Pccardusers;
use App\Models\CreatePost;
use App\Models\Collection;

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

use App\Models\Media;
use App\Models\FollowPccardUsers;
use App\Models\LikePost;
use App\Models\PostComments;
use App\Models\Stories;
use App\Models\PostsBookmarks;
use App\Models\LiveModel;
use App\Models\HashTagModel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use DB;


class searchController extends Controller
{

   public function searchGameType(Request $request,$locale){
        app()->setLocale($locale);
        
         $rules = ['uid' => 'required|int|min:1|max:255'];
         $validator = Validator::make($request->all(),$rules);
         if ($validator->fails()) {
               $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
               $response["success"] = 0;
               return response()->json($response);
         }

       $gameTypeId = $request->gameTypeId ?? '';
       $id = $request->uid ?? '';
       
       
         // $pcuserposts = CreatePost :: with('getPostCollection','user')
         //       ->whereNOTIn('create_posts.id',function($query) use ($id){
         //                $query->select('report_posts.postid')->from('report_posts')->where('pcuserid', '=',$id);
         //       })
         //       ->paginate(10)->sortByDesc('getPostCollection.created_at');
         if($gameTypeId){
            $posts = CreatePost :: with('user:id,name,username,profilePic','getMedia')->Where('cardGame',$gameTypeId)->orderBy('id', 'DESC')->paginate(10);
         }else{
            $posts = CreatePost :: with('user:id,name,username,profilePic','getMedia')->orderBy('id', 'DESC')->paginate(10);
         }

           

         $res = [];
         foreach($posts as $row){
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
      $response["message"] = trans('commanAlert.search_result');//"Search result found";
      $response["success"] = 1;
      $response["Data"] = $res;
      $response["followingData"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $id)->get();
      return response()->json($response);

   }

   public function index(Request $request,$locale){
        app()->setLocale($locale);
        $rules = ['uid' => 'required|int|min:1|max:255'];
         $validator = Validator::make($request->all(),$rules);
         if ($validator->fails()) {
               $response["message"] = trans('commanAlert.v_failed');//"Validation failed.";
               $response["success"] = 0;
               return response()->json($response);
         }
         $id = $request->uid ?? '';
       $keyword = $request->keyword ?? '';
       $peopleArr = [];
       $collectionArr = [];
       $hashTagArr = HashTagModel::orWhere('hashTagName', 'like', $keyword . '%')->get();
       $gameTypeArr = [];
       $peopleArr = Pccardusers::orWhere('name', 'like', $keyword . '%')->get();
       $collectionArr = Collection::with('userInfo','getCollectionMedia.getMedia')->orWhere('collectionName', 'like', $keyword . '%')->get();
      //  prd($collectionArr->toArray());
         $returnCollectinTemp  = [];
         foreach($collectionArr as $ky => $vl){
            if(array_key_exists($vl->pcuserid,$returnCollectinTemp)){
            array_push($returnCollectinTemp[$vl->pcuserid],$vl);
            }else{
            $returnCollectinTemp[$vl->pcuserid][] = $vl;
            }
         }
         $returnCollectin = [];

         foreach($returnCollectinTemp as $val){
            $returnCollectin[] = $val;
         }

         
         foreach($hashTagArr as $ky => $vl){
            $tag =  $vl->hashTagName??'';
            $tagCount = DB::table('create_posts')
                        ->selectRaw('count(*) as tag_count')
                        ->whereRaw("find_in_set('$tag',hashTag)")
                        ->count();
            $hashTagArr[$ky]->useCount = $tagCount;
         }
         
       $response["message"] = trans('commanAlert.search_result');//"Search result found";
       $response["peopleArr"] = $peopleArr;
      //  $response["collectionArr"] = $collectionArr;
       $response["collectionArr"] = $returnCollectin;
       $response["hashTagArr"] = $hashTagArr;
       $response["gameTypeArr"] = $gameTypeArr;
        $response["followingData"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $id)->get();
       $response["success"] = 1;
       return response()->json($response);

   }
}
