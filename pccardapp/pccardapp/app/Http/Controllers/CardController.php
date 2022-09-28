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
use App\Models\HockeyCardTypeModel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Input;
use DB;

class CardController extends Controller{

    public function getCardBygameCard(Request $request,$locale){
        app()->setLocale($locale);
        $rules = ['gameCardId' => 'required|int|min:1|max:255',];
        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()) {
                $response["message"] = trans('commanAlert.v_failed');//"Validation failed";
                $response["success"] = 0;
                return response()->json($response);
        }
        $gameCardId = $request->gameCardId ?? 0;
        
        $response["success"] = 1;
        $response["message"] = trans('commanAlert.post_media_list');//"User recently following these users";
        
        switch ($gameCardId) {
            case 1:
                $response["baseballCardType"] = BaseballCardTypeModel::all();
                $response["baseballTeam"] = BaseballTeamModel::all();
              break;
            case 2:
                $response["basketballCardType"] = BasketballCardTypeModel::all();
                $response["basketballTeam"] = BasketballTeamModel::all();
              break;
            case 3:
                $response["hockeyTeam"] = HockeyTeamModel::all();
                $response["HockeyCardType"] = HockeyCardTypeModel::all();
              break;
            case 4:
                $response["magicCardType"] = MagicCardTypeModel::all();
                $response["magicTeam"] = MagicTeam_Model::all();
              break;
            case 5:
                $response["soccerCardType"] = SoccerCardType_Model::all();
                $response["soccerTeam"] = SoccerTeam_Model::all();
              break;
            case 6:
                $response["energyType"] = EnergyType::all();
                $response["rarete"] = Rarete::all();
                $response["trainer"] = Trainer::all();
                $response["types"] = Types::all();
              break;
            default:
              echo "Your favorite color is neither!";
          }

        
        return response()->json($response);

    }

}