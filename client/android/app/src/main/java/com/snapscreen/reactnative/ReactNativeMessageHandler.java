package com.snapscreen.reactnative;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jboss.aerogear.android.unifiedpush.MessageHandler;

public class ReactNativeMessageHandler implements MessageHandler{
    @Override
    public void onMessage(final Context androidContext, final Bundle message) {
        Handler handler = new Handler(Looper.getMainLooper());
        handler.post(new Runnable() {
            public void run() {
                final ReactInstanceManager reactInstanceManager = ((ReactApplication) androidContext.getApplicationContext()).getReactNativeHost().getReactInstanceManager();
                ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
                if (reactContext == null) {
                    reactInstanceManager
                            .addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                                @Override
                                public void onReactContextInitialized(ReactContext reactContext) {
                                    sendToJavaScript(reactContext, message.getString("alert"));
                                    reactInstanceManager.removeReactInstanceEventListener(this);
                                }
                            });
                    if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
                        reactInstanceManager.createReactContextInBackground();
                    }
                } else {
                    sendToJavaScript(reactContext, message.getString("alert"));
                }
            }
        });
    }

    private void sendToJavaScript(ReactContext reactContext, String alert) {
        WritableMap params = Arguments.createMap();
        params.putString("alert", alert);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onDefaultMessage", params);

    }
}
