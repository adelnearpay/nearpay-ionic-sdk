package io.nearpay.ionic.plugin;

import android.util.Log;

public class NearpayPlugin {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
