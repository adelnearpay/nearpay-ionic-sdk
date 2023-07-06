package io.nearpay.ionic.plugin;

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

import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.ionic.plugin.nearpay.operations.BaseOperation;
import io.nearpay.ionic.plugin.nearpay.operations.OperatorFactory;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;

@CapacitorPlugin(name = "NearpayPlugin")
public class NearpayPluginPlugin extends Plugin {


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

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void test(PluginCall call) {
        System.out.println("=-=-=-=-=-=-=-=-=-= method call =-=-=-=-=-=-=-=-=-==-");
        System.out.println("=-=-=-=-=-=-=-=-=-= method call options =-=-=-=-=-=-=-=-=-==-");
        System.out.println(call.getData().toString());
        JSObject ret = new JSObject();
        call.setKeepAlive(true);
        ret.put("1", "2");
        System.out.println("=-=-=-=-=-=-=-=-=-= sending first time =-=-=-=-=-=-=-=-=-==-");
        System.out.println(ret.toString());
        call.resolve(ret);
        ret.put("3", "4");
        System.out.println("=-=-=-=-=-=-=-=-=-= sending second time =-=-=-=-=-=-=-=-=-==-");
        System.out.println(ret.toString());
        call.resolve(call.getData());
    }


    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void initialize(PluginCall call) {
        runOperation("initialize", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void setup(PluginCall call) {
        runOperation("setup", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void purchase(PluginCall call) {
        runOperation("purchase", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void refund(PluginCall call) {
        runOperation("refund", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void reverse(PluginCall call) {
        runOperation("reverse", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void reconcile(PluginCall call) {
        runOperation("reconcile", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void getTransactionsList(PluginCall call) {
        runOperation("getTransactions", call);
    }


    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void getTransaction(PluginCall call) {
        runOperation("getTransaction", call);
    }


    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void getReconciliationsList(PluginCall call) {
        runOperation("getReconciliations", call);
    }


    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void getReconciliation(PluginCall call) {
        runOperation("getReconciliation", call);
    }



    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void session(PluginCall call) {
        runOperation("session", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void logout(PluginCall call) {
        runOperation("logout", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void proxyShowConnection(PluginCall call) {
        runOperation("proxyShowConnection", call);
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void proxyDisconnect(PluginCall call) {
        runOperation("proxyDisconnect", call);
    }

    private void runOperation(String opName, PluginCall call){
        call.setKeepAlive(true);
        Map<String, Object> args = new Gson().fromJson(call.getData().toString(), HashMap.class);
        provider.getArgsFilter().filter(args);

        BaseOperation operation = operatorFactory.getOperation(opName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Operation"));

        NearpaySender sender = (Object data) -> {
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
