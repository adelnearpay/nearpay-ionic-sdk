package io.nearpay.ionic.plugin.nearpay.operations;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;

public class ProxyDisconnectOperation extends BaseOperation{

    public ProxyDisconnectOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(Map args, NearpaySender sender) {
        provider.getNearpayLib().nearpayProxy.unpairConnection();
        sender.send(new HashMap<>());
    }
}
