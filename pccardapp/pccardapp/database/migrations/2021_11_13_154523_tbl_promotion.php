<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TblPromotion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_promotion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('userId');
            $table->string('collectionList');
            $table->integer('planId');
            $table->string('transactionId');
            $table->integer('totalPost');
            $table->dateTime('expiryDate');
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
        Schema::dropIfExists('tbl_promotion');
    }
}
