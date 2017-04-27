package com.snapscreen.aerogear;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.facebook.react.bridge.Callback;

import org.jboss.aerogear.android.unifiedpush.MessageHandler;
import org.jboss.aerogear.android.unifiedpush.PushRegistrar;
import org.jboss.aerogear.android.unifiedpush.RegistrarManager;
import org.jboss.aerogear.android.unifiedpush.fcm.AeroGearFCMPushConfiguration;

import java.net.URI;

public class AerogearModule extends ReactContextBaseJavaModule {

    private final String VARIANT_ID       = "3e2c6bd7-cd69-49eb-bd9e-a9360e79f1a9";
    private final String SECRET           = "15448edc-8896-4163-aca6-cbf783f9165b";
    private final String GCM_SENDER_ID    = "842964426922";
    private final String UNIFIED_PUSH_URL = "http://ups-server-snapscreen.74.207.224.48.nip.io/ag-push/";

    public AerogearModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ReactMessageHandler messageHandler = new ReactMessageHandler();

    @Override
    public String getName() {
        return "Aerogear";
    }

    @ReactMethod
    public void init(ReadableMap config, Callback successCallback, Callback cancelCallback) {
        RegistrarManager.config("register", AeroGearFCMPushConfiguration.class)
                    .setPushServerURI(URI.create(UNIFIED_PUSH_URL))
                    .setSenderId(GCM_SENDER_ID)
                    .setVariantID(VARIANT_ID)
                    .setSecret(SECRET)
                    .setAlias("Summers")
                    .asRegistrar();

        PushRegistrar registrar = RegistrarManager.getRegistrar("register");
        registrar.register(getCurrentActivity().getApplicationContext(), new org.jboss.aerogear.android.core.Callback<Void>() {
            @Override
            public void onSuccess(Void data) {
                Log.i("APP", "Registration Succeeded!");
            }

            @Override
            public void onFailure(Exception exception) {
                Log.e("APP", exception.getMessage(), exception);
            }
        });
    }

    @ReactMethod
    public void registerMessageHandler(Callback messageCallback) {
        messageHandler.toCall = messageCallback;
        RegistrarManager.registerMainThreadHandler(messageHandler);
    }

    @ReactMethod
    public void unregisterMessageHandler(Callback messageCallback) {
        messageHandler.toCall = null;
        RegistrarManager.unregisterMainThreadHandler(messageHandler);
    }

    private static class ReactMessageHandler implements MessageHandler{

        Callback toCall;

        @Override
        public synchronized void onMessage(Context context, Bundle message) {
            if (toCall != null) {
                toCall.invoke(message.getString("alert"));
                toCall = null;
            }
        }
    }


}