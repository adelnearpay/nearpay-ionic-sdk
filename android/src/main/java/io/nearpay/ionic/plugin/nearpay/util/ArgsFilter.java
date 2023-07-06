package io.nearpay.ionic.plugin.nearpay.util;

import java.util.Map;
import java.util.UUID;
import android.util.Log;

import io.nearpay.ionic.plugin.nearpay.PluginProvider;

public class ArgsFilter {
    private PluginProvider provider;
    private Map savedArgs;
    public ArgsFilter(Map args) {
        savedArgs =args;
    }
    public ArgsFilter(PluginProvider provider) {
        this.provider = provider;
    }

    // return every map entry to its default
    public Map filter(Map args) {

        Long amount;
        if (args.get("amount") == null) {
            amount = 1L;
        } else {
            amount = castToLong(args.get("amount"));
        }
        args.put("amount", amount);

        Long timeout;
        if (args.get("finishTimeout") == null) {
            timeout = 60L;
        } else {
            timeout =  castToLong(args.get("finishTimeout"));
        }
        args.put("finishTimeout", timeout);

        if (args.get("customer_reference_number") == null) {
            args.put("customer_reference_number", "");
        }

        if (args.get("transaction_uuid") == null) {
            args.put("transaction_uuid", UUID.randomUUID());
        } else {
            args.put("transaction_uuid", UUID.fromString(args.get("transaction_uuid").toString()));
        }

        if (args.get("enableUiDismiss") == null) {
            args.put("enableUiDismiss", true);
        }

        if (args.get("enableReceiptUi") == null) {
            args.put("enableReceiptUi", true);
        }

        if (args.get("enableReversal") == null) {
            args.put("enableReversal", true);
        }

        if (args.get("enableEditableRefundAmountUi") == null) {
            args.put("enableEditableRefundAmountUi", true);
        }

        return args;
    }

    Long castToLong(Object beforeCast) {
        if( beforeCast instanceof Integer) {
            return Long.valueOf((Integer) beforeCast);
        } else if(beforeCast instanceof Double){
            return Long.valueOf(((Double) beforeCast).longValue());
        } else  {
            return  (Long) beforeCast;

        }
    }

    int castToInt(Object beforeCast) {
        if( beforeCast instanceof Long) {
            return ((Long) beforeCast).intValue();
        } else if(beforeCast instanceof Double){
            return ((Double) beforeCast).intValue();
        } else  {
            return  (int) beforeCast;
        }
    }

    public String getTransactionUuid() {
        return savedArgs.get("transaction_uuid").toString();
    }

    public String getReconciliationUuid() {
        return savedArgs.get("reconciliation_uuid").toString();
    }


    public String getAdminPin(){
        return savedArgs.get("adminPin") == null ? null : savedArgs.get("adminPin").toString();
    }

    public int getPage(){
        return savedArgs.get("page") == null ? 1 :castToInt(savedArgs.get("page"));
    }
    public int getLimit(){
        return savedArgs.get("limit") == null ? 30 : castToInt(savedArgs.get("limit"));
    }
}
