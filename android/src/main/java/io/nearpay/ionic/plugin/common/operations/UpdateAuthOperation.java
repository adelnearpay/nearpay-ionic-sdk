package io.nearpay.ionic.plugin.common.operations;


import java.util.HashMap;


import io.nearpay.ionic.plugin.common.NearpayLib;
import io.nearpay.ionic.plugin.common.PluginProvider;
import io.nearpay.ionic.plugin.common.sender.NearpaySender;
import io.nearpay.ionic.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.AuthenticationData;

public class UpdateAuthOperation extends BaseOperation {
  public UpdateAuthOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    String authValue = filter.getAuthValue();
    String authType = filter.getAuthType();
    AuthenticationData authData = NearpayLib.getAuthType(authType, authValue);
    provider.getNearpayLib().nearpay.updateAuthentication(authData);
    sender.send(new HashMap<>());
  }
}
