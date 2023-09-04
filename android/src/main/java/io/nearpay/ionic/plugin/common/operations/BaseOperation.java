package io.nearpay.ionic.plugin.common.operations;

import io.nearpay.ionic.plugin.common.PluginProvider;
import io.nearpay.ionic.plugin.common.sender.NearpaySender;
import io.nearpay.ionic.plugin.common.filter.ArgsFilter;

public class BaseOperation {
    protected PluginProvider provider;

    public BaseOperation(PluginProvider provider){
        this.provider = provider;
    }

    public void run(ArgsFilter filter, NearpaySender sender) {

    }
}
