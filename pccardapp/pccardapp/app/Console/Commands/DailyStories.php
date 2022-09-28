<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use DB;

class DailyStories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stories:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This Command delete stories after 24 hours.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $results = DB::table('stories')->where('created_at', '<=', Carbon::now()->subDay())->delete();

        if($results) {


           return $this->info('Users stories deleted successfully.');


        }
        else {

           return $this->info('Users stories not deleted.');


        }  

    }
}
