package io.nearpay.ionic.plugin.nearpay.operations;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.ionic.plugin.nearpay.ErrorStatus;
import io.nearpay.ionic.plugin.nearpay.NearpayLib;
import io.nearpay.ionic.plugin.nearpay.sender.NearpaySender;
import io.nearpay.ionic.plugin.nearpay.util.ArgsFilter;
import io.nearpay.ionic.plugin.nearpay.PluginProvider;
import io.nearpay.sdk.data.models.ReconciliationReceipt;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.enums.ReconcileFailure;
import io.nearpay.sdk.utils.listeners.GetReconcileListener;

public class GetReconciliationOperation extends BaseOperation {
  public GetReconciliationOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(Map args, NearpaySender sender) {
    ArgsFilter filter = new ArgsFilter(args);
    String reconUuid = filter.getReconciliationUuid();

    provider.getNearpayLib().nearpay.getReconciliationByUuid(reconUuid,  new GetReconcileListener() {
      @Override
      public void onSuccess(@Nullable ReconciliationReceipt reconciliationReceipt) {
        Map toSend = NearpayLib.QueryResponse(ErrorStatus.success_code, null, reconciliationReceipt);
        sender.send(toSend);

      }

      @Override
      public void onFailure(@NonNull ReconcileFailure reconcileFailure) {
        int status = ErrorStatus.general_failure_code;
        String message = null;

        if (reconcileFailure instanceof ReconcileFailure.InvalidAdminPin) {
          status = ErrorStatus.invalid_admin_pin;
        } else if (reconcileFailure instanceof ReconcileFailure.FailureMessage) {
          status = ErrorStatus.failure_code;
          message = ((ReconcileFailure.FailureMessage) reconcileFailure).getMessage();
        } else if (reconcileFailure instanceof ReconcileFailure.AuthenticationFailed) {
          status = ErrorStatus.auth_failed_code;
          message = ((ReconcileFailure.AuthenticationFailed) reconcileFailure).getMessage();
        } else if (reconcileFailure instanceof ReconcileFailure.InvalidStatus) {
          status = ErrorStatus.invalid_code;
        }
        Map response = NearpayLib.QueryResponse(status, message, new HashMap());
        sender.send(response);

      }
    });

  }
}
