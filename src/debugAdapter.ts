import * as vscode from "vscode";
import { log } from "./log";

interface RetraceLaunchConfig extends vscode.DebugConfiguration {
  recording: string;
  pid?: number;
}

export class RetraceDebugAdapterFactory
  implements vscode.DebugAdapterDescriptorFactory
{
  async createDebugAdapterDescriptor(
    session: vscode.DebugSession,
  ): Promise<vscode.DebugAdapterDescriptor> {
    const config = session.configuration as RetraceLaunchConfig;

    const args = ["--dap"];
    if (config.pid) {
      args.push("--pid", String(config.pid));
    }

    log(`Debug adapter: ${config.recording} ${args.join(" ")}`);

    return new vscode.DebugAdapterExecutable(config.recording, args);
  }
}
