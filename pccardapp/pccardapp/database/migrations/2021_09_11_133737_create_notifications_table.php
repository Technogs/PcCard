<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('notifications');
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fromid');
            $table->unsignedBigInteger('toid');
            $table->unsignedBigInteger('postid')->nullable();
            $table->string('text')->nullable();
            $table->string('type')->nullable();
            $table->boolean('isread')->default(0);
            $table->timestamps();

            $table->foreign('fromid')->references('id')->on('pccard_users')->onDelete('cascade');
      
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
