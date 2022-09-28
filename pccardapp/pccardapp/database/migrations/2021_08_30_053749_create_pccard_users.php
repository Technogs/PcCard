<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePccardUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pccard_users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profilePic')->nullable();
            $table->string('website')->nullable();
            $table->string('bio')->nullable();
            $table->boolean('pushNotification')->nullable();
            $table->boolean('newPostNotification')->nullable();
            $table->boolean('connectionLiveNotification')->nullable();
            $table->boolean('friendRequestNotification')->nullable();
            $table->boolean('Is_Active')->nullable();
            $table->string('validationCode')->nullable();
            $table->boolean('device_type');
            $table->string('device_token');
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
        Schema::dropIfExists('pccard_users');
    }
}
