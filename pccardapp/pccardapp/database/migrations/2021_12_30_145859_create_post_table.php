<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_post', function (Blueprint $table) {
            $table->id();
            $table->integer('createdBy')->unsigned();
            $table->text('description');
            $table->string('cardGame',150);
            $table->string('rarity',100);
            $table->string('types',100);
            $table->string('trainerType',100);
            $table->string('energyType',100);
            $table->integer('postTag')->unsigned();
            $table->integer('postPrice')->unsigned();
            $table->string('address',250);
            $table->enum('isLiked',['0','1']);
            $table->enum('isBookmarked',['0','1']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_post');
    }
}
