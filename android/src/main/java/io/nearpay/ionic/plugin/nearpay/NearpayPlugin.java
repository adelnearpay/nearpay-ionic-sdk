package io.nearpay.ionic.plugin.nearpay;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import io.nearpay.ionic.plugin.nearpay.operations.BaseOperation;
import io.nearpay.ionic.plugin.nearpay.operations.OperatorFactory;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;


@CapacitorPlugin(name = "NearPay")
public class NearpayPlugin extends Plugin {
    PluginProvider provider = new PluginProvider();
    public OperatorFactory operatorFactory = new OperatorFactory(provider);
    Bridge myBridge;


    @Override
    public void load() {
        provider.getNearpayLib().context = this.getContext();
        myBridge = bridge;

    }

    @PluginMethod()
    public void echo(PluginCall call) {
        System.out.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        System.out.println(call.getData().toString());
        System.out.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

        JSObject ret = new JSObject();
        ret.put("value", call.getData().toString());
        call.resolve(ret);
    }

    @PluginMethod()
    public void initialize(PluginCall call) {
        runOperation("initialize", call);
    }

    @PluginMethod()
    public void setup(PluginCall call) {
        runOperation("setup", call);
    }

    @PluginMethod()
    public void purchase(PluginCall call) {
        runOperation("purchase", call);
    }

    private void runOperation(String opName, PluginCall call){
        Map<String, Object> args = new Gson().fromJson(call.getData().toString(), HashMap.class);
        provider.getArgsFilter().filter(args);

        BaseOperation operation = operatorFactory.getOperation(opName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Operation"));

        NearpaySender sender = (Object data) -> {
            // String toSend = NearpayLib.(Map) data;
            // myBridge.triggerJSEvent("asdsadas","asdsadasd");


            JSObject toSend;
            try {
                toSend = JSObject.fromJSONObject(new JSONObject((Map) data));
            } catch (JSONException e) {
                toSend = new JSObject();
            }
            call.resolve(toSend);
        };
        operation.run(args, sender);
    }

}
