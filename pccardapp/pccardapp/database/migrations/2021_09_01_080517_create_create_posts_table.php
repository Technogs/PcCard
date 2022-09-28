<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('create_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('createdBy');
            $table->string('description')->nullable();
            $table->string('cardGame');
            $table->string('rarity')->nullable();
            $table->string('types')->nullable();
            $table->string('trainerType')->nullable();
            $table->string('energyType')->nullable();
            $table->string('hashTag')->nullable();
            $table->string('peopleTag')->nullable();
            $table->string('postTag');
            $table->integer('postPrice')->nullable();
            $table->string('mediaFirst');
            $table->string('mediaFirstType');
            $table->string('mediaSecond')->nullable();
            $table->string('mediaSecondType')->nullable();
            $table->string('address')->nullable();
            $table->boolean('isLiked')->default(0);
            $table->boolean('isBookmarked')->default(0);
            $table->timestamps(); 
            $table->foreign('createdBy')->references('id')->on('pccard_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('create_posts');
    }
}
