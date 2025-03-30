package com.financeiro.controle;

import android.os.Bundle;

import com.financeiro.controle.plugins.UpgradeAppPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(UpgradeAppPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
