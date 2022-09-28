<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pcuserid');
            $table->unsignedBigInteger('postid');
            $table->text('reason');
            $table->timestamps();
   
            $table->foreign('pcuserid')->references('id')->on('pccard_users')->onDelete('cascade');
            $table->foreign('postid')->references('id')->on('create_posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('report_posts');
    }
}
