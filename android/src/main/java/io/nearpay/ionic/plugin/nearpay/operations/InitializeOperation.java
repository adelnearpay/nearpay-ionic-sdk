package io.nearpay.ionic.plugin.nearpay.operations;

import android.annotation.SuppressLint;
import android.app.Application;

import java.util.Locale;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.ionic.plugin.nearpay.ErrorStatus;
import io.nearpay.ionic.plugin.nearpay.NearpayLib;
import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;
import io.nearpay.proxy.NearpayProxy;
import io.nearpay.sdk.Environments;
import io.nearpay.sdk.NearPay;

public class InitializeOperation extends BaseOperation {

    public InitializeOperation(PluginProvider provider) {
        super(provider);
    }

    public void doInitialization(Map args, NearpaySender sender) {
        String authvalue = args.get("authvalue") == null ? "" : args.get("authvalue").toString();
        String authType = args.get("authtype") == null ? "" : args.get("authtype").toString();
        this.provider.getNearpayLib().authTypeShared = authType;
        this.provider.getNearpayLib().authValueShared = authvalue;
        boolean isAuthValidated = this.provider.getNearpayLib().isAuthInputValidation(authType, authvalue);
        String localeStr = args.get("locale") != null ? args.get("locale").toString() : "default";
        Locale locale = localeStr.equals("default") ? Locale.getDefault() : Locale.getDefault();
        String environmentStr = args.get("environment") == null ? "sandbox"
                : args.get("environment").toString();
        Environments env = environmentStr.equals("sandbox") ? Environments.SANDBOX
                : environmentStr.equals("production") ? Environments.PRODUCTION : Environments.TESTING;

        Map<String, Object> response;

        if (!isAuthValidated) {
            response = NearpayLib.commonResponse(ErrorStatus.invalid_argument_code,
                    "Authentication parameter missing");
        } else {
            this.provider.getNearpayLib().nearpay = new NearPay(
                    this.provider.getNearpayLib().context,
                    this.provider.getNearpayLib().getAuthType(authType, authvalue),
                    locale,
                    env);
//
//            this.provider.getNearpayLib().nearpayProxy =  NearpayProxy.Companion.getInstanceOrCreate(
//                    (Application) this.provider.getNearpayLib().context.getApplicationContext(),
//                    this.provider.getNearpayLib().nearpay);

            response = NearpayLib.commonResponse(ErrorStatus.success_code,
                    "NearPay initialized");
        }

        sender.send(response);

    }

    @SuppressLint("NewApi")
    @Override
    public void run(Map args, NearpaySender sender) {
        doInitialization(args, sender);
    }
}
