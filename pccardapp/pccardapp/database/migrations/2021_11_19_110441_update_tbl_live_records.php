<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTblLiveRecords extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_liveRecords', function (Blueprint $table) {
            $table->string('token')->after('chatGroupName');
            $table->string('channelName')->after('token');
            $table->enum('status', ['0', '1'])->after('channelName');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_liveRecords', function($table) {
            $table->dropColumn('token');
            $table->dropColumn('channelName');
            $table->dropColumn('status');
        });
    }
}
