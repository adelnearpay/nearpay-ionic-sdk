package io.nearpay.ionic.plugin.nearpay;

import io.nearpay.ionic.plugin.nearpay.util.ArgsFilter;

public class PluginProvider {
    private NearpayLib nearpayLib;
    private ArgsFilter argsFilter;

    public PluginProvider() {
        nearpayLib = new NearpayLib(this);
        argsFilter = new ArgsFilter(this);
    }

    public NearpayLib getNearpayLib() {
        return nearpayLib;
    }

    public ArgsFilter getArgsFilter() {
        return argsFilter;
    }
}
