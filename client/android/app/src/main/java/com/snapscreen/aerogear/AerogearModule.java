package com.snapscreen.aerogear;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.snapscreen.BuildConfig;
import java.net.URI;
import org.jboss.aerogear.android.unifiedpush.MessageHandler;
import org.jboss.aerogear.android.unifiedpush.PushRegistrar;
import org.jboss.aerogear.android.unifiedpush.RegistrarManager;
import org.jboss.aerogear.android.unifiedpush.fcm.AeroGearFCMPushConfiguration;

public class AerogearModule extends ReactContextBaseJavaModule {

  private final String VARIANT_ID = BuildConfig.UNIFIED_PUSH_VARIANT_ID;
  private final String SECRET = BuildConfig.UNIFIED_PUSH_SECRET;
  private final String GCM_SENDER_ID = BuildConfig.UNIFIED_PUSH_GCM_SENDER_ID;
  private final String UNIFIED_PUSH_URL = BuildConfig.UNIFIED_PUSH_URL;

  public AerogearModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  private ReactMessageHandler messageHandler = new ReactMessageHandler();

  @Override
  public String getName() {
    return "Aerogear";
  }

  @ReactMethod
  public void init(
      ReadableMap config, final Callback successCallback, final Callback cancelCallback) {

    RegistrarManager.config("register", AeroGearFCMPushConfiguration.class)
        .setPushServerURI(URI.create(UNIFIED_PUSH_URL))
        .setSenderId(GCM_SENDER_ID)
        .setVariantID(VARIANT_ID)
        .setSecret(SECRET)
        .setAlias(config.getString("alias"))
        .asRegistrar();

    PushRegistrar registrar = RegistrarManager.getRegistrar("register");
    registrar.register(
        getCurrentActivity().getApplicationContext(),
        new org.jboss.aerogear.android.core.Callback<Void>() {
          @Override
          public void onSuccess(Void data) {
            successCallback.invoke();
          }

          @Override
          public void onFailure(Exception exception) {
            Log.e("REGISTRATION", exception.getMessage(), exception);
            cancelCallback.invoke(exception.getMessage());
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

  private static class ReactMessageHandler implements MessageHandler {

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
