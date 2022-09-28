<?php

namespace App\Http\Controllers;

use App\Models\PostsBookmarks;
use Illuminate\Http\Request;
use App\Models\CreatePost;
use App\Models\Media;
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

use App\Models\FollowPccardUsers;
use App\Models\LikePost;
use App\Models\PostComments;
use App\Models\Stories;
use App\Models\LiveModel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use DB;

class PostsBookmarksController extends Controller
{
    public function postbookmarks(Request $request,$locale){
        app()->setLocale($locale);
        $rules = [
            'pcuserid' => 'required|int|min:1|max:255',
            'postid' => 'required|int|min:1|max:255',
		];
        $validator = Validator::make($request->all(),$rules);
		if ($validator->fails()) {
            $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
            $response["success"] = 0;
            return response()->json($response);
		}else {
            $data = $request->all(); // This will get all the request data.
            $pcuserid = $data['pcuserid'];
            $postid = $data['postid'];  
            // $results = DB::table('create_posts')
            // ->select('createdBy')
            // ->where('id', $postid)->where('createdBy', '=', $pcuserid)->first();
            // if($pcuserid == $results->createdBy) {
            //     $updatepost = CreatePost::where('id', $postid)->update(['isBookmarked' => '1']);
            // }
            $results = DB::table('posts_bookmarks')->where('postid', $postid)->where('pcuserid', '=', $pcuserid)->get();
            if ($results->count()) {
               DB::table('posts_bookmarks')->where('postid', $postid)->where('pcuserid', '=', $pcuserid)->delete();
               CreatePost::where('id', $postid)->update(['isBookmarked' => '0']);
                $response["message"] = trans('commanAlert.bk_deleted');//"User posted bookmark is deleted";
                $response["success"] = 1;
                return response()->json($response);
            } else {
                try{
                    $PostsBookmarks = new PostsBookmarks;
                    $PostsBookmarks->pcuserid = $request->input('pcuserid');
                    $PostsBookmarks->postid = $request->input('postid');
                    $PostsBookmarks->save();  
                    $response["message"] = trans('commanAlert.bk_saved');//"User Bookmark a Post.";
                    $response["success"] = 1;
                    return response()->json($response);
                }catch(Exception $e){
                    $response["message"] = trans('commanAlert.o_failed');//"Operation failed";
                    $response["success"] = 0;
                    return response()->json($response);
                }
            }
        }
    }

    public function getbookmarks(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $one = array();
        $two = array();
        // $results =  DB::table('posts_bookmarks') 
        // ->join('create_posts', 'create_posts.id', '=', 'posts_bookmarks.postid')
        // ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
        // ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
        // ->orderBy('posts_bookmarks.updated_at', 'DESC')
        // ->where('pcuserid', '=',$pcuserid)
        // ->paginate(20);
        //where('pcuserid','=',$pcuserid)->
        $results = PostsBookmarks::with('getPost')->where('pcuserid','=',$pcuserid)->paginate(20);

       

        if ($results->count()) {
            foreach($results as $resKey => $resVal){
                $createdBy = $resVal->getPost->createdBy;
                $postId = $resVal->getPost->id;
                $post_likes = LikePost::where('postid', '=', $postId)->get();
                $post_comments = PostComments::where('postid', '=', $postId)->get();
                $FollowPccardUsersResult = FollowPccardUsers::where('pcuserid', '=', $pcuserid)->where('following_pcuserid', '=',$createdBy)->get();
                $post_liked_by_user = LikePost::where('postid', '=', $postId)->where('pcuserid', '=',$pcuserid)->get();

                $resVal->getPost->follow_user = $results->count(); 
                $resVal->getPost->post_likes = $post_likes->count();
                $resVal->getPost->likersImage = LikePost::with(['userImages' => function ($query) {
                    $query->select('id','profilePic');
                }])->where('postid', '=', $postId)->latest()->take(4)->get();
                
                $resVal->getPost->post_comments = $post_comments->count();
                $resVal->getPost->post_liked_by_user = $post_liked_by_user->count();
                $resVal->getPost->isBookmarked = PostsBookmarks::where('pcuserid','=',$resVal->getPost->createdBy)->where('postid','=',$postId)->count();
                $resVal->getPost->postMedia = Media::where('postid','=',$resVal->getPost->id)->get();
                $resVal->getPost->user = Pccardusers::where('id','=',$resVal->getPost->createdBy)->first();
                
                $gameCardId = $resVal->getPost->cardGame;
                $resVal->getPost->cardGame = CardGameModel::select('id','gameName','gameNameFr')->find($resVal->getPost->cardGame);
                 switch ($gameCardId) {
                    case 1:
                        
                        $resVal->getPost->cardType = BaseballCardTypeModel::select('id','cardType','cardTypeFr')->find($resVal->getPost->cardType);
                        $resVal->getPost->nameTeam = BaseballTeamModel::select('id','nameTeam','nameTeamFr')->find($resVal->getPost->nameTeam);
                    break;
                    case 2:
                        $resVal->getPost->cardType = BasketballCardTypeModel::select('id','cardType','cardTypeFr')->find($resVal->getPost->cardType);
                        $resVal->getPost->nameTeam = BasketballTeamModel::select('id','nameTeam','nameTeamFr')->find($resVal->getPost->nameTeam);
                    break;
                    case 3:
                        $resVal->getPost->nameTeam = HockeyTeamModel::select('id','nameTeam','nameTeamFr')->find($resVal->getPost->nameTeam);
                    break;
                    case 4:
                        $resVal->getPost->cardType = MagicCardTypeModel::select('id','cardType','cardTypeFr')->find($resVal->getPost->cardType);
                        $resVal->getPost->nameTeam = MagicTeam_Model::select('id','nameTeam','nameTeamFr')->find($resVal->getPost->nameTeam);
                    break;
                    case 5:
                        $resVal->getPost->cardType = SoccerCardType_Model::select('id','cardType','cardTypeFr')->find($resVal->getPost->cardType);
                        $resVal->getPost->nameTeam = SoccerTeam_Model::select('id','nameTeam','nameTeamFr')->find($resVal->getPost->nameTeam);
                    break;
                    case 6:
                        $resVal->getPost->rarity = Rarete::select('id','rareteName','rareteNameFr')->find($resVal->getPost->rarity);
                        $resVal->getPost->energyType = EnergyType::select('id','EnergyTypeName','EnergyTypeNameFr')->find($resVal->getPost->energyType);
                        $resVal->getPost->trainerType = Trainer::select('id','trainerName','trainerNameFr')->find($resVal->getPost->trainerType);
                        $resVal->getPost->types = Types::select('id','typeName','typeNameFr')->find($resVal->getPost->types);
                    break;
                    default:
                    
                }
            }
           
            // $results =  DB::table('posts_bookmarks') 
            // ->join('create_posts', 'create_posts.id', '=', 'posts_bookmarks.postid')
            // ->join('pccard_users', 'pccard_users.id', '=', 'create_posts.createdBy')
            // ->select('create_posts.*','pccard_users.name','pccard_users.username','pccard_users.profilePic')
            // ->orderBy('posts_bookmarks.updated_at', 'DESC')
            // ->where('pcuserid', '=',$pcuserid)
            // ->paginate(20);
            $response["message"] = trans('commanAlert.bk_post_success');//"Successfully get bookmarks of single post.";
            $response["success"] = 1;
            $response["getbookmarks"] = $results;
            $response["FollowingsList"] = FollowPccardUsers::with('user:id,name,username,profilePic')->where('pcuserid', '=', $pcuserid)->get();
            return response()->json($response);
        } else {
            $response["message"] = trans('commanAlert.bk_post_unsuccess');//"Not Successfully get bookmarks of single post.";
            $response["success"] = 0;
            return response()->json($response);  
        }
    }

    public function deletebookmarks(Request $request,$locale){
        app()->setLocale($locale);
        $data = $request->all(); // This will get all the request data.
        $pcuserid = $data['pcuserid'];
        $postid = $data['postid'];
         $results = DB::table('posts_bookmarks')->where('postid', $postid)->where('pcuserid', '=', $pcuserid)->get();
         if ($results->count()) {
            DB::table('posts_bookmarks')->where('postid', $postid)->where('pcuserid', '=', $pcuserid)->delete();
             $response["message"] = trans('commanAlert.bk_delete_success');//"User posted bookmark is deleted";
             $response["success"] = 1;
             return response()->json($response);
         }else {
             $response["message"] = trans('commanAlert.bk_delete_unsuccess');//"User posted bookmark is not exist";
             $response["success"] = 0;
             return response()->json($response);
         }
     }
}
