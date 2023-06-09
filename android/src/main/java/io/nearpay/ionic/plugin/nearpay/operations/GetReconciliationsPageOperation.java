package io.nearpay.ionic.plugin.nearpay.operations;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.ionic.plugin.nearpay.ErrorStatus;
import io.nearpay.ionic.plugin.nearpay.NearpayLib;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;
import io.nearpay.ionic.plugin.nearpay.util.ArgsFilter;
import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.sdk.data.models.ReconciliationList;
import io.nearpay.sdk.data.models.TransactionBannerList;
import io.nearpay.sdk.utils.enums.GetDataFailure;
import io.nearpay.sdk.utils.listeners.GetReconciliationPageListener;
import io.nearpay.sdk.utils.listeners.GetTransactionPageListener;

public class GetReconciliationsPageOperation extends BaseOperation {
  public GetReconciliationsPageOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(Map args, NearpaySender sender) {
    ArgsFilter filter = new ArgsFilter(args);
    int page = filter.getPage();
    int limit = filter.getLimit();

    provider.getNearpayLib().nearpay.getReconciliationListPage( page, limit,
        new GetReconciliationPageListener() {
          @Override
          public void onSuccess(@Nullable ReconciliationList reconciliationList) {
            Map toSend = NearpayLib.QueryResponse(ErrorStatus.success_code, null, reconciliationList);
            sender.send(toSend);

          }

          @Override
          public void onFailure(@NonNull GetDataFailure getDataFailure) {
            int status = ErrorStatus.general_failure_code;
            String message = null;

            if (getDataFailure instanceof GetDataFailure.InvalidAdminPin) {
              status = ErrorStatus.invalid_admin_pin;
            } else if (getDataFailure instanceof GetDataFailure.FailureMessage) {
              status = ErrorStatus.failure_code;
              message = ((GetDataFailure.FailureMessage) getDataFailure).getMessage();
            } else if (getDataFailure instanceof GetDataFailure.AuthenticationFailed) {
              status = ErrorStatus.auth_failed_code;
              message = ((GetDataFailure.AuthenticationFailed) getDataFailure).getMessage();
            } else if (getDataFailure instanceof GetDataFailure.InvalidStatus) {
              status = ErrorStatus.invalid_code;
            }
            Map response = NearpayLib.QueryResponse(status, message, new ArrayList());
            sender.send(response);

          }
        });

  }
}
