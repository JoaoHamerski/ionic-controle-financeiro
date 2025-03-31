package com.financeiro.controle.plugins;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import androidx.activity.result.ActivityResult;
import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;

import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;


@CapacitorPlugin(name = "UpgradeApp")
public class UpgradeAppPlugin extends Plugin {
    @PluginMethod()
    public void installApp(PluginCall call) {
        Context context = getContext();
        String path = call.getString("path");

        if (path == null) {
            call.reject("'path' cannot be null");
            return;
        }

        File file = new File(path);
        Uri fileUri = FileProvider.getUriForFile(context, "com.financeiro.controle.fileprovider", file);

        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(fileUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        context.startActivity(intent);
    }

    @PluginMethod()
    public void requestAppInstallPermission(PluginCall call)
    {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        Intent intent = new Intent(
                Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                Uri.parse("package:com.financeiro.controle")
        );

        intent.putExtra(Intent.EXTRA_RETURN_RESULT, true);

        startActivityForResult(call, intent, "requestInstallAppCallback");
    }

    @ActivityCallback
    private void requestInstallAppCallback(PluginCall call, ActivityResult result)
    {
        JSObject obj = new JSObject();

        if (result.getResultCode() == Activity.RESULT_CANCELED) {
            obj.put("result", "CANCELED");
        }

        if (result.getResultCode() == Activity.RESULT_OK) {
            obj.put("result", "GRANTED");
        }

        call.resolve(obj);
    }

    @PluginMethod()
    public void checkAppInstallPermission(PluginCall call)
    {
        JSObject obj = new JSObject();

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            obj.put("result", true);
        } else {
            Boolean canRequest = getContext().getPackageManager().canRequestPackageInstalls();
            obj.put("result", canRequest);
        }

        call.resolve(obj);
    }

    @PluginMethod
    public void hasNewVersion(PluginCall call)
    {
        String newPkgPath = call.getString("newPkgPath");

        if (newPkgPath == null) {
            call.reject("'newPkgPath' cannot be null");
            return;
        }

        JSObject obj = new JSObject();

        long currentVersion = getCurrentPackageVersion();
        long newVersion = getPackageVersion(newPkgPath);

        obj.put("result", newVersion > currentVersion);
        call.resolve(obj);
    }

    private long getCurrentPackageVersion()
    {
        PackageManager pkgManager = getContext().getPackageManager();
        String packageName = getContext().getPackageName();

        try {
            PackageInfo pkgInfo = pkgManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);

            return pkgInfo.getLongVersionCode();
        } catch (PackageManager.NameNotFoundException e) {
            return 0;
        }
    }

    private long getPackageVersion(String path) {
        PackageManager pkgManager = getContext().getPackageManager();
        PackageInfo pkgInfo = pkgManager.getPackageArchiveInfo(path, PackageManager.GET_ACTIVITIES);

        return pkgInfo.getLongVersionCode();
    }
}
