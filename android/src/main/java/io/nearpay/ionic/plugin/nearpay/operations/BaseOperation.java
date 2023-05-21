package io.nearpay.ionic.plugin.nearpay.operations;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;

public class BaseOperation {
    protected PluginProvider provider;

    public BaseOperation(PluginProvider provider) {
        this.provider = provider;
    }

    public void run(Map args, NearpaySender sender) {

    }
}
