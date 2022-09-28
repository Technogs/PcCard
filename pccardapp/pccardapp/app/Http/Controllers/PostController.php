<?php
namespace App\Http\Controllers;
use App\Models\Pccardusers;
use App\Models\EnergyType;
use App\Models\Rarete;
use App\Models\Trainer;
use App\Models\Types;
use App\Models\CreatePost;
use App\Models\Media;
use App\Models\FollowPccardUsers;
use App\Models\LikePost;
use App\Models\PostComments;
use App\Models\Stories;
use App\Models\LiveModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use DB;

class PostController extends Controller
{
    public function createPost(Request $request){
        
        $response = array('response' => '', 'success'=>false);
        $validator = Validator::make($request->all(), [
            'createdBy'=>'required',
            'description'=>'required',
            'cardGame'=>'required',
            'rarity'=>'required',
            'types'=>'required',
            'trainerType'=>'required',
            'energyType'=>'required',
            'hashTag'=>'required',
            'peopleTag'=>'required',
            'postTag'=>'required',
            'postPrice'=>'required',
            'address'=>'required',
        ]);

        if ($validator->fails()) {
            $response["message"] = "Validation failed.";
            $response['response'] = $validator->messages();
            $response["success"] = 0;
            return response()->json($response);
        }

        
    }
}
