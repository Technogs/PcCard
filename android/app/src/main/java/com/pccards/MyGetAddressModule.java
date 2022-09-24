package com.pccards;

import android.location.Address;
import android.location.Geocoder;
import android.util.Log;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

public class MyGetAddressModule extends ReactContextBaseJavaModule {
    public MyGetAddressModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "GetAddress";
    }

    @ReactMethod
    public void generateAddress(double lat, double lng, Callback callback){
        Geocoder geocoder = new Geocoder(getReactApplicationContext(), Locale.getDefault());
        try{
            List<Address> addresses = geocoder.getFromLocation(lat, lng, 1);
            Address obj = addresses.get(0);
            String add = obj.getLocality() + "," + obj.getAdminArea();
            callback.invoke(add);
        }
        catch (IOException e){
            Log.e("Exception", Objects.requireNonNull(e.getMessage()));
        }
    }
}
